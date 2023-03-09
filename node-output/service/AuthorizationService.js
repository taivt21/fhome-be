'use strict';


/**
 * Logs user into the system
 *
 * body  Add your accessToken (optional)
 * returns inline_response_200
 **/
exports.loginUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "_ID" : "adminID",
    "FullName" : "adminName",
    "password" : "password",
    "phoneNum" : "phoneNum",
    "email" : "email",
    "status" : true,
    "roleName" : "fptmember"
  },
  "messages" : "Login successfully!",
  "status" : "Success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

