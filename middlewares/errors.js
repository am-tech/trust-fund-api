module.exports = () => async (context, next) => {
  try {
    await next();
  } catch (e) {
    context.status = e.status || 500;

    let body = {
      message: e.message,
      code: e.code,
    };

    if (context.status === 400) {
      body = {
        message: 'Validation Failed',
        code: 'VALIDATION_FAILED',
        errors: context.validationErrors || [],
      };
    }

    if (context.status >= 500 && process.env.NODE_ENV !== 'production') {
      body.stack = e.stack;
    }

    context.body = body;
  }
};
