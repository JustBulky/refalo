import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  earlyAccess: true,
  migrations: {
    path: "prisma/migrations",
    url: process.env.DATABASE_URL!,
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
