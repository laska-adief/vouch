import { auth } from "./auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    const isProtectedRoute = ["/my-recommendation"].some((route) =>
        nextUrl.pathname.startsWith(route)
    )

    if (isProtectedRoute && !isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl))
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
