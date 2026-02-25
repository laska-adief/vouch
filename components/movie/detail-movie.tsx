import Image from "next/image";
import { Star, Clock, Calendar, Film, Tv, Globe, Users, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import type { MovieDetail, TVDetail, CastMember, CrewMember } from "@/lib/tmdb";

type Detail = MovieDetail | TVDetail;

function formatRuntime(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatMoney(amount: number) {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(amount);
}

function getTitle(detail: Detail) {
    return detail.media_type === "movie" ? detail.title : detail.name;
}

function getYear(detail: Detail) {
    const date = detail.media_type === "movie" ? detail.release_date : detail.first_air_date;
    return date ? new Date(date).getFullYear() : "N/A";
}

function getDirectors(crew: CrewMember[]) {
    return crew.filter((c) => c.job === "Director").map((c) => c.name);
}

function getCreators(crew: CrewMember[]) {
    return crew.filter((c) => c.department === "Writing" && c.job === "Creator").map((c) => c.name);
}

function ScoreRing({ score }: { score: number }) {
    const pct = score / 10;
    const r = 22;
    const circ = 2 * Math.PI * r;
    const dash = pct * circ;
    const color = score >= 7 ? "#22c55e" : score >= 5 ? "#eab308" : "#ef4444";

    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="28" cy="28" r={r} fill="none" stroke="currentColor" strokeWidth="4"
                    className="text-muted/40" />
                <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="4"
                    strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
            </svg>
            <span className="text-sm font-bold" style={{ color }}>{score.toFixed(1)}</span>
        </div>
    );
}

function CastCard({ member }: { member: CastMember }) {
    return (
        <div className="flex flex-col items-center gap-2 w-24">
            <Avatar className="w-16 h-16 ring-2 ring-border">
                {member.profile_path ? (
                    <AvatarImage
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                    />
                ) : null}
                <AvatarFallback className="text-xs bg-muted">
                    {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
            </Avatar>
            <div className="text-center">
                <p className="text-xs font-semibold leading-tight line-clamp-2">{member.name}</p>
                <p className="text-xs text-muted-foreground leading-tight line-clamp-2 mt-0.5">{member.character}</p>
            </div>
        </div>
    );
}

export default function DetailMovie({ detail }: { detail: Detail }) {
    const title = getTitle(detail);
    const year = getYear(detail);
    const backdropUrl = detail.backdrop_path
        ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
        : null;
    const posterUrl = detail.poster_path
        ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
        : null;

    const directors = getDirectors(detail.credits?.crew ?? []);
    const creators = getCreators(detail.credits?.crew ?? []);
    const topCast = (detail.credits?.cast ?? []).slice(0, 12);

    const langNames: Record<string, string> = {
        en: "English", ja: "Japanese", ko: "Korean", fr: "French",
        es: "Spanish", de: "German", zh: "Chinese", hi: "Hindi",
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ── Hero / Backdrop ── */}
            <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
                {backdropUrl ? (
                    <Image
                        src={backdropUrl}
                        alt={title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-top"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950" />
                )}
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />

                {/* Back button */}
                <div className="absolute top-4 left-4 z-10">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 bg-background/50 backdrop-blur-sm hover:bg-background/70 border border-border/50"
                        asChild
                    >
                        <Link href="/">
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </Link>
                    </Button>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="container mx-auto px-4 max-w-7xl relative z-10 -mt-40 md:-mt-56 pb-16 ">
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
                    {/* Poster */}
                    <div className="relative w-40 md:w-56 aspect-2/3 rounded-lg overflow-hidden shadow-2xl mx-auto md:mx-0">
                        {posterUrl ? (
                            <Image
                                src={posterUrl}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 160px, 224px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                                <Film className="w-12 h-12 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-3 flex-1">

                        <div>
                            {/* Media type badge */}
                            <Badge
                                variant="secondary"
                                className="gap-1.5 bg-background/60 backdrop-blur-sm border border-border text-foreground"
                            >
                                {detail.media_type === "movie"
                                    ? <><Film className="w-3 h-3" /> Movie</>
                                    : <><Tv className="w-3 h-3" /> TV Series</>
                                }
                            </Badge>

                            {/* Title & year */}
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                                {title}
                            </h1>
                            {detail.media_type === "movie" && detail.original_title !== title && (
                                <p className="text-sm text-muted-foreground mt-0.5">{detail.original_title}</p>
                            )}
                            {detail.media_type === "tv" && detail.original_name !== title && (
                                <p className="text-sm text-muted-foreground mt-0.5">{detail.original_name}</p>
                            )}
                        </div>

                        {/* Tagline */}
                        {detail.tagline && (
                            <p className="text-muted-foreground italic text-sm">"{detail.tagline}"</p>
                        )}

                        {/* Quick stats row */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {year}
                            </span>
                            {detail.media_type === "movie" && detail.runtime > 0 && (
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {formatRuntime(detail.runtime)}
                                </span>
                            )}
                            {detail.media_type === "tv" && (
                                <>
                                    <span className="flex items-center gap-1">
                                        <Tv className="w-3.5 h-3.5" />
                                        {detail.number_of_seasons} Season{detail.number_of_seasons !== 1 ? "s" : ""}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Film className="w-3.5 h-3.5" />
                                        {detail.number_of_episodes} Episodes
                                    </span>
                                </>
                            )}
                            <span className="flex items-center gap-1">
                                <Globe className="w-3.5 h-3.5" />
                                {langNames[detail.original_language] ?? detail.original_language.toUpperCase()}
                            </span>
                            <Badge
                                variant="outline"
                                className={`text-xs font-medium ${detail.status === "Released" || detail.status === "Ended" || detail.status === "Canceled"
                                    ? "border-muted-foreground/40"
                                    : "border-green-500/50 text-green-600 dark:text-green-400"
                                    }`}
                            >
                                {detail.status}
                            </Badge>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-1.5">
                            {detail.genres.map((g) => (
                                <Badge key={g.id} variant="secondary" className="text-xs">
                                    {g.name}
                                </Badge>
                            ))}
                        </div>

                        {/* Score + vote count */}
                        <div className="flex items-center gap-3">
                            <ScoreRing score={detail.vote_average} />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">TMDB Score</span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {detail.vote_count.toLocaleString()} votes
                                </span>
                            </div>
                        </div>

                        {/* Overview */}
                        <div>
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Overview</h2>
                            <p className="text-sm leading-relaxed text-foreground/90">
                                {detail.overview || "No overview available."}
                            </p>
                        </div>

                        {/* Director / Creator */}
                        {directors.length > 0 && (
                            <div>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                    Director{directors.length > 1 ? "s" : ""}
                                </span>
                                <p className="text-sm font-medium mt-0.5">{directors.join(", ")}</p>
                            </div>
                        )}
                        {creators.length > 0 && (
                            <div>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                    Creator{creators.length > 1 ? "s" : ""}
                                </span>
                                <p className="text-sm font-medium mt-0.5">{creators.join(", ")}</p>
                            </div>
                        )}

                        {/* Budget / Revenue (movies only) */}
                        {detail.media_type === "movie" && (detail.budget > 0 || detail.revenue > 0) && (
                            <div className="flex gap-6">
                                {detail.budget > 0 && (
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Budget</span>
                                        <p className="text-sm font-medium mt-0.5">{formatMoney(detail.budget)}</p>
                                    </div>
                                )}
                                {detail.revenue > 0 && (
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Revenue</span>
                                        <p className="text-sm font-medium mt-0.5">{formatMoney(detail.revenue)}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Cast ── */}
                {topCast.length > 0 && (
                    <div className="mt-10">
                        <Separator className="mb-6" />
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-muted-foreground" />
                            Top Cast
                        </h2>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {topCast.map((member) => (
                                <CastCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Production Companies ── */}
                {detail.production_companies?.length > 0 && (
                    <div className="mt-10">
                        <Separator className="mb-6" />
                        <h2 className="text-lg font-bold mb-4">Production</h2>
                        <div className="flex flex-wrap gap-3">
                            {detail.production_companies.map((company) => (
                                <div
                                    key={company.id}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/60 border border-border/50 text-sm"
                                >
                                    {company.logo_path ? (
                                        <div className="relative h-6 w-6">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                                alt={company.name}
                                                fill
                                                sizes="40px"
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : null}
                                    <span className="text-muted-foreground font-medium">{company.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}