import { Rule } from 'sanity'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'program',
  type: 'document',
  title: 'Program',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Mind', value: 'mind' },
          { title: 'Body', value: 'body' },
          { title: 'Soul', value: 'soul' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      validation: (Rule: Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      description: 'A brief description shown in program listings',
      validation: (Rule: Rule) => Rule.required()
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Full Description',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true }
        },
        {
          type: 'code',
          options: {
            language: 'javascript',
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' }
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
          validation: (Rule: Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price (INR)',
      validation: (Rule: Rule) => Rule.required().min(0)
    }),
    defineField({
      name: 'duration',
      type: 'string',
      title: 'Duration',
      description: 'e.g., "8 weeks", "1 hour"',
      validation: (Rule: Rule) => Rule.required()
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured Program',
      description: 'Show this program in featured sections',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image'
    },
    prepare(selection) {
      const { title, category } = selection
      return {
        ...selection,
        subtitle: category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Program` : 'No category'
      }
    }
  }
})