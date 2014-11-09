'use strict';

var leb = require('leb');

/**
 * Provide operations for serializing/deserializing integer data into
 * variable-length 64-bit LEB128 integer encoding [1].
 *
 * References:
 * [1] https://en.wikipedia.org/wiki/LEB128
 *
**/
var LEB128 = {

  /**
   * Encode an arbitrarily large positive integer value using a small
   * number of bytes. This function returns a Buffer containing the
   * byte values of the 64-bit LEB128-encoded integer.
  **/
	encode: function (value) {

    if (value < 0) {
      throw new Error('Negative values are not supported');
    }

    return leb.encodeUInt64(value);

	},

  /**
   * Decode a data Buffer containing a 64-bit LEB128-encoded integer.
  **/
	decode: function (data, offset) {

    if (!Buffer.isBuffer(data)) {
      throw new Error('Data to decode must be a Buffer object');
    }

    return leb.decodeUInt64(data, offset ? offset : 0).value;

	},

  /**
   * Decode a data Buffer containing a 64-bit LEB128-encoded integer
   * and return all metadata about the operation
   *
   * The metadata contains the following fields:
   *   value: The value of the extracted LEB128-encoded integer
   *   nextIndex: The next unseen/unused byte in the input buffer
   *   lossy: Whether or not the extraction involved loss of precision
   *
   * Example return value: { value: 1, nextIndex: 6, lossy: false }
   **/
  decodeWithMetadata: function (data, offset) {
    
    if (!Buffer.isBuffer(data)) {
      throw new Error('Data to decode must be a Buffer object');
    }
    return leb.decodeUInt64(data, offset ? offset : 0);
  }

};


// Public API for this object
module.exports = LEB128;