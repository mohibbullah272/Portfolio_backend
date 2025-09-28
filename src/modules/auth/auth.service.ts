
import { Prisma } from '@prisma/client';
import prisma from '../../config/db';


const getMe =async(email:string,password:string)=>{
try {
    if(!email){
        return {success:false, error:"email is required"}
    }
    const result = await prisma.user.findUnique({
        where:{
            email
        }
    })
    return {success : true , error:false , data:result}
} catch (error:any ) {
    return {success:false, error:error?.message|| 'something went wrong'}
}
}

const createAccount = async(payload:Prisma.UserCreateInput)=>{
    try {
        if(!payload.email){
            return {success:false, error:"email is required"}
        }
        const result = await prisma.user.create({
            data:payload
        })
        return {success : true , error:false , data:result}
    } catch (error:any) {
        return {success:false, error:error?.message|| 'something went wrong'}
    }
}
const login = async(payload:any)=>{
try {
    if(!payload.email){
        return "email is required"
    }

    const user = await prisma.user.findUnique({
        where:{
            email:payload?.email
        }
    })
    if(user?.password === payload.password){
            return user
    }else{
        return "incorrect credentials"
    }
} catch (error:any) {
    return {success:false, error:error?.message|| 'something went wrong'}
}
}

export const AuthService={
    login,
    createAccount
}