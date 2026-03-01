import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { RecForm } from "./rec-form";
import { IRecomendationRes } from "@/types/Recommendation";
export function EditRecDialog({ movie, open, onOpenChange }: { movie: IRecomendationRes, open: boolean, onOpenChange: (open: boolean) => void }) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Recommendation</DialogTitle>
                    <DialogDescription>
                        {`Update your recommendation.`}
                    </DialogDescription>
                </DialogHeader>
                <RecForm movie={movie} action='edit' onSuccess={() => { onOpenChange(false) }} />
            </DialogContent>
        </Dialog>
    )
}