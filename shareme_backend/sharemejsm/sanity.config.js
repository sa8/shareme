import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'shareme_jsm',

  projectId: '3lzf2ihj',
  dataset: 'shareme_ds',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
