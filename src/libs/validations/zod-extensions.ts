import { z } from 'zod'

declare module 'zod' {
  interface ZodString {
    emptyToNull(): z.ZodPipe<z.ZodString, z.ZodTransform<string, string | null>>
  }
}

z.ZodString.prototype.emptyToNull = function (this: z.ZodString) {
  return this.transform((val: string) => (val.trim() === '' ? null : val))
}
