import { Button } from "../ui/button"
import { signOut } from "@/auth"

export function LogoutButton() {
    return (
        <Button variant="outline" onClick={async () => {
            "use server"
            await signOut()
        }
        }>
            Logout
        </Button>
    )
}