export interface IRecomendationReq {
    tmdbId: string;
    title: string;
    mediaType: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    rating: string;
    review: string;
    userId: string;
    userName: string;
    userEmail: string;
    userImage: string;
}

export interface IRecomendationRes extends MovieRecommendation {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MovieRecommendation {
    tmdbId: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    mediaType: "movie" | "tv";
    voteAverage: number;
    review: string;
    rating: string;
    userId: string;
    userName: string;
    userEmail: string;
    userImage: string;
}

export interface RecommendationCardProps {
    movie: MovieRecommendation;
}