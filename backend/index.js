import express from 'express';
import connectDB from './lib/connectDB.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';
import commentRoute from './routes/comment.route.js';
import webHookRoute from './routes/webhook.route.js';
import { clerkMiddleware, requireAuth } from '@clerk/express'


const app = express();

// Frontend
// Cuando el usuario se loguea exitosamente, Clerk genera un JWT
// Este token contiene información encriptada del usuario y sus permisos
// Se almacena automáticamente en el navegador(localStorage o cookies)
// Cuando se hace una petición a la API, se envía el token

// Backend
// El clerkMiddleware intercepta la petición
// Extrae el token del header Authorization
// Verifica la firma del token usando tu CLERK_SECRET_KEY
// Decodifica la información del usuario
// Si es válido: añade req.auth con la información del usuario
// Si no es válido: genera un error 401
// La información del usuario en el req.auth se usa en las rutas

app.use(clerkMiddleware()); 

app.use("/webhooks", webHookRoute);
app.use(express.json());

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);

app.use((error, req, res, next) => {

  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong",
    status: error.status,
    stack: error.stack
  })
})

app.listen(3000, () => {
  connectDB()
  console.log('Server is running on port 3000');
});