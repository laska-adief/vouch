"use client"

import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useRef, useState } from "react";
import { RecommendationCardProps } from "@/types/Recommendation";


export const RecommendationCard = ({ movie }: RecommendationCardProps) => {
    const reviewRef = useRef<HTMLQuoteElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        if (reviewRef.current) {
            const { scrollHeight, clientHeight } = reviewRef.current;
            setIsTruncated(scrollHeight > clientHeight);
        }
    }, [movie.review]);

    return (
        <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${movie.userName}`} />
                    <AvatarFallback>{movie.userName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="text-sm font-medium leading-none">{movie.userName}</p>
                    <p className="text-xs text-muted-foreground">Recommended this</p>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full w-fit">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-bold text-yellow-700 dark:text-yellow-500">{movie.rating}/10</span>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 gap-4 flex flex-col grow">
                <blockquote
                    ref={reviewRef}
                    className="border-l-2 pl-4 italic text-muted-foreground text-sm line-clamp-4"
                >
                    {movie.review}
                </blockquote>

                {isTruncated && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className="p-0 h-auto text-xs text-primary self-start -mt-2 mb-2">
                                Read full review
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                                <div className="flex items-center justify-between pr-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar>
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${movie.userName}`} />
                                            <AvatarFallback>{movie.userName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col text-left">
                                            <DialogTitle>{movie.userName}</DialogTitle>
                                            <DialogDescription>Recommended {movie.title}</DialogDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full w-fit">
                                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                        <span className="text-sm font-bold text-yellow-700 dark:text-yellow-500">{movie.rating}/10</span>
                                    </div>
                                </div>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <blockquote className="border-l-2 pl-4 italic text-muted-foreground max-h-72 overflow-y-auto pr-2">
                                    {movie.review}
                                </blockquote>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}

                <div className="flex gap-3 bg-muted/50 p-3 rounded-lg mt-auto">
                    <div className="relative aspect-2/3 w-16 shrink-0 rounded overflow-hidden">
                        {movie.posterPath ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                                alt={movie.title}
                                fill
                                sizes="64px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted text-xs">No Img</div>
                        )}
                    </div>
                    <div className="flex flex-col justify-center gap-1 overflow-hidden">
                        <h4 className="font-semibold text-sm truncate">{movie.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{new Date(movie.releaseDate).getFullYear()}</span>
                            <span>•</span>
                            <span>{movie.mediaType === 'movie' ? 'Movie' : 'TV'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="w-3 h-3" />
                            <span>{movie.voteAverage.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
