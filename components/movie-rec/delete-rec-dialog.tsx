import { IRecomendationRes } from "@/types/Recommendation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { deleteRecommendation } from "@/actions/recomendation.action";
import { toast } from "sonner";

export function DeleteRecDialog({ movie, open, onOpenChange }: { movie: IRecomendationRes, open: boolean, onOpenChange: (open: boolean) => void }) {

    const handleDeleteRec = async () => {
        try {
            const deleteRec = await deleteRecommendation(movie.id);
            if (deleteRec) {
                toast.success("Recommendation deleted successfully.");
                onOpenChange(false);
            } else {
                toast.error("Failed to delete recommendation. Please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete "{movie.title}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your recommendation.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onOpenChange(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteRec()}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}