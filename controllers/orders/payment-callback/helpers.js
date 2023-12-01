import LiqPay from '#libs/Liqpay.js';

const { LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY } = process.env;

export const isValidResponseSignature = (data, signature) => {
  const liqpay = new LiqPay(LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY);

  const serverSignature = liqpay.str_to_sign(
    LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY
  );

  return serverSignature === signature;
};
