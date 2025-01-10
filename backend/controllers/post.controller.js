
import ImageKit from 'imagekit';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';


export const getPosts = async(req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const query = {}                                                       // Se inicializa un objeto query que contendrá los criterios de búsqueda.

  const cat = req.query.cat;                                             // Se extraen los parámetros de consulta opcionales para filtrar como la categoría
  const author = req.query.author;                                       // El autor del post
  const searchQuery = req.query.search;                                  // Palabra clave para buscar
  const sortQuery = req.query.sort;                                      // Criterio de ordenamiento
  const featured = req.query.featured;                                   // Si se desea solo mostrar los posts destacados

  if (cat) {                                                             // Se agregan los filtros al objeto query
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" };                // Utiliza una expresión regular para realizar una búsqueda insensible a mayúsculas/minúsculas en los títulos.
  }

  if (author) {
    const user = await User.findOne({ username: author }).select("_id"); // Busca el autor por su nombre de usuario en la colección de usuarios

    if (!user) {
      return res.status(404).json("No post found!");
    }

    query.user = user._id;
  }

  // Ordenamiento de resultados
  let sortObj = { createdAt: -1 };                                       // Se define un criterio de ordenamiento por defecto (createdAt: -1, publicaciones más recientes primero).

  if (sortQuery) {                                                       // Según el valor de sortQuery, ajusta el ordenamiento
    switch (sortQuery) {
      case "newest":                                                     // newest: Más recientes primero
        sortObj = { createdAt: -1 };                
        break;
      case "oldest":                                                     // Más antiguas primero.
        sortObj = { createdAt: 1 };
        break;
      case "popular":                                                    // Más visitas primero.
        sortObj = { visit: -1 };
        break;
      case "trending":                                                   // Más visitas en la última semana.
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }

  if (featured) {
    query.isFeatured = true;                                         // Filtro por publicaciones destacadas
  }



  const posts = await Post.find(query)                               // Filtra las publicaciones según los criterios construidos.                                    
    .populate('user', 'username')                                    // Se hace un populate para traer el username del usuario
    .sort(sortObj)
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

  const role = req.auth.sessionClaims?.metadata?.role || "user"
  if(role === "admin"){
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json("Post has been deleted");
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

export const featurePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role !== "admin") {
    return res.status(403).json("You cannot feature posts!");
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const isFeatured = post.isFeatured;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { new: true }
  );

  res.status(200).json(updatedPost);
};



const imageKit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
})

export  const uploadAuth = async (req, res) => {
  const result = imageKit.getAuthenticationParameters();
  res.send(result)
}