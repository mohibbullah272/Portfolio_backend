import { Request, Response } from "express"
import { blogService, StatsService } from "./blogs.service"
import { errorResponse } from "../../api/ApiResponse"


const getAllBlogs =async(req:Request,res:Response)=>{
    try {
        const blogs = await blogService.getAllBlogs()
        res.status(200).json(blogs)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const getPopularBlogs =async(req:Request,res:Response)=>{
    try {
        const blogs = await blogService.getPopularBlogs()
        res.status(200).json(blogs)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const getSingleBlog = async(req:Request,res:Response)=>{
    try {
        const blog = await blogService.getSingleBlog(Number(req.params.id))
        res.status(200).json(blog)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const createBlog = async(req:Request,res:Response)=>{
    try {
        const result = await blogService.createBlog(req.body)
        res.status(201).json(result)
    } catch (error:any) {
      
        return res.status(400).json(error)
    }
}

const updateBlog = async(req:Request,res:Response)=>{
    try {
        const result = await blogService.updateBlog(req.body,Number(req.params.id))
        res.status(200).json(result)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const deleteBlog = async(req:Request,res:Response)=>{
    try {
        const result = await blogService.deleteBlog(Number(req.params.id))
        res.status(200).json(result)
    } catch (error:any) {
        return errorResponse(error)
    }
}
export const StatsController = {
    async getStats(req: Request, res: Response) {
      try {
        const data = await StatsService.getDashboardStats();
    
        res.status(200).json({
          message: "Dashboard stats fetched successfully",
          data,
        });
      } catch (error: any) {
        res.status(500).json({
          message: "Failed to fetch stats",
          error: error.message,
        });
      }
    },
  };

export const blogController={
getSingleBlog,
getAllBlogs,
deleteBlog,
updateBlog,
createBlog,
getPopularBlogs
}