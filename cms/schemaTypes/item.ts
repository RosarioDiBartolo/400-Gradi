import { defineField, defineType } from 'sanity';

export const variant = defineType({
  name: 'variant',
  title: 'Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'i18nString',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isDefault',
      title: 'Is Default',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      titleIt: 'label.it',
      titleEn: 'label.en',
      price: 'price',
    },
    prepare({ titleIt, titleEn, price }) {
      const title = titleIt || titleEn || 'Unnamed variant';
      const subtitle = typeof price === 'number' ? `€${price}` : undefined;
      return { title, subtitle };
    },
  },
});

export const item = defineType({
  name: 'item',
  title: 'Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'i18nString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'i18nText',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [{ type: 'variant' }],
    }),
    defineField({
      name: 'allergens',
      title: 'Allergens',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isAvailable',
      title: 'Is Available',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      titleIt: 'name.it',
      titleEn: 'name.en',
      categoryTitle: 'category.title.it',
    },
    prepare({ titleIt, titleEn, categoryTitle }) {
      const title = titleIt || titleEn || 'Untitled item';
      const subtitle = categoryTitle || 'Uncategorized';
      return { title, subtitle };
    },
  },
});
