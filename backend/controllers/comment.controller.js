import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"


export const getPostComments = async(req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username img")
    .sort({ createdAt: -1 }) // Últimos comentarios primero

  res.status(200).json(comments);
}

export const addComment = async(req, res) => {
  const clerkUserId = req.auth.userId
  const postId = req.params.postId // Id del post al que se agrega el comentario
  if(!clerkUserId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await User.findOne({clerkUserId})

  const newComment = new Comment({
    ...req.body,
    user: user._id,
    post: postId
  })

  const savedComment = await newComment.save()
  res.status(201).json(savedComment);
}

export const deleteComment = async(req, res) => {
  const clerkUserId = req.auth.clerkUserId
  const id = req.params.id  // Id del comentario a eliminar
  if (!clerkUserId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await User.findOne({ clerkUserId })

  const deletedComment = await Comment.findOneAndDelete({ _id: id, user: user._id })

  if(!deletedComment) {
    return res.status(404).json({ message: "You can delete only your own comments" });
  }

  res.status(200).json("Comment deleted");
}