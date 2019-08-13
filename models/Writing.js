import { model, Schema } from 'mongoose'

const schema = new Schema({
  topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  slug: String,
  name: String,
  data: {
    posterURL: String,
  },
})

export const Writing = model('Writing', schema)
