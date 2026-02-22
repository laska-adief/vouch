import { AddRecDialog } from "@/components/movie-rec/add-rec-dialog";
import { RecList } from "@/components/movie-rec/rec-list";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="container mx-auto py-8 px-4">
      {
        session && (
          <div className="flex justify-end">
            <AddRecDialog />
          </div>
        )
      }
      <RecList />
    </div>
  );
}
