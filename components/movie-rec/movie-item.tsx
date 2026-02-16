import Image from "next/image";

export default function MovieItem({ item }: {
    item: {
        title: string;
        media_type: "movie" | "tv";
        release_date: string;
        poster_path: string;
    }
}) {
    return (
        <div className="flex items-center gap-2 w-full">
            {item.poster_path ? (
                <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="h-12 w-8 object-cover rounded"
                />
            ) : (
                <div className="w-8 h-12 bg-muted rounded flex items-center justify-center">
                    <span className="text-muted-foreground">?</span>
                </div>
            )}
            <div className="flex flex-col overflow-hidden">
                <span className="truncate font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground truncate">
                    {item.media_type === "movie" ? "Movie" : "TV"} • {item.release_date?.split("-")[0] || "N/A"}
                </span>
            </div>
        </div>
    )
}