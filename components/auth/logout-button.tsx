import { Button } from "../ui/button"
import { signOut } from "@/auth"

export function LogoutButton({ ...props }) {
    return (
        <Button variant="outline" {...props} onClick={async () => {
            "use server"
            await signOut()
        }
        }>
            Logout
        </Button>
    )
}