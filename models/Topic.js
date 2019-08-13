import { model, Schema } from 'mongoose'

const schema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  slug: String,
  name: String,
})

export const Topic = model('Topic', schema)
