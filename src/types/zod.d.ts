import type { ZodType, ZodObject, ZodRawShape, ZodIntersection, ZodEffects } from 'zod'

export type ZodInferSchema<T> = T extends (...args: any[]) => ZodType<infer U> ? U : never
export type ZodOutputSchema<T extends z.ZodTypeAny> = z.output<T>

// Composite schema type to support Zod objects, intersections, and effects (refine, transform, etc.)
export type SchemaType = ZodObject<ZodRawShape> | ZodIntersection<any, any> | ZodEffects<any>
