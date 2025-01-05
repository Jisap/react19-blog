
import User from '../models/user.model.js';  
import { Webhook } from "svix"

export const clerkWebhook = async(req, res) => {
  
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if(!WEBHOOK_SECRET){
    throw new Error("Clerk Webhook Secret needed");
  }
  //console.log('Webhook Secret', WEBHOOK_SECRET);

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt;

  try {
    evt = wh.verify(payload, headers)
  } catch (error) {
    res.status(400).json({
      message: "Webhook verification failed"
    })
  }

  //console.log("evt.data",evt.data);

  if( evt.type === "user.created"){

    // Validar que clerkUserId no sea null
    if (!evt.data.id) {
      return res.status(400).json({
        message: "clerkUserId is missing in the webhook payload",
      });
    }

    // Crear nuevo usuario
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address.split('@')[0] + '_' + evt.data.id,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_image_url
    })
    try {
      const userSaved = await newUser.save();
      console.log("userSaved", userSaved);
      return res.status(200).json({
        message: "User created successfully",
        user: userSaved,
      });
    } catch (error) {
      console.error("Error saving user:", error);
      return res.status(400).json({
        message: "Error saving user",
        error: error.message,
      });
    }


    //await newUser.save() 
  }

  return res.status(200).json({
    message: "Webhook received"
  })
}