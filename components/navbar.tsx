import Link from "next/link";
import { LoginButton } from "./auth/login-button";
import { auth } from "@/auth";
import { LogoutButton } from "./auth/logout-button";
import { AuthAvatar } from "./auth/auth-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export const Navbar = async () => {
    const session = await auth();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 h-14">
            <div className="container h-full grid grid-cols-3 items-center justify-between px-4 md:px-6 mx-auto">
                <div className="col-span-1"></div>
                <Link href="/" className="col-span-1 flex justify-center">
                    <span className="font-bold text-xl tracking-tighter">VOUCH</span>
                </Link>

                {
                    !session &&
                    <div className="col-span-1 flex justify-end">
                        <LoginButton />
                    </div>
                }
                {
                    session &&
                    <div className="col-span-1 flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 cursor-pointer">
                                    <AuthAvatar image={session.user?.image || ""} name={session.user?.name || ""} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40 mt-2" align="end">
                                <DropdownMenuGroup className="flex items-center justify-start gap-2 p-1">
                                    <AuthAvatar image={session.user?.image || ""} name={session.user?.name || ""} />
                                    <p className="font-medium">{session.user?.name || ""}</p>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup className="p-1">
                                    <LogoutButton className="w-full" />
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                }
            </div>
        </header>
    );
};
