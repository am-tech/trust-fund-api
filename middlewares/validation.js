module.exports.validate = (schema, options = {}) => async (context, next) => {
  const keys = Object.keys(schema);
  const validatorOptions = Object.assign({}, {
    abortEarly: false,
    allowUnknown: true,
  }, options);

  const validationErrors = keys
    .map((key) => {
      const source = key === 'params' ? context : context.request;

      return schema[key].validate(source[key], validatorOptions);
    })
    .filter((validation) => validation.error)
    .reduce((errors, validation) => {
      return errors.concat(validation.error.details);
    }, []);

  if (validationErrors.length) {
    context.validationErrors = validationErrors;

    context.throw('Validation Failed', 400);
  }

  await next();
};
