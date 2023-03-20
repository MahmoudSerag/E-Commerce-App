export const apiHeader = {
  name: 'x-authorization',
  description: 'JWT',
  required: true,
};

export const apiUnauthorizedResponse = {
  status: 401,
  description: 'User not loggedIn.',
  schema: {
    example: {
      success: false,
      statusCode: 401,
      message: 'Unauthorized.',
    },
  },
};

export const apiInvalidJWTResponse = {
  status: 401,
  description: 'JWT invalid token.',
  schema: {
    example: {
      success: false,
      statusCode: 401,
      message: 'Invalid token OR Invalid signature.',
    },
  },
};

export const apiNotFoundResponse = {
  status: 404,
  description: 'User not found.',
  schema: {
    example: {
      success: false,
      statusCode: 404,
      message: 'Not found.',
    },
  },
};

export const apiNotForbiddenResponse = {
  status: 403,
  description: 'User not allowed to see this content.',
  schema: {
    example: {
      success: false,
      statusCode: 403,
      message: 'Forbidden.',
    },
  },
};

export const apiInternalServerErrorResponse = {
  status: 500,
  description: 'Server error.',
  schema: {
    example: {
      success: false,
      statusCode: 500,
      message: 'Server error.',
    },
  },
};
