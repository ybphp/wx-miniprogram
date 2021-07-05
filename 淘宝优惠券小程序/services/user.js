var API = require('../conf/api');
var Restful = require('./restful');

class UserService {

  static login(code) {
    return Restful.post(API.USER.ONLOGIN, { code: code });
  }
  
}

module.exports = UserService;