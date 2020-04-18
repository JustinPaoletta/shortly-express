const parseCookies = (req, res, next) => {
  //split cookies and store into a variable;
  if (req.headers.cookie) {
    let cookieArray = req.headers.cookie.split('; ');
    //create an object to store them in
    let cookieObject = {};
    //itreate through cookiesarray
    for (let cookie of cookieArray) {
      //split on equals
      let newCookie = cookie.split('=');
      //cookiesobject[tuple[0]] === tuple[1]
      cookieObject[newCookie[0]] = newCookie[1];
      //req.cookies['cookie'] = req.headers;
      //console.log(req.headers.cookie);
    }
    req.cookies = cookieObject;
    next();
  }
};
module.exports = parseCookies;