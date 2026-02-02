import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'store',
  title: 'Store',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Bracelets', value: 'bracelets' },
          { title: 'Rudraksha', value: 'rudraksha' },
          { title: 'Murti', value: 'murti' },
          { title: 'Anklet', value: 'anklet' },
          { title: 'Frames', value: 'frames' },
          { title: 'Karungali', value: 'karungali' },
          { title: 'Zodiac', value: 'zodiac' },
          { title: 'Pyrite', value: 'pyrite' },
          { title: 'Gemstones', value: 'gemstones' },
          { title: 'Pendant', value: 'pendant' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'discountedPrice',
      title: 'Discounted Price (₹)',
      type: 'number',
      description: 'Optional: Enter discounted price if the product is on sale',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0',
    },
  },
});
