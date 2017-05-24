import { describe } from 'mocha';
import { assert } from 'chai';
import mongoose from 'mongoose';
import { set } from 'lodash';

import { userSchema } from '../src/index';
import { checkRequiredField, checkNotRequiredField, checkIsDate } from './tests_toolsbox';

const UserModel = mongoose.model('User', userSchema);

describe('# User model', () => {
  describe('## pseudo (String)', () => {
    checkRequiredField(new UserModel(), 'pseudo', 'toto');
  });

  describe('## email (String)', () => {
    checkRequiredField(new UserModel(), 'email', 'toto@toto.fr');
  });

  describe('## password (String)', () => {
    checkRequiredField(new UserModel(), 'password', 'P@w0rd');
  });

  describe('## resetPasswordToken (String)', () => {
    checkNotRequiredField(new UserModel(), 'resetPasswordToken', 'token1234567890');
  });

  describe('## language (Code i18n-iso-countries)', () => {
    const user = new UserModel();
    it('Language should be a valid country code', () => {
      set(user, 'language', 'A');
      const err = user.validateSync();
      // 'A' is not a valid country code (only one letter), it should throw an error
      assert.property(err.errors, 'language');
    });

    it('Language should not throw an error with a valid countrycode', () => {
      set(user, 'language', 'en');
      const err = user.validateSync();
      // 'en' is a valid country code, it should not throw an error
      assert.notProperty(err.errors, 'language');
    });
    checkNotRequiredField(new UserModel(), 'language');
  });

  describe('## lastConnection (Date)', () => {
    checkIsDate(new UserModel(), 'lastConnection', new Date('2017-01-01'));
    checkNotRequiredField(new UserModel(), 'lastConnection');
  });

  describe('## isValid (Boolean)', () => {
    checkRequiredField(new UserModel(), 'isValid', true);
  });
});
