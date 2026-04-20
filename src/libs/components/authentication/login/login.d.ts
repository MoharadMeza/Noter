import { z } from 'zod'
import { loginSchema } from '@libs/components/authentication/login/login.validation'

export type LoginFormData = z.infer<typeof loginSchema>
