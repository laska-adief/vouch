import { signIn } from "@/auth"
import { Button } from "../ui/button"
import GoogleIcon from "../../public/google.svg"
import Image from "next/image"

export function LoginButton() {
    return (
        <Button variant="outline" onClick={async () => {
            "use server"
            await signIn("google")
        }
        }>
            <Image src={GoogleIcon} alt="Google" width={20} height={20} />
            Login</Button>
    )
}