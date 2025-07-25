import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schema } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'svasam',

  projectId: 'n5smwbzi',
  dataset: 'production1',

  plugins: [structureTool(), visionTool()],

  schema: schema,
})
