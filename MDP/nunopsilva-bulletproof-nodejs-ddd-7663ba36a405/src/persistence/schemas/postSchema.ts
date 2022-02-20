import { IPostPersistence } from '../../dataschema/IPostPersistence';
import mongoose from 'mongoose';

const Post = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    texto: {
      type: String,
      required: [true, 'Please enter text']
    },

    comentarios: {
        type: Array,
        default: [],
      },

    tags: {
      type: Array,
      default: [],
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },
    autorId: {
      type: String,
      required: [true, 'Please enter autorId'],
    },
    likesUsers: {
      type: Array,
      default: [],
    },

    dislikesUsers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post', Post);
