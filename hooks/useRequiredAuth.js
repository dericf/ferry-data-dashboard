// Hook (use-require-auth.js)
import { useEffect } from "react";
import { useAuth } from "./use-auth.js";
import { useRouter } from "./use-router.js";

export function useRequireAuth(redirectUrl = '/signup'){
  const auth = useAuth();
  const router = useRouter();
  
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth.user === false){
      router.push(redirectUrl);
    }
  }, [auth, router]);
    
  return auth;
}