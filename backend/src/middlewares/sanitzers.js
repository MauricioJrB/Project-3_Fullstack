// eslint-disable-next-line import/no-extraneous-dependencies
import { body } from 'express-validator';

const validate = method => {
  switch (method) {
    case 'createUser': {
      return [
        body('email')
          .exists()
          .withMessage('Email is required')
          .isEmail()
          .withMessage('Invalid email')
          .normalizeEmail(),

        body('password')
          .exists().withMessage('Password is required')
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters long'),
      ];
    }
    case 'createAnime': {
      return [
        body('character')
          .exists().withMessage('Character is required')
          .isLength({ min: 3 })
          .withMessage('Enter more than 3 characters on Character'),

        body('anime')
          .exists().withMessage('Anime is required')
          .isString()
          .isLength({ min: 5 })
          .withMessage('Enter more than 3 characters on Anime'),

        body('quote')
          .exists().withMessage('Quote is required')
          .isString()
          .isLength({ min: 5 })
          .withMessage('Enter more than 5 characters on Quote'),

        body('owner')
          .exists().withMessage('User ID is required'),
      ];
    }
    case 'updateAnime': {
      return [
        body('character')
          .exists().withMessage('Character is required')
          .isLength({ min: 3 })
          .withMessage('Enter more than 3 characters on Character'),

        body('anime')
          .exists().withMessage('Anime is required')
          .isString()
          .isLength({ min: 5 })
          .withMessage('Enter more than 3 characters on Anime'),

        body('quote')
          .exists().withMessage('Quote is required')
          .isString()
          .isLength({ min: 5 })
          .withMessage('Enter more than 5 characters on Quote'),
      ];
    }
    default: {
      return [];
    }
  }
};

export default validate;
