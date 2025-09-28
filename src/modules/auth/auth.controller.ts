import { Request,Response } from "express";
import { AuthService } from "./auth.service";


const createUser = async(req:Request,res:Response)=>{
    try {
        const result = await AuthService.createAccount(req.body)
        res.status(201).json({
            "message":"user create successful",
            data:result
        })
    } catch (error:any) {
        return {success:false, error:error?.message|| 'something went wrong'}
    }
}
const loginUser = async(req:Request,res:Response)=>{
    try {
        const result = await AuthService.login(req.body)
        res.status(200).json({
            "message":"user found successful",
            data:result
        })
    } catch (error:any) {
        return {success:false, error:error?.message|| 'something went wrong'}
    }
}
export const authController ={
    createUser,
    loginUser
}