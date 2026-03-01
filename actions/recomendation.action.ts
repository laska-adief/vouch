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

export async function updateRecommendation(payload: IRecomendationReq): Promise<IRecomendationRes | null> {
    try {
        const session = await auth();

        const newRec = await prisma.recommendation.update({
            where: {
                id: payload.id,
            },
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
        revalidatePath("/my-recommendation");
        return newRec as IRecomendationRes;
    } catch (error) {
        console.log("Error creating recommendation", error);
        return null;
    }
}

export async function deleteRecommendation(id: string): Promise<IRecomendationRes | null> {
    try {
        const deletedRec = await prisma.recommendation.delete({
            where: {
                id,
            },
        });
        revalidatePath("/my-recommendation");
        return deletedRec as IRecomendationRes;
    } catch (error) {
        console.log("Error deleting recommendation", error);
        return null;
    }
}

export async function getRecommendations(): Promise<IRecomendationRes[]> {
    try {
        const recommendations = await prisma.recommendation.findMany({
            orderBy: {
                createdAt: "desc",
            },
        })
        return recommendations as IRecomendationRes[];
    } catch (error) {
        console.log("Error getting recommendations", error);
        return [];
    }
}

export async function getRecommendationsByUser(userId: string): Promise<IRecomendationRes[]> {
    try {
        const recommendations = await prisma.recommendation.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                userId,
            },
        })
        return recommendations as IRecomendationRes[];
    } catch (error) {
        console.log("Error getting recommendations", error);
        return [];
    }
}