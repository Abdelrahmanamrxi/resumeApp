import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function getErrorMessage(error:unknown): string | null{
  if(error && typeof error==="object" && "data" in error){
    const err = error as FetchBaseQueryError & { data?: { message?: string } };
    return err.data?.message || "Something Went Wrong";
  }
  return null
}
export default getErrorMessage