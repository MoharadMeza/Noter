export type SimpleTranslator = (key: string) => string
export type RichTextTranslator = (key: string, params?: Record<string, string>) => string
