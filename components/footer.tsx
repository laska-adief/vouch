import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { Github, Mail, Instagram } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container px-4 md:px-6 py-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={Logo} alt="Logo" width={28} height={28} />
                            <span className="font-bold text-lg tracking-tighter uppercase font-sans">VOUCH</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Skip the scroll. Discover movies and TV shows recommended by people, not algorithms. Your next favorite story is just a vouch away.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 items-center md:items-end text-center md:text-right">
                        <h4 className="font-semibold text-sm">Connect</h4>
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://github.com/laska-adief/vouch"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Github className="w-5 h-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href="https://instagram.com/laskadief"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                href="mailto:laskaadief.la@gmail.com"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                                <span className="sr-only">Email</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-xs text-muted-foreground">
                        <span>© {new Date().getFullYear()} Vouch, Inc. All rights reserved.</span>
                        <span className="block md:inline mt-1 md:mt-0">
                            {" "}Built by{" "}
                            <Link
                                href="https://github.com/laska-adief"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
                            >
                                Laska Adief
                            </Link>
                        </span>
                    </p>
                    <div className="flex items-center gap-4 justify-center md:justify-end">
                        <p className="text-xs text-muted-foreground">
                            Data provided by TMDB
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
