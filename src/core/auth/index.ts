import { betterAuth } from "better-auth";
import { getAuthOptions } from "./config";

// global auth instance
let authInstance: Awaited<ReturnType<typeof getAuth>> | null = null;

// Dynamic auth - with full database configuration
// Always use this in API routes that need database access
export async function getAuth(): Promise<
  Awaited<ReturnType<typeof betterAuth>>
> {
  if (!authInstance) {
    authInstance = betterAuth(await getAuthOptions());
  }
  return authInstance;
}
