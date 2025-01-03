import express from 'express';
import connectDB from './lib/connectDB.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import webHookRouter from './routes/webhook.route.js';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import cors from 'cors';

const app = express();

app.use(cors(process.env.CLIENT_URL))

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


app.use("/webhooks", webHookRouter);
app.use(express.json());

app.use(function (req, res, next) {                                 // Midleware que gestiona las peticiones de CORS
  res.header("Access-Control-Allow-Origin", "*");                   // Permite que cualquier origen pueda acceder a la API
  res.header("Access-Control-Allow-Headers",                        // define qué encabezados puede enviar el cliente en sus solicitudes.
    "Origin, X-Requested-With, Content-Type, Accept");              // Origin: Permite que el cliente especifique el origen desde donde se envía la solicitud.
  next();                                                           // X-Requested-With: permite solicitudes AJAX y Content-Type: permite enviar datos en formato JSON.
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {                                // Control de errores si los hay
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