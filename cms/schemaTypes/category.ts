import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'i18nString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => doc?.title?.it ?? doc?.title?.en,
        maxLength: 96,
      },
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Food', value: 'food' },
          { title: 'Drink', value: 'drink' },
        ],
      },
      initialValue: 'food',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      titleIt: 'title.it',
      titleEn: 'title.en',
      kind: 'kind',
    },
    prepare({ titleIt, titleEn, kind }) {
      const title = titleIt || titleEn || 'Untitled category';
      const subtitle = kind ? kind.toUpperCase() : undefined;
      return { title, subtitle };
    },
  },
});
