'use server'

import prisma from "@/lib/prisma";
import { IRecomendationReq, IRecomendationRes } from "@/types/Recommendation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createRecommendation(payload: IRecomendationReq): Promise<IRecomendationRes | null> {
    try {
        const session = await auth();

        const newRec = await prisma.recommendation.create({
            data: {
                tmdbId: payload.tmdbId,
                title: payload.title,
                mediaType: payload.mediaType,
                posterPath: payload.posterPath,
                releaseDate: payload.releaseDate,
                voteAverage: payload.voteAverage,
                rating: payload.rating,
                review: payload.review,
                userId: session?.user?.id || "0",
                userName: session?.user?.name || "0",
                userEmail: session?.user?.email || "0",
                userImage: session?.user?.image || "0",
            },
        });
        revalidatePath("/");
        return newRec as IRecomendationRes;
    } catch (error) {
        console.log("Error creating recommendation", error);
        return null;
    }
}

export async function getRecommendations(): Promise<IRecomendationRes[]> {
    try {
        const recommendations = await prisma.recommendation.findMany()
        return recommendations as IRecomendationRes[];
    } catch (error) {
        console.log("Error getting recommendations", error);
        return [];
    }
}