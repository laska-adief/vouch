import { RecommendationCard } from "@/components/movie-rec/recommendation-card";
import { getRecommendationsByUser } from "@/actions/recomendation.action";
import { auth } from "@/auth";

export default async function MyRecommendation() {
    const session = await auth();
    const recommendations = await getRecommendationsByUser(session?.user?.id || "0");
    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <div className="w-full">
                <h2 className="text-2xl font-bold mb-6">My Recommendations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recommendations && recommendations.length > 0 && recommendations.map((movie) => (
                        <RecommendationCard key={movie.id} movie={movie} isEditable={true} />
                    ))}

                </div>

                {recommendations && recommendations.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="p-4 rounded-full bg-muted mb-4">
                            <svg
                                className="w-8 h-8 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                                />
                            </svg>
                        </div>

                        <h3 className="text-lg font-semibold mb-2">No recommendations yet</h3>
                        <p className="text-muted-foreground max-w-md">
                            You haven't recommended any movies or TV shows yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}