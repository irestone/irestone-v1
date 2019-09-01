import { model, Schema } from 'mongoose'

const schema = new Schema({
  slug: String,
  title: String,
  content: String,
})

export const Page = model('Page', schema)
