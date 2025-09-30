/* eslint-disable @typescript-eslint/no-explicit-any */

import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
    name:string,
    email:string
}
function isTokenPayload(obj: any): obj is TokenPayload {
  return obj && typeof obj.userId === 'string'; // add required fields check
}

export function UserFromToken(accessToken: string | null) {
  if (!accessToken) return null

  try {
    const decoded = jwtDecode<TokenPayload>(accessToken)
    if (isTokenPayload(decoded)) return decoded;
    return null; 
  } catch (e) {
    console.error("Invalid token", e)
    return null
  }
}