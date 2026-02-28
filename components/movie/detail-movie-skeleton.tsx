import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function DetailMovieSkeleton() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ── Hero / Backdrop ── */}
            <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden bg-muted/30 animate-pulse">
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />
            </div>

            {/* ── Main Content ── */}
            <div className="container mx-auto px-4 max-w-7xl relative z-10 -mt-40 md:-mt-56 pb-16 ">
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
                    {/* Poster */}
                    <Skeleton className="w-40 md:w-56 aspect-2/3 rounded-lg shadow-2xl mx-auto md:mx-0" />

                    {/* Info */}
                    <div className="flex flex-col gap-4 flex-1 w-full">
                        <div>
                            {/* Media type badge skeleton */}
                            <Skeleton className="h-6 w-24 mb-3" />
                            {/* Title skeleton */}
                            <Skeleton className="h-10 md:h-12 w-3/4 mb-2" />
                            {/* Tagline skeleton */}
                            <Skeleton className="h-4 w-1/2 italic" />
                        </div>

                        {/* Quick stats row */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-24" />
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-1.5">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-16" />
                        </div>

                        {/* Score ring skeleton */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-16 h-16 rounded-full" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>

                        {/* Cast area header */}
                        <div className="flex gap-6 mt-4">
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Cast Skeleton ── */}
                <div className="mt-10">
                    <Separator className="mb-6" />
                    <Skeleton className="h-7 w-32 mb-4" />
                    <div className="flex gap-4 overflow-hidden pb-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 w-24 shrink-0">
                                <Skeleton className="w-16 h-16 rounded-full" />
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-2 w-16" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Production Skeleton ── */}
                <div className="mt-10">
                    <Separator className="mb-6" />
                    <Skeleton className="h-7 w-32 mb-4" />
                    <div className="flex flex-wrap gap-3">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-32 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
