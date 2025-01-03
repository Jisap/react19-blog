
import ImageKit from 'imagekit';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';


export const getPosts = async(req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
}

export const getPost = async(req, res) => {
  const post = await Post.findOne({slug: req.params.slug});
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
    while (existingPost) {                                      // If it does, append a counter to the slug
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