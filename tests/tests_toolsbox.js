import { assert } from 'chai';
import { it } from 'mocha';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import { set } from 'lodash';

mongoose.Promise = Promise; // plugin bluebird promise in mongoose

/**
 * The model throws an error for an empty required field.
 * First, the field is empty.
 * Second, the field is not empty.
 * @param  String field : the field to check.
 * @param  String val : the value passed to the field.
 */
const checkRequiredField = (model, field, val) => {
  const obj = model;
  let err = obj.validateSync();

  it(`Empty ${field} should throw error: ${err.errors[field]}`, () => {
    if (obj[field] instanceof Array) assert.equal(obj[field].length, 0);
    else assert.equal(obj[field], undefined);

    assert.property(err.errors, field);
  });

  it(`Not empty ${field} should not throw error.`, () => {
    if (field.indexOf('.') !== -1) {
      const objs = field.split('.');
      obj[objs[0]][objs[1]] = val;
    } else {
      set(obj, field, val);
    }
    err = obj.validate()
      .then(() => assert.notProperty(err.errors, field))
      .catch(() => false);
  });
};

/**
 * The model doesn't throws error for an empty unrequired field.
 * @param  String field : the field to check.
 */
const checkNotRequiredField = (model, field) => {
  const err = model.validateSync();

  it(`Empty ${field} should not throw error`, () => {
    assert.equal(model[field], undefined);
    assert.notProperty(err.errors, field);
  });
};

/**
 * The date must be a valid Date object
 * @param  String field : the field to check.
 * @param  String val : a valid Date
 */
const checkIsDate = (model, field, val) => {
  const obj = model;

  it(`${field} should be a Date`, () => {
    set(obj, field, val);
    assert.instanceOf(obj[field], Date);
  });
};

export default { checkRequiredField, checkNotRequiredField, checkIsDate };
