import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export function UserProfile() {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="flex items-center space-x-2">
            <Avatar>
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
        </div>
    );
}