import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // We are forcing the absolute path here
    url: "file:/root/refalo-v2/prisma/dev.db",
  },
});
