
import User from "../models/user.model.js"


export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId
  if(!clerkUserId) {
    return res.status(401).json( "Not authenticated" )
  }

  const user = await User.findOne({ clerkUserId })
  res.status(200).json(user.savedPosts)
}

export const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated")
  }

  const user = await userModel.findOne({ clerkUserId })
  
  const postId = req.body.postId

  const isSaved = user.savedPosts.some(post => post.id === postId)      // Verificamos si el post ya está guardado
  if(!isSaved) {                                                        // Si no está guardado, lo añadimos
    await User.findByIdAndUpdate( user._id, {
      $push: { savedPosts: postId }
    })
  }else{                                                                // Si ya está guardado, lo eliminamos
    await User.findByIdAndUpdate( user._id, {
      $pull: { savedPosts: postId }
    })
  }

  res.status(200).json( isSaved ? "Post unsaved" : "Post saved" )
}