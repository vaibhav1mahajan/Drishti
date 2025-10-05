import { Schema, model, type InferSchemaType } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, index: true },
  name:  { type: String },
  avatarUrl: { type: String },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin','user'], default: 'user', index: true },
  mfaEnabled: { type: Boolean, default: false },
  mfaSecret:  { type: String, default: null },  // store encrypted if you wish
  refreshVersion: { type: Number, default: 0 }, // bump to revoke all sessions
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export type UserDoc = InferSchemaType<typeof UserSchema>;
export const User = model('users', UserSchema);
