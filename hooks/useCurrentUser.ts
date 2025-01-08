import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

interface ExtendedUser extends Partial<User> {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

interface ExtendedSession {
  user?: ExtendedUser;
  expires: string;
}

export const useCurrentUser = () => {
  const { data: session, status } = useSession() as { 
    data: ExtendedSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  
  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
};