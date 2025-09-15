import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { envConfigs } from "@/config";

export function db() {
  let databaseUrl = envConfigs.database_url;

  // Detect if running in Cloudflare Workers environment first
  const isCloudflareWorker =
    typeof globalThis !== "undefined" &&
    ("Cloudflare" in globalThis ||
      typeof globalThis.process === "undefined" ||
      globalThis.process?.versions?.node === undefined);

  // Only try to get Cloudflare context if we're in a Cloudflare environment
  let env: any = {};
  let isHyperdrive = false;

  if (isCloudflareWorker) {
    try {
      const context = getCloudflareContext();
      env = context.env || {};
      // Detect if set Hyperdrive
      isHyperdrive = env && "HYPERDRIVE" in env;
    } catch (error) {
      // If getCloudflareContext fails even in Cloudflare environment, log and continue
      console.log("Failed to get Cloudflare context:", error);
      env = {};
      isHyperdrive = false;
    }
  }

  console.log("is cloudflare worker:", isCloudflareWorker);
  console.log("is hyperdrive:", isHyperdrive);

  if (isCloudflareWorker && isHyperdrive) {
    const hyperdrive = env.HYPERDRIVE;
    databaseUrl = hyperdrive.connectionString;
    console.log("using Hyperdrive connection");
  }

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  // In Cloudflare Workers, create new connection each time
  if (isCloudflareWorker) {
    console.log("in Cloudflare Workers environment");
    // Workers environment uses minimal configuration
    const client = postgres(databaseUrl, {
      prepare: false,
      max: 1, // Limit to 1 connection in Workers
      idle_timeout: 10, // Shorter timeout for Workers
      connect_timeout: 5,
    });

    return drizzle(client);
  }

  // Database instance for Node.js environment
  let dbInstance: ReturnType<typeof drizzle> | null = null;

  // Node.js environment with connection pool configuration
  const client = postgres(databaseUrl, {
    prepare: false,
    max: 10, // Maximum connections in pool
    idle_timeout: 30, // Idle connection timeout (seconds)
    connect_timeout: 10, // Connection timeout (seconds)
  });
  dbInstance = drizzle({ client });

  return dbInstance;
}
