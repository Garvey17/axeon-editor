import NextAuth from "next-auth";
import authConfig from "./auth.config";
const {auth} = NextAuth(authConfig)

const publicRoutes = [
   
]

const protectedRoutes = [
    "/",
    
]

const authRoutes = [
    "/auth/sign-in",   // Added leading slash
   
]

const apiAuthPrefix = "/api/auth"

const DEFAULT_LOGIN_REDIRECT = "/"; // Changed to redirect to home page after login


export default auth((req) => {
    const {nextUrl} = req //destructuring 
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute){
        return null
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL("/", nextUrl))
        }
        return null
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/sign-in", nextUrl))
    }
    return null
})

export const config = {
  // copied from clerk
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
