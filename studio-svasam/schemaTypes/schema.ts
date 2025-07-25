import { type SchemaTypeDefinition } from 'sanity'

import program from './program'
import storeItem from './storeItem'
import blogPost from './blogPost'
import author from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, storeItem, blogPost, author],
}
