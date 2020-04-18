const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  if (Object.keys(req.cookies).length === 0) {
    models.Sessions.create().then(
      (result) => {
        // console.log(result);
        return models.Sessions.get(result.insertId);
      }
    ).then(
      (results) => {
        console.log(results, 'HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
        req.session = results;
        res.sendStatus(200);
      }
    ).then(next());
  }

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

