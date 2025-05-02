export const linkSchema = {
  body: {
    type: 'object',
    required: ['originalUrl', 'shortUrl'],
    properties: {
      originalUrl: { type: 'string', format: 'uri' },
      shortUrl: { type: 'string', pattern: '^[a-zA-Z0-9-_]+$' },
    },
  },
};
