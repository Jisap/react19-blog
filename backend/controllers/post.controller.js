
import ImageKit from 'imagekit';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';


export const getPosts = async(req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const posts = await Post.find()
    .populate('user', 'username')                                    // Se hace un populate para traer el username del usuario
    .limit(limit)                                                    // El limit es para limitar el numero de elementos devueltos
    .skip((page - 1) * limit)                                        // El skip es para saltar los elementos anteriores a la página actual
  
  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;                         // Si la página actual por el limite es menor que el total de posts, hay más posts

  res.status(200).json({ posts, hasMore });                          // Devuelve los posts y si hay más posts o no
}

export const getPost = async(req, res) => {
  const post = await Post.findOne(
    {slug: req.params.slug}
  ).populate('user', 'username img');                                 // Se rellena el usuario con sus datos, username y img
  res.status(200).json(post);
}


export const createPost = async (req, res) => {
 
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const { title, category, desc, content } = req.body;
  if (!title || !category || !desc || !content) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const user = await User.findOne({ clerkUserId: clerkUserId });
    if (!user) {
      return res.status(401).json("User not found");
    }

    let slug = title.replace(/\s+/g, '-').toLowerCase();      // Replace spaces with hyphens and convert to lowercase

    let existingPost = await Post.findOne({ slug: slug });    // Check if the slug already exists
    let counter = 2
    while (existingPost) {                                    // If it does, append a counter to the slug
      slug = `${slug}-${counter}`;
      existingPost = await Post.findOne({ slug: slug });
      counter++;
    }

    const newPost = new Post({
      user: user._id,
      slug,
      ...req.body
    });

    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json("Internal server error");
  }
};


export const deletePost = async(req, res) => {

  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkUserId })

  const deletedPost = await Post.findOneAndDelete({
    _id:req.params.id, 
    user: user._id
  });

  if(!deletedPost){
    return res.status(403).json("You can delete only your own posts");
  }

  res.status(200).json("Post deleted");
}

const imageKit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
})

export  const uploadAuth = async (req, res) => {
  const result = imageKit.getAuthenticationParameters();
  res.send(result)
}