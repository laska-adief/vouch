import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const AuthAvatar = ({ image, name }: { image: string, name: string }) => {
    return (
        <>
            <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="font-medium">{name}</p>
        </>
    )
}