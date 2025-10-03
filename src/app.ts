import compression from "compression";
import cors from "cors";
import express from "express";
import { authRouter } from "./modules/auth/auth.route";
import { blogRouter } from "./modules/blogs/blogs.route";
import cookieParser from "cookie-parser";
import { projectRouter } from "./modules/projects/projects.route";


const app = express();

// Middleware
app.use(cors(
  {
    origin:["http://localhost:3000","https://next-portfolio-client-phi.vercel.app"],
    
  }
));
app.use(compression()); 
app.use(express.json()); 


app.use(cookieParser());
app.use('/auth',authRouter)
app.use('/blog',blogRouter)
app.use('/project',projectRouter)
app.get("/", (_req, res) => {
  res.send("server is running");
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
