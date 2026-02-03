import { defineField, defineType } from 'sanity';

export const i18nString = defineType({
  name: 'i18nString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'it',
      title: 'Italian',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
  ],
});
