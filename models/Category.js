import { model, Schema } from 'mongoose'

const schema = new Schema({
  slug: String,
  name: String,
})

export const Category = model('Category', schema)
