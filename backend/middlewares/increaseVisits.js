import Post from "../models/post.model.js"


const increaseVisits = async (req, res, next) => {
  const slug = req.params.slug;

  await Post.findOneAndUpdate(
    { slug: slug },
    { $inc: { visit: 1 } }, // Incrementa el campo visit por 1
    { new: true } // Devuelve el objeto actualizado
  );

  next();
};


export default increaseVisits;