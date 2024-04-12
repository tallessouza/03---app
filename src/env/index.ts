import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev','test','prod']).default('prod'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error('INVEV', _env.error.format())
    throw new Error('INVEV')
}

export const env = _env.data