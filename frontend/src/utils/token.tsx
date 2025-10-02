/* eslint-disable @typescript-eslint/no-explicit-any */

import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
    name:string,
    email:string
}

export function UserFromToken(accessToken: string | null) {
  if (!accessToken) return null

  try {
    const decoded = jwtDecode<TokenPayload>(accessToken)
    if(decoded) return decoded
    return null; 
  } catch (e) {
    console.error("Invalid token", e)
    return null
  }
}