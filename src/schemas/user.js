/**
 * @module userSchema
 */
import languages from 'country-language';
import { indexOf } from 'lodash';
import { Schema } from 'mongoose';

import { REQUIRED_PSEUDO, REQUIRED_EMAIL,
  REQUIRED_PASSWORD, REQUIRED_ISVALID } from '../lib/errors';

/**
 * This is the User schema.
 * It stores only connexion informations.
 * @type { Object }
 */
const userSchema = new Schema({
  pseudo: {
    type: String,
    required: [true, REQUIRED_PSEUDO],
    unique: true
  },
  email: {
    type: String,
    required: [true, REQUIRED_EMAIL],
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: [true, REQUIRED_PASSWORD]
  },
  resetPasswordToken: {
    type: String,
    required: false
  },
  // Use country-language to find the countries codes
  language: {
    type: String,
    validate: {
      validator: value => (indexOf(languages.getLanguageCodes(1), value) > -1),
    }
  },
  lastConnection: {
    type: Date,
    required: false
  },
  isValid: {
    type: Boolean,
    required: [true, REQUIRED_ISVALID]
  },
}, {
  timestamps: true
});

export default userSchema;
