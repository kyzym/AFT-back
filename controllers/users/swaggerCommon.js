import _ from 'lodash';
import { AddressSchema, objectId } from '#controllers/swagger.common.js';
import { accountStatus, roles } from '#constants/index.js';
import { OrderItemSchema } from '#controllers/orders/swagger.common.js';
import { ChefSchema } from '#controllers/chefs/swaggerChefsComponents.js';
import { DishSchema } from '#controllers/dishes/swaggerDishesComponents.js';

export const RoleSchema = {
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

export const UserSchema = {
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

export const RegisterUserResponse = createResponseSchema({
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
  token: {
    type: 'string',
    description: 'JWT token for authentication',
  },
});

export const LoginUserResponse = createResponseSchema({
  user: {
    type: 'object',
    properties: _.omit(UserSchema.properties, ['password', 'updatedAt']),
  },
  token: {
    type: 'string',
    description: 'JWT token for authentication',
  },
});

export const GetAllUsersResponse = createResponseSchema({
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

export const GetOneUserResponse = createResponseSchema({
  user: {
    type: 'object',
    properties: _.omit(UserSchema.properties, ['password', 'updatedAt']),
  },
});

export const GetFavoriteChefsResponse = createResponseSchema({
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

export const GetFavoriteDishesResponse = createResponseSchema({
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
