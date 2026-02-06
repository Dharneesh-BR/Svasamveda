import { type Rule, type SchemaTypeDefinition } from 'sanity'

export default {
  name: 'author',
  type: 'document',
  title: 'Instructors',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'image',
      type: 'image',
      title: 'Profile Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Biography',
      rows: 5,
      description: 'Detailed biography of the instructor'
    }
  ]
} as SchemaTypeDefinition

// Add preview for better studio experience
export const authorPreview = {
  select: {
    title: 'name',
    subtitle: 'bio',
    media: 'image'
  }
}
