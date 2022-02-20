import { IComentarioPersistence } from '../../dataschema/IComentarioPersistence';
import mongoose from 'mongoose';

const Comentario = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    texto: {
      type: String,
      required: [true, 'Please enter text'],
    },

    post: {
        type: String,
        required: [true, 'Please enter post'],
      },

    tags: {
      type: Array,
      default: [],
    },
    autorId: {
      type: String,
      required: [true, 'Please enter autorId'],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IComentarioPersistence & mongoose.Document>('Comentario', Comentario);
