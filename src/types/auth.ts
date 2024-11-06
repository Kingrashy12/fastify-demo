import { Static, Type } from '@sinclair/typebox';
import { RouteShorthandOptions } from 'fastify';

export const signUpSchema = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String({
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  }),
  password: Type.String({ minLength: 6 }),
});

export const signInSchema = Type.Object({
  email: Type.String({
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  }),
  password: Type.String({ minLength: 6 }),
});

export const signUpOpts: RouteShorthandOptions = {
  schema: {
    body: signUpSchema,
    response: {
      201: {
        type: 'object',
        properties: {
          token: Type.String(),
        },
      },
    },
  },
};

export const signInOpts: RouteShorthandOptions = {
  schema: {
    body: signInSchema,
  },
};

export type SignUpBody = Static<typeof signUpSchema>;
export type SignInBody = Static<typeof signInSchema>;
