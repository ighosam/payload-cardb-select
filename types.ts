import type { SelectField } from 'payload'

export interface PluginOptions {
    slug?:string
}

export type SelectFieldWithEndpoint = SelectField & {
  admin?: {
    custom?: {
      optionsEndpoint?: string
      [key: string]: unknown
    }
  }
}
