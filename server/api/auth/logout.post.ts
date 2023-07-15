import { serialize } from "cookie";

export default defineEventHandler(async (event) => {

  const serializedAccessToken = serialize('access_token', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  const serializedAccessExpTimestamp = serialize('access_exp_timestamp', '', {
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  const serializedRefreshToken = serialize('refresh_token', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  const serializedRefreshExpTimestamp = serialize('refresh_exp_timestamp', '', {
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  const record: Record<string, string[]> = { 
    "Set-Cookie" : [
      serializedAccessToken, 
      serializedRefreshToken,
      serializedAccessExpTimestamp,
      serializedRefreshExpTimestamp
    ] 
  }

  setHeaders(event, record)


  return {
    message: 'Logout successful',
  }
});