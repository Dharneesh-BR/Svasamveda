// ./schemas/index.ts
import { type SchemaTypeDefinition } from 'sanity'

import program from './program'
import blogPost from './blogPost'
import author from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, blogPost, author],
}
