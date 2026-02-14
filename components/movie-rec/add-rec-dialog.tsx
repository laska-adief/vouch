"use client"

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { RecForm } from "./rec-form";
import { useState } from "react";

export function AddRecDialog() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline'>
                    <PlusIcon />
                    Add Recommendation
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Recommendation</DialogTitle>
                    <DialogDescription>
                        Share your favorite movie or tv show with the world. Click submit when you're done.
                    </DialogDescription>
                </DialogHeader>
                <RecForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}