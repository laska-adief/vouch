import { notFound } from "next/navigation";
import { getMovieDetails } from "@/lib/tmdb";
import DetailMovie from "@/components/movie/detail-movie";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const detail = await getMovieDetails(id).catch(() => null);
    if (!detail) return { title: "Movie Not Found | Vouch" };
    return {
        title: `${detail.title} (${new Date(detail.release_date).getFullYear()}) | Vouch`,
        description: detail.overview,
    };
}

export default async function MovieDetailPage({ params }: Props) {
    const { id } = await params;
    const detail = await getMovieDetails(id).catch(() => null);
    if (!detail || !detail.id) notFound();
    return <DetailMovie detail={detail} />;
}
