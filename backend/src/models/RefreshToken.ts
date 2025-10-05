import { Schema, model, type InferSchemaType } from 'mongoose';

const RefreshTokenSchema = new Schema({
  userId: { type: String, index: true },
  jti:    { type: String, unique: true, index: true },
  tokenHash: { type: String, required: true }, // hash of the refresh jwt (or just jti)
  userAgent: { type: String },
  ip:        { type: String },
  expiresAt: { type: Date },
  revokedAt: { type: Date, default: null }
}, { timestamps: true });

export type RefreshTokenDoc = InferSchemaType<typeof RefreshTokenSchema>;
export const RefreshToken = model('refresh_tokens', RefreshTokenSchema);
