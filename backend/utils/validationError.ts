import mongoose from 'mongoose';

export function isMongooseValidationError(err: unknown): err is mongoose.Error.ValidationError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'name' in err &&
    (err as any).name === 'ValidationError'
  );
}

