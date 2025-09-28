


export const successResponse =(payload:any)=>{
    return{
        success:payload?.success,
        data:payload?.data,
        message:payload?.message
    }


}


export const errorResponse = (payload:any)=>{
    return{
        success:payload?.success,
        data:null,
        message:payload?.message
    }
}