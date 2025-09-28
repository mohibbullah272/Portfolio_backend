import { Request, Response } from "express"
import { errorResponse } from "../../api/ApiResponse"
import { projectService } from './project.service';

const getAllProject =async(req:Request,res:Response)=>{
    try {
        const projects = await projectService.getAllProject()
        res.status(200).json(projects)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const getSingleProject = async(req:Request,res:Response)=>{
    try {
        const project = await projectService.getSingleProject(Number(req.params.id))
        res.status(200).json(project)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const createProject = async(req:Request,res:Response)=>{
    try {
        const result = await projectService.createProject(req.body)
        res.status(201).json(result)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const updateProject = async(req:Request,res:Response)=>{
    try {
        const result = await projectService.updateProject(req.body,Number(req.params.id))
        res.status(200).json(result)
    } catch (error:any) {
        return errorResponse(error)
    }
}

const deleteProject = async(req:Request,res:Response)=>{
    try {
        const result = await projectService.deleteProject(Number(req.params.id))
        res.status(200).json(result)
    } catch (error:any) {
        return errorResponse(error)
    }
}
