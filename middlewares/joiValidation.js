export const joiValidation = (scheme) => {
  return (req, _res, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    next();
  };
};
