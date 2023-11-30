import { ctrlWrapper } from '../../../middlewares/index.js';

const controller = async (req, res) => {
  const { data, signature } = req.body;

  console.log('Data: ', data, ' Signature: ', signature);

  return res.status(200).send({ success: true, data: 'Payment success' });
};

export const callbackPayment = ctrlWrapper(controller);
