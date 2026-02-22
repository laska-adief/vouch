import Link from "next/link";
import { LoginButton } from "./auth/login-button";
import { auth } from "@/auth";
import { LogoutButton } from "./auth/logout-button";
import { AuthAvatar } from "./auth/auth-avatar";

export const Navbar = async () => {
    const session = await auth()
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 h-14">
            <div className="container h-full flex items-center justify-between px-4 mx-auto">
                <div></div>
                <Link href="/">
                    <span className="font-bold text-xl tracking-tighter">VOUCH</span>
                </Link>
                <>
                    {
                        session ? (
                            <div className="flex items-center gap-2">
                                <AuthAvatar image={session.user?.image || ""} name={session.user?.name || ""} />
                                <LogoutButton />
                            </div>
                        ) : (
                            <LoginButton />
                        )
                    }
                </>
            </div>
        </header>
    );
};
