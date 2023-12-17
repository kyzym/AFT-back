import _ from 'lodash';
import {
  AddressSchema,
  objectId,
  errorResponse,
  errorMessage,
  errorName,
} from '#controllers/swagger.common.js';
import { accountStatus, roles } from '#constants/index.js';
import { OrderItemSchema } from '#controllers/orders/swagger.common.js';
import { ChefSchema } from '#controllers/chefs/swaggerChefsComponents.js';
import { DishSchema } from '#controllers/dishes/swaggerDishesComponents.js';

const RoleSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      enum: Object.values(roles),
      description: 'The name of the role',
    },
    id: objectId,
  },
  description: 'Schema for a role',
};

const UserSchema = {
  type: 'object',
  properties: {
    id: objectId,
    firstName: {
      type: 'string',
      description: 'The first name of the user',
    },
    lastName: {
      type: 'string',
      description: 'The last name of the user',
    },
    password: {
      type: 'string',
      description: 'The hashed password of the user',
    },
    email: {
      type: 'string',
      description: 'The email address of the user',
    },
    avatar: {
      type: 'string',
      description: "URL or path to the user's avatar",
    },
    address: AddressSchema,
    phoneNumber: {
      type: 'string',
      description: 'The phone number of the user',
    },
    favoriteDishes: {
      type: 'array',
      items: objectId,
      description: "Array of IDs referencing the user's favorite dishes",
    },
    favoriteChefs: {
      type: 'array',
      items: objectId,
      description: "Array of IDs referencing the user's favorite chefs",
    },
    cart: {
      type: 'array',
      items: _.omit(OrderItemSchema.properties, ['id']),
      description: "Array of items in the user's cart",
    },
    roles: {
      type: 'array',
      items: RoleSchema,
      description: 'Array of user roles and their Ids',
      default: [{ name: 'user', id: objectId }],
    },
    accountStatus: {
      type: 'string',
      enum: [accountStatus.ACTIVE, accountStatus.BLOCKED],
      default: accountStatus.ACTIVE,
      description: 'The account status of the user',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Timestamp indicating when the user was created',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Timestamp indicating when the user was last updated',
    },
  },
  description: 'Schema for a user',
};

const createResponseSchema = (additionalProperties = {}) => ({
  type: 'object',
  properties: {
    success: { type: 'boolean', default: true },
    message: {
      type: 'string',
      description: 'Descriptive message indicating the result of the operation',
    },
    ...additionalProperties,
  },
});

const RegisterUserResponse = createResponseSchema({
  user: {
    type: 'object',
    properties: _.omit(UserSchema.properties, [
      'password',
      'updatedAt',
      'phoneNumber',
      'avatar',
      'address',
    ]),
  },
});

const LoginUserResponse = createResponseSchema({
  user: {
    type: 'object',
    properties: _.omit(UserSchema.properties, ['password', 'updatedAt']),
  },
});

const GetAllUsersResponse = createResponseSchema({
  users: {
    type: 'array',
    items: {
      type: 'object',
      properties: _.omit(UserSchema.properties, [
        'password',
        'updatedAt',
        'cart',
        'favoriteDishes',
        'favoriteChefs',
      ]),
    },
  },
});

const GetOneUserResponse = createResponseSchema({
  user: {
    type: 'object',
    properties: _.omit(UserSchema.properties, ['password', 'updatedAt']),
  },
});

const GetFavoriteChefsResponse = createResponseSchema({
  favoriteChefs: {
    items: {
      type: 'object',
      properties: {
        ..._.pick(ChefSchema.properties, [
          'id',
          'avatar',
          'address',
          'isAvailable',
        ]),
        firstName: { type: 'string' },
        lastName: { type: 'string' },
      },
    },
  },
});

const GetFavoriteDishesResponse = createResponseSchema({
  favoriteDishes: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        ..._.pick(DishSchema.properties, [
          'id',
          'owner',
          'name',
          'image',
          'description',
          'price',
          'category',
          'cuisine',
          'isAvailable',
        ]),
        owner: { type: 'string', format: 'objectId' },
      },
    },
  },
});

const GetUserCartResponse = createResponseSchema({
  cart: {
    type: 'object',
    properties: {
      chef: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'objectId' },
          avatar: { type: 'string' },
          name: { type: 'string' },
        },
        required: ['id', 'avatar', 'name'],
      },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            dish: {
              type: 'object',
              properties: {
                image: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number', default: 1 },
                cuisine: { type: 'string' },
                category: { type: 'string' },
                isAvailable: { type: 'boolean' },
                spiceLevel: { type: 'integer', default: 1 },
                id: { type: 'string', format: 'objectId' },
              },
              required: [
                'image',
                'description',
                'price',
                'cuisine',
                'category',
                'isAvailable',
                'spiceLevel',
                'id',
              ],
            },
            count: { type: 'integer', default: 1 },
          },
          required: ['dish', 'count'],
        },
      },
    },
    required: ['chef', 'items'],
  },
});

const UpdatedUserCartResponse = createResponseSchema({
  cart: {
    type: 'object',
    properties: {
      chefId: {
        type: 'string',
        format: 'objectId',
        example: '656261602012b055a16d2406',
      },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            dishId: {
              type: 'string',
              format: 'objectId',
              example: '655a201bb01417f2a7b217b2',
            },
            count: { type: 'integer', example: 5 },
          },
        },
      },
    },
  },
});

export const CartItemSchema = {
  type: 'object',
  properties: {
    item: {
      type: 'object',
      properties: {
        dishId: {
          type: 'string',
          format: 'objectId',
          example: '656658933c6bdf0d02f71488',
          description: 'ID of the dish',
        },
        count: {
          type: 'integer',
          default: 1,
          description: 'Number of items of the dish to be added to the cart',
        },
      },
      required: ['dishId', 'count'],
    },
  },
};

export const DefaultErrorResponse = {
  400: {
    ...errorResponse(
      errorMessage[400],
      'Format of this ID: 655fb29f17fd123 is not correct'
    ),
  },
  401: {
    ...errorResponse(errorName[401], errorMessage[401]),
  },
  403: {
    ...errorResponse(
      errorName[403],
      "You don't have permission to view/modify this account"
    ),
  },
  404: {
    ...errorResponse(
      errorName[404],
      'User with ID 656658933c6bdf0d02f71488 not found'
    ),
  },
  500: {
    ...errorResponse(errorName[500], errorMessage[500]),
  },
};

export const SwaggerResponses = {
  RegisterUserResponse,
  LoginUserResponse,
  GetOneUserResponse,
  GetAllUsersResponse,
  GetFavoriteDishesResponse,
  GetFavoriteChefsResponse,
  GetUserCartResponse,
  UpdatedUserCartResponse,
};

export const SwaggerSchemas = {
  RoleSchema,
  UserSchema,
  CartItemSchema,
};
