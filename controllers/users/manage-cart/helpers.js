import User from '#models/user/userModel.js';

export const updateCartAndRespond = async (
  userId,
  newCart,
  res,
  successMessage = 'Cart successfully updated'
) => {
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { cart: newCart } },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: successMessage,
    cart: user.cart,
  });
};
