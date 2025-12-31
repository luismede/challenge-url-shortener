import { serve } from "bun";
import app from "./app";
import { connectDatabase } from "./config/database";

async function bootstrap() {
  await connectDatabase();

  serve({
    port: 3000,
    fetch: app.fetch,
  });

  console.log(`Server running on port 3000`);
}

bootstrap();
