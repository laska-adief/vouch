import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import SearchBar from "./search-bar"
import { useForm, useWatch, Control } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SearchResult } from "@/lib/tmdb"
import { Button } from "../ui/button"
import MovieItem from "./movie-item"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { IRecomendationReq } from "@/types/Recommendation"
import { createRecommendation } from "@/actions/recomendation.action"
import { toast } from "sonner"

const formSchema = z.object({
    id: z.string(),
    tmdbId: z.string(),
    title: z.string().min(1, "Title is required."),
    media_type: z.enum(["movie", "tv"]),
    poster_path: z.string(),
    release_date: z.string(),
    vote_average: z.number(),
    rating: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 10, "Rating must be a number between 1 and 10."),
    review: z.string().min(10, "Review must be at least 10 characters."),
})

const SelectedMovieDisplay = ({ control }: { control: Control<z.infer<typeof formSchema>> }) => {
    const title = useWatch({
        control,
        name: "title",
    });
    const mediaType = useWatch({
        control,
        name: "media_type",
    });
    const releaseDate = useWatch({
        control,
        name: "release_date",
    });
    const posterPath = useWatch({
        control,
        name: "poster_path",
    });

    if (!title) return null;

    return (
        <MovieItem item={{
            title: title,
            media_type: mediaType,
            release_date: releaseDate,
            poster_path: posterPath,
        }} />
    );
};

export function RecForm({ onSuccess }: { onSuccess: () => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            tmdbId: "",
            title: "",
            media_type: "movie",
            poster_path: "",
            release_date: "",
            vote_average: 0,
            rating: "",
            review: "",
        }
    });

    const handleSelectMovie = (movie: SearchResult) => {
        form.setValue("tmdbId", movie.id.toString());
        form.setValue("title", movie.media_type === 'movie' ? movie.title : movie.name, { shouldValidate: true });
        form.setValue("media_type", movie.media_type, { shouldValidate: true });
        form.setValue("poster_path", movie.poster_path || "", { shouldValidate: true });
        form.setValue("release_date", movie.media_type === 'movie' ? movie.release_date : movie.first_air_date || "", { shouldValidate: true });
        form.setValue("vote_average", movie.vote_average, { shouldValidate: true });
    }

    const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
        const payload: IRecomendationReq = {
            tmdbId: data.tmdbId,
            title: data.title,
            mediaType: data.media_type,
            posterPath: data.poster_path,
            releaseDate: data.release_date,
            voteAverage: data.vote_average,
            rating: data.rating,
            review: data.review,
            userId: "",
            userName: "",
            userEmail: "",
            userImage: "",
        }

        try {
            const newRec = await createRecommendation(payload);
            if (newRec) {
                form.reset();
                toast.success("Recommendation added successfully.");
                onSuccess();
            } else {
                toast.error("Failed to add recommendation. Please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    }
    return (
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <FieldGroup>
                {/* Movie Search */}
                <Field>
                    <FieldLabel>
                        Movie / TV Title
                    </FieldLabel>
                    <SearchBar onSelectMovie={handleSelectMovie} />
                    <SelectedMovieDisplay control={form.control} />
                    {
                        form.formState.errors.title && <FieldError errors={[form.formState.errors.title]} />
                    }
                </Field>

                {/* Rating */}
                <Field className="flex flex-col gap-2">
                    <FieldLabel>
                        Rating
                    </FieldLabel>
                    <Input
                        id="rating"
                        aria-invalid={form.formState.errors.rating ? true : false}
                        type="number"
                        min={1}
                        max={10}
                        step={0.5}
                        {...form.register("rating")}
                    />
                    {
                        <p className="text-xs text-zinc-500">Enter a rating between 1 and 10.</p>
                    }
                    {
                        form.formState.errors.rating && <FieldError errors={[form.formState.errors.rating]} />
                    }
                </Field>

                {/* Review */}
                <Field className="flex flex-col gap-2">
                    <FieldLabel>
                        Review
                    </FieldLabel>
                    <Textarea
                        id="review"
                        aria-invalid={form.formState.errors.review ? true : false}
                        {...form.register("review")}
                        placeholder="Why you recommend this movie?"
                        className="min-h-[80px] max-h-[80px] resize-none"
                    />
                    {
                        <p className="text-xs text-zinc-500">Enter a review of at least 10 characters.</p>
                    }
                    {
                        form.formState.errors.review && <FieldError errors={[form.formState.errors.review]} />
                    }
                </Field>
                <Button type="submit" disabled={!form.formState.isValid}>Submit</Button>
            </FieldGroup>

        </form>
    )
}