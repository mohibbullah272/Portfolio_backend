import { Prisma } from "@prisma/client"
import { errorResponse, successResponse } from "../../api/ApiResponse"
import prisma from "../../config/db"

const getAllProject =async()=>{
    try {
        const result = await prisma.projects.findMany()
        return successResponse(result)
    } catch (error:any) {
        console.log(error)
        return errorResponse(error)
    }
}
const getSingleProject = async(id:number)=>{
    try {
     await prisma.projects.update({
            where:{
                id
            },
            data:{
                viewCount:{
                    increment:1
                }
            }
        })
        const project = await prisma.projects.findUnique({
            where:{
                id
            }
        })
        return successResponse(project)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const createProject = async(payload:Prisma.ProjectsCreateInput)=>{
    try {
        if(!payload){
            return {success:false , message:"no data found", data:null}
        }
        const result = await prisma.projects.create({
            data:payload
        })
        return successResponse(result)
    } catch (error:any) {
        console.log(error)
        return errorResponse(error)
    }
}

const updateProject = async(payload:Prisma.ProjectsUpdateInput,id:number)=>{
    try {
        if(!payload){
            return {success:false , message:"no payload found", data:null}
        }
   const result = await prisma.projects.update({
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
const deleteProject = async(id:number)=>{
    try {
        if(!id){
            return {success:false , message:"no data found", data:null}
        }
        const result = await prisma.projects.delete({
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


export const projectService ={
    getAllProject,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject
}