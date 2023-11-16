// import { ctrlWrapper } from "../../../helpers/ctrlWrapper.js";
import mongoose from 'mongoose';
import { Review } from '../../../models/review.js';

const ObjectId = mongoose.Types.ObjectId;

export const getReviewsByChefId = (app) => {
  app.get(
    '/api/reviews/by-chef/:chefId',

    async (req, res) => {
      const { chefId } = req.params;

      try {
        const reviews = await Review.aggregate([
          {
            $lookup: {
              from: 'dishes',
              localField: 'dish',
              foreignField: '_id',
              as: 'dish',
            },
          },

          {
            $unwind: '$dish',
          },
          {
            $match: {
              'dish.chef': new ObjectId(chefId),
            },
          },
          // Можна додати пагінацію
          // {
          //   $skip: 0,
          // },
          // {
          //   $limit: 2,
          // },
          // {
          //   $project: {
          //     rating: 1, // включити поле "rating"
          //     review: 1, // включити поле "review"
          //     "dish.name": 1, // включити поле "name" з вкладеного об'єкта "dish"
          //     "dish.chef": 1, // включити поле "name" з вкладеного об'єкта "dish"
          //   },
          // },
        ]).exec();

        res.status(200).json({ data: reviews });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
};

// import { ctrlWrapper } from "../../../helpers/ctrlWrapper.js";
// import mongoose from "mongoose";
// import { Review } from "../../../models/review.js";
// // import { Dish } from "../../../models/dish.js"; // Додаємо імпорт моделі Dish

// const ObjectId = mongoose.Types.ObjectId;

// export const getReviewsByChefId = (app) => {
//   app.get("/api/reviews/by-chef/:chefId", async (req, res) => {
//     const { chefId } = req.params;
//     console.log("chefId:", chefId);

//     try {
//       const reviews = await Review.find({})
//         .populate({
//           path: "dish",
//           populate: { path: "chef" },
//         })
//         .find({ "dish.chef._id": new ObjectId(chefId) })
//         .exec();

//       res.status(200).json({ data: reviews });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });
// };
