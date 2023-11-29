import User from '#models/user/userModel.js';

export const updateCartAndRespond = async (
  userId,
  newCart,
  res,
  successMessage = 'Cart successfully updated'
) => {
  await User.findByIdAndUpdate({ _id: userId }, { $set: { cart: newCart } });

  return res.status(200).json({
    success: true,
    message: successMessage,
  });
};
