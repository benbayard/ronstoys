import { ValidationError } from 'class-validator';

export interface ToyNetworkError extends Error {
  response: {
    body: {
      errors: ValidationError[];
    };
  };
}
