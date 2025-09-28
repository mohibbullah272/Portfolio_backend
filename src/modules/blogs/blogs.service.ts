import { Prisma } from "@prisma/client";
import prisma from "../../config/db";
import { errorResponse, successResponse } from "../../api/ApiResponse";


const getAllBlogs =async()=>{
    try {
        const result = await prisma.blogs.findMany()
        return successResponse(result)
    } catch (error:any) {
        console.log(error)
        return errorResponse(error)
    }
}
const getSingleBlog = async(id:number)=>{
    try {
        const blog = await prisma.blogs.findUnique({
            where:{
                id
            }
        })
        return successResponse(blog)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const createBlog = async(payload:Prisma.BlogsCreateInput)=>{
    try {
        if(!payload){
            return {success:false , message:"no data found", data:null}
        }
        const result = await prisma.blogs.create({
            data:payload
        })
        return successResponse(result)
    } catch (error:any) {
        console.log(error)
        return errorResponse(error)
    }
}

const updateBlog = async(payload:Prisma.BlogsUpdateInput,id:number)=>{
    try {
        if(!payload){
            return {success:false , message:"no payload found", data:null}
        }
   const result = await prisma.blogs.update({
    where:{
        id
    },
    data:payload
   })
        return successResponse(result)
    } catch (error:any) {
        console.log(error)
        return errorResponse(error)
    }
}
const deleteBlog = async(id:number)=>{
    try {
        if(!id){
            return {success:false , message:"no data found", data:null}
        }
        const result = await prisma.blogs.delete({
            where:{
                id
            }
        })
        return successResponse(result)
    } catch (error:any) {
        console.log(error)
        return errorResponse(error)
    }
}
