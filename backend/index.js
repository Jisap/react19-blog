import express from 'express';
import connectDB from './lib/connectDB.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';
import commentRoute from './routes/comment.route.js';
import webHookRoute from './routes/webhook.route.js';


const app = express();

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