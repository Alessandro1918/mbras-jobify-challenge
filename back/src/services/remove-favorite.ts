import { eq, and } from 'drizzle-orm'
import { db } from '../db/connection'
import { schema } from '../db/schema/index'

export async function removeFavorite(userId: string, jobId: string) {
  await db
    .delete(schema.favorites)
    .where(and(
      eq(schema.favorites.userId, userId),
      eq(schema.favorites.jobId, jobId)
    ))

  return 
}
