import Link from "next/link";

export const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 h-14">
            <div className="h-full flex items-center justify-center">
                <Link href="/">
                    <span className="font-bold text-xl tracking-tighter">VOUCH</span>
                </Link>
            </div>
        </header>
    );
};
