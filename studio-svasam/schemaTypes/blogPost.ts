import { type Rule, type SchemaTypeDefinition } from 'sanity'

const blogPost: SchemaTypeDefinition = {
    name: 'blogPost',
    type: 'document',
    title: 'Blog Post',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'publishedAt',
        type: 'datetime',
        title: 'Published at',
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'mainImage',
        type: 'image',
        title: 'Main image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'body',
        type: 'array',
        title: 'Body',
        of: [
          {type: 'block'},
          {type: 'image'}
        ]
      }
    ]
}

export default blogPost
  