import { notFound } from "next/navigation";
import { getTVDetails } from "@/lib/tmdb";
import DetailMovie from "@/components/movie/detail-movie";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const detail = await getTVDetails(id).catch(() => null);
    if (!detail) return { title: "TV Show Not Found | Vouch" };
    return {
        title: `${detail.name} (${new Date(detail.first_air_date).getFullYear()}) | Vouch`,
        description: detail.overview,
    };
}

export default async function TVDetailPage({ params }: Props) {
    const { id } = await params;
    const detail = await getTVDetails(id).catch(() => null);
    if (!detail || !detail.id) notFound();
    return <DetailMovie detail={detail} />;
}
