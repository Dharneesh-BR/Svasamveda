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
        name: 'author',
        type: 'reference',
        title: 'Author',
        to: [{type: 'author'}],
        validation: (Rule: Rule) => {
          try {
            return Rule.required();
          } catch (error) {
            console.error('Validation error for author field:', error);
            return Rule;
          }
        }
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
  