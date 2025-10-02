import { Prisma } from "@prisma/client";
import prisma from "../../config/db";
import { errorResponse } from "../../api/ApiResponse";


const getPopularBlogs = async()=>{
    try {
        const result = await prisma.blogs.findMany({
            orderBy:{
                viewCount:"desc"
            },
            take:3
        })
        return result
    } catch (error:any) {
        return errorResponse(error)
    }
}

const getAllBlogs =async()=>{
    try {
        const result = await prisma.blogs.findMany()
        return result
    } catch (error:any) {
        console.log(error)
        return errorResponse(error)
    }
}
const getSingleBlog = async(id:number)=>{
    try {
     await prisma.blogs.update({
            where:{
                id
            },
            data:{
                viewCount:{
                    increment:1
                }
            }
        })
        const blog = await prisma.blogs.findUnique({
            where:{
                id
            }
        })
        return blog
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
      
        return result
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
        return result
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
        return result
    } catch (error:any) {
        console.log(error)
        return errorResponse(error)
    }
}

export const StatsService = {
    async getDashboardStats() {
      // total users
      const totalUsers = await prisma.user.count();
  
      // total blogs
      const totalBlogs = await prisma.blogs.count();
  
      // total projects
      const totalProjects = await prisma.projects.count();
  
      // blog view count sum
      const blogViews = await prisma.blogs.aggregate({
        _sum: { viewCount: true },
      });
  
      // project view count sum
      const projectViews = await prisma.projects.aggregate({
        _sum: { viewCount: true },
      });
  
      // top 5 blogs by views
      const topBlogs = await prisma.blogs.findMany({
        orderBy: { viewCount: "desc" },
        take: 5,
      });
  
      // top 5 projects by views
      const topProjects = await prisma.projects.findMany({
        orderBy: { viewCount: "desc" },
        take: 5,
      });
  
      // recent 5 users
      const latestUsers = await prisma.user.findMany({
        orderBy: { id: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, role: true },
      });
  
      return {
        users: totalUsers,
        blogs: totalBlogs,
        projects: totalProjects,
        blogViews: blogViews._sum.viewCount || 0,
        projectViews: projectViews._sum.viewCount || 0,
        topBlogs,
        topProjects,
        latestUsers,
      };
    },
  };
export const blogService ={
    getAllBlogs,
    getSingleBlog,
    deleteBlog,
    updateBlog,
    createBlog,
    getPopularBlogs
}


