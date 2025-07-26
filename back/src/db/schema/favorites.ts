import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const favorites = pgTable("favorites", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull(),
  jobId: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})
