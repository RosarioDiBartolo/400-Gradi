import { defineField, defineType } from 'sanity';

export const i18nText = defineType({
  name: 'i18nText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'it',
      title: 'Italian',
      type: 'text',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
    }),
  ],
});
