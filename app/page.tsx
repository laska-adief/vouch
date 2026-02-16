import { AddRecDialog } from "@/components/movie-rec/add-rec-dialog";
import { RecList } from "@/components/movie-rec/rec-list";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-end">
        <AddRecDialog />
      </div>
      <RecList />
    </div>
  );
}
