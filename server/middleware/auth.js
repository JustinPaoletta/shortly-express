const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  // check for session cookie
  Promise.resolve(req.cookies.shortlyid)
    .then((hash) => {
      // hash is shortlyid cookie
      //console.log(hash);
      if (!hash) {
        // throw to catch and make session
        throw hash;
      }
      // if hash (shortlyid) exists try to get it from db
      return models.Sessions.get({hash});
    })
    .tap((session) => {
      if (!session) {
        // throw to catch and make session
        throw session;
      }
      // if we were successful return the session
      //return session;
    })
    .catch(() => {
    // make a session and insert into db
      return models.Sessions.create()
        .then(results => {
          // get session from db
          return models.Sessions.get({id: results.insertId});
        })
        .tap(session => {
          // res.cookie is a func that sets a cookie to be sent with response
          res.cookie('shortlyid', session.hash);
          //return session;
        });
      //next();
    })
    .then((session) => {
      // finally set session on req object
      req.session = session;
      // make sure to call next
      next();
    });

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

