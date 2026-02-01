import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  await migrate(drizzle(sql), {
    migrationsFolder: "./src/drizzle/migrations",
  });
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
