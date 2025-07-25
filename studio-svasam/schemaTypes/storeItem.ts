import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'storeItem',
  type: 'document',
  title: 'Store Item',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'Used for the product URL',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Money Store', value: 'money' },
          { title: 'Rudrakshas', value: 'rudrakshas' },
          { title: 'Bracelets', value: 'bracelets' },
          { title: 'Crystals', value: 'crystals' },
          { title: 'Yoga Accessories', value: 'yoga' },
          { title: 'Books & Media', value: 'books' },
          { title: 'Incense & Oils', value: 'aroma' },
          { title: 'Jewelry', value: 'jewelry' },
          { title: 'Home Decor', value: 'decor' },
          { title: 'Gift Cards', value: 'gift-cards' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      description: 'Brief description shown in product listings (max 160 characters)',
      validation: (Rule) => Rule.required().max(160)
    }),
    defineField({
      name: 'description',
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
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price (INR)',
      description: 'Base price of the item in Indian Rupees',
      validation: (Rule) => Rule.required().min(0).precision(2)
    }),
    defineField({
      name: 'compareAtPrice',
      type: 'number',
      title: 'Compare At Price (INR)',
      description: 'Original price before discount (optional)',
      validation: (Rule) => Rule.min(0).precision(2)
    }),
    defineField({
      name: 'stock',
      type: 'number',
      title: 'Stock Quantity',
      description: 'Number of items available in inventory',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0).integer()
    })
  ]
})