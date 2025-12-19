// ./schemas/index.ts
import { type SchemaTypeDefinition } from 'sanity'

import program from './program'
import blogPost from './blogPost'
import author from './author'
import session from './session'
import store from './store'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, blogPost, author, session, store],
}
