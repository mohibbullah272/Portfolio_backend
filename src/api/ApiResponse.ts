


export const successResponse =(payload:any)=>{
    return{
        success:payload?.success,
        data:payload?.data,
        message:payload?.message
    }


}

export const errorResponse = (payload: any) => {

    const baseResponse = {
      success: false,
      data: null,
      message: "An unexpected error occurred.",
      details: {
        errorType: "unknown",
        suggestion: "Please check the server logs for more details or contact the support team.",
      },
    };
  

    if (!payload) {
      return {
        ...baseResponse,
        message: "No error payload provided.",
        details: {
          errorType: "invalid_payload",
          suggestion: "Ensure the error payload is provided when calling errorResponse.",
        },
      };
    }
  

    if (payload instanceof Error && payload.name === "PrismaClientValidationError") {
      const missingFieldMatch = payload.message.match(/Argument `(\w+)` is missing/);
      if (missingFieldMatch) {
        const missingField = missingFieldMatch[1];
        return {
          ...baseResponse,
          message: `Failed to complete operation: The '${missingField}' field is required but was not provided.`,
          details: {
            errorType: "missing_field",
            missingField: missingField,
            suggestion: `Ensure the '${missingField}' field is included in the input data. Example: { ${missingField}: 'Your ${missingField}' }`,
            location: payload.stack?.split("\n")[1]?.match(/at.*\((.*):(\d+):(\d+)/)?.slice(1, 3).join(":") || "unknown",
          },
        };
      }

      return {
        ...baseResponse,
        message: "Invalid input data provided for the operation.",
        details: {
          errorType: "prisma_validation",
          suggestion: "Check the input data format and ensure all required fields are correctly provided.",
          rawError: payload.message,
        },
      };
    }
  

    if (payload instanceof Error && payload.name.includes("PrismaClient")) {
      return {
        ...baseResponse,
        message: "A database error occurred during the operation.",
        details: {
          errorType: "prisma_database",
          suggestion: "Verify the database connection and schema configuration. Check server logs for details.",
          rawError: payload.message,
        },
      };
    }
  

    if (payload instanceof Error) {
      return {
        ...baseResponse,
        message: payload.message || "An unexpected error occurred.",
        details: {
          errorType: "generic_error",
          suggestion: "Review the operation and input data. Check server logs for detailed error information.",
          rawError: payload.message,
        },
      };
    }

    if (payload.success !== undefined && payload.message) {
      return {
        success: payload.success,
        data: null,
        message: payload.message,
        details: {
          errorType: "custom",
          suggestion: "Follow the provided error message to resolve the issue.",
        },
      };
    }
  

    return baseResponse;
  };