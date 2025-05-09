import { z } from 'zod'

import { registerSchema } from '@libs/components/authentication/register/register.validation'

export type RegisterFormData = z.infer<typeof registerSchema>
