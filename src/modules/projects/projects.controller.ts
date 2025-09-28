import { Request, Response } from "express"
import { errorResponse } from "../../api/ApiResponse"

const getAllBlogs =async(req:Request,res:Response)=>{
    try {
        const blogs = await blogService.getAllBlogs()
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
        return errorResponse(error)
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
