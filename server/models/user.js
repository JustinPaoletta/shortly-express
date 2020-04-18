const utils = require('../lib/hashUtils');
const Model = require('./model');

/**
 * Users is a class with methods to interact with the users table, which
 * stores information (id, username, hashed password, salt) about users.
 * @constructor
 * @augments Model
 */
class Users extends Model {
  constructor() {
    super('users');
  }

  /**
   * Compares a password attempt with the previously stored password and salt.
   * @param {string} attempted - The attempted password.
   * @param {string} password - The hashed password from when the user signed up.
   * @param {string} salt - The salt generated when the user signed up.
   * @returns {boolean} A boolean indicating if the attempted password was correct.
   */
  compare(attempted, password, salt) {
    return utils.compareHash(attempted, password, salt);
  }

  get({username, password}) {
    // MODEL IS HOLDING THE MAIN METHODS AND WE CAN CALL THEM HERE PASSING IN THE VALUES WE WANT
    return super.get.call(this, {username});
    // vvvvv SUPER vvvvv
    // let parsedOptions = parseData(options);
    // let queryString = `SELECT * FROM ${this.tablename} WHERE ${parsedOptions.string.join(' AND ')} LIMIT 1`;
    // return executeQuery(queryString, parsedOptions.values).then(results => results[0]);
  }

  /**
   * Creates a new user record with the given username and password.
   * This method creates a salt and hashes the password before storing
   * the username, hashed password, and salt in the database.
   * @param {Object} user - The user object.
   * @param {string} user.username - The user's username.
   * @param {string} user.password - The plaintext password.
   * @returns {Promise<Object>} A promise that is fulfilled with the result of
   * the record creation or rejected with the error that occured.
   */
  create({ username, password }) {
    let salt = utils.createRandom32String();

    let newUser = {
      username,
      salt,
      password: utils.createHash(password, salt)
    };

    return super.create.call(this, newUser);
  }
}

module.exports = new Users();
