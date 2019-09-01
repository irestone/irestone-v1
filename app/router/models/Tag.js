import { model, Schema } from 'mongoose'

const schema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: String,
})

export const Tag = model('Tag', schema)
