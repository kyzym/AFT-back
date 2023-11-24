import Chef from '../../../models/chef/Chef.model.js';

export const createChef = async (req, res) => {
  const userId = '65520e1b49c89850ff1256ea';

  // const newChef = new Chef({ ...req.body, userId: req.user.id });
  const newChefData = {
    ...req.body,
    userId: userId,
  };

  const newChef = new Chef(newChefData);
  await newChef.save();

  res.status(201).json({ message: 'Chef created successfully' });
};
