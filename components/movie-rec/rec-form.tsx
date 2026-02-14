
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import SearchBar from "./search-bar"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SearchResult } from "@/lib/tmdb"
import { Button } from "../ui/button"
import MovieItem from "./movie-item"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export function RecForm({ onSuccess }: { onSuccess: () => void }) {
    const formSchema = z.object({
        id: z.string(),
        title: z.string().min(1, "Title is required."),
        media_type: z.enum(["movie", "tv"], "Please select a type."),
        poster_path: z.string(),
        release_date: z.string(),
        rating: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 10, "Rating must be a number between 1 and 10."),
        review: z.string().min(10, "Review must be at least 10 characters."),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            title: "",
            media_type: "movie",
            rating: "",
            review: "",
        }
    });

    const handleSelectMovie = (movie: SearchResult) => {
        form.setValue("id", movie.id.toString());
        form.setValue("title", movie.media_type === 'movie' ? movie.title : movie.name);
        form.setValue("media_type", movie.media_type);
        form.setValue("poster_path", movie.poster_path || "");
        form.setValue("release_date", movie.media_type === 'movie' ? movie.release_date : movie.first_air_date || "");
    }

    const handleOnSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("submitted data", data);
        onSuccess();
    }
    return (
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <FieldGroup>
                {/* Movie Search */}
                <Field>
                    <FieldLabel>
                        Movie / TV Show Title
                    </FieldLabel>
                    <SearchBar onSelectMovie={handleSelectMovie} />
                    {
                        form.watch("title") &&
                        <MovieItem item={{
                            title: form.watch("title"),
                            media_type: form.watch("media_type"),
                            release_date: form.watch("release_date"),
                            poster_path: form.watch("poster_path"),
                        }} />
                    }
                    {
                        form.formState.errors.title && <FieldError errors={[form.formState.errors.title]} />
                    }
                </Field>

                {/* Rating */}
                <Field >
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
                        form.formState.errors.rating && <FieldError errors={[form.formState.errors.rating]} />
                    }
                </Field>

                {/* Review */}
                <Field >
                    <FieldLabel>
                        Review
                    </FieldLabel>
                    <Textarea
                        id="review"
                        aria-invalid={form.formState.errors.review ? true : false}
                        {...form.register("review")}
                        placeholder="Why you recommend this movie?"
                        className="min-h-[80px] resize-none"
                    />
                    {
                        form.formState.errors.review && <FieldError errors={[form.formState.errors.review]} />
                    }
                </Field>
                <Button type="submit" disabled={!form.formState.isValid}>Submit</Button>
            </FieldGroup>

        </form>
    )
}