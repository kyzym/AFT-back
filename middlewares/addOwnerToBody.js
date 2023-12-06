export const addOwnerToBody = (req, _res, next) => {
  req.body.owner = req.roleIds.chef;
  next();
};
