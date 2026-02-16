"use client";

import { useState, useEffect } from "react";
import { Loader2, Search } from "lucide-react";
import { searchMulti, SearchResult } from "@/lib/tmdb";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "../ui/button";
import { toast } from "sonner";
import MovieItem from "./movie-item";

export default function SearchBar({ onSelectMovie }: { onSelectMovie?: (movie: SearchResult) => void }) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchedQuery, setSearchedQuery] = useState("");

    const handleSelectMovie = (movie: SearchResult) => {
        onSelectMovie?.(movie)
        setQuery("");
        setResults([]);
        setSearchedQuery("");
    }

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery || debouncedQuery.length < 3) {
                setResults([]);
                setSearchedQuery("");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await searchMulti(debouncedQuery);
                const filteredResults = data.results
                    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
                    .sort((a, b) => {
                        const yearA = parseInt((a.media_type === 'movie' ? a.release_date : a.first_air_date)?.split("-")[0] || "0");
                        const yearB = parseInt((b.media_type === 'movie' ? b.release_date : b.first_air_date)?.split("-")[0] || "0");

                        const scoreA = (yearA * 10) + a.popularity;
                        const scoreB = (yearB * 10) + b.popularity;

                        return scoreB - scoreA;
                    });
                setResults(filteredResults);
                setSearchedQuery(debouncedQuery);
            } catch {
                toast.error("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                    id="search-movie"
                    type="text"
                    value={query}
                    placeholder="Search for a Movie or TV..."
                    className="block w-full pl-10 pr-3 py-2.5 border border-input rounded-lg leading-5 bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent sm:text-sm"
                    onChange={(e) => setQuery(e.target.value)}
                />
                {loading && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                    </div>
                )}
            </div>
            {results.length > 0 && (
                <div className="search-results absolute z-10 w-full mt-1 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg overflow-y-auto max-h-60">
                    {results.map((item) => (
                        <Button
                            variant="ghost"
                            key={item.id}
                            className="w-full justify-start h-auto py-2 text-left font-normal"
                            onClick={() => handleSelectMovie(item)}
                        >
                            <MovieItem item={{
                                title: item.media_type === 'movie' ? item.title : item.name, release_date: item.media_type === 'movie' ? item.release_date : item.first_air_date,
                                poster_path: item.poster_path || "",
                                media_type: item.media_type
                            }} />
                        </Button>
                    ))}
                </div>
            )}

            {
                results.length === 0 && !loading && query.length > 2 && searchedQuery === query && (
                    <div className="w-full mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-y-auto max-h-60">
                        <div className="flex items-center justify-center h-16">
                            <span className="text-muted-foreground">No results found</span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
