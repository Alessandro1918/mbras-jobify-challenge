import { db } from '../db/connection'
import { schema } from '../db/schema/index'

export async function addFavorite(userId: string, jobId: string) {
  const result = await db
    .insert(schema.favorites)
    .values({
      userId,
      jobId,
    })
    .returning()  // postgres default bahavior returns the inserted lines count. This "returning" makes it return the inserted line

  const insertedFavorite = result[0]

  if (!insertedFavorite) {
    throw new Error("Failed to create new favorite.")
  }

  return insertedFavorite
}
