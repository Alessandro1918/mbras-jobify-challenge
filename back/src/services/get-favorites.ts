import { eq } from 'drizzle-orm'
import { db } from '../db/connection'
import { schema } from '../db/schema/index'

export async function getFavorites(userId: string) {
  const results = await db
    .select({
      jobId: schema.favorites.jobId
    })
    .from(schema.favorites)
    .where(eq(schema.favorites.userId, userId))

  const jobIds = results.map(favorite => {return(favorite.jobId)})

  return jobIds // [ '123456', '78901234' ]
}
