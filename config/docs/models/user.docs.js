module.exports = {
    User : {
        type : "object",
        properties : {
          email : {
            type : "string",
            description : " email"
          },
          phoneNumber : {
            type : "string",
            description : " phone number"
          },
          _ID : {
            type : "string",
            description : " ID"
          },
          fullname : {
            type : "string",
            description : "Name"
          },
          status : {
            type : "boolean",
            description : "status"
          },
          roleName : {
            type : "string",
            description : "status"
          }
        },
        example : {
          _ID : "ID",
          FullName : "Name",
          password : "password",
          phoneNum : "phoneNum",
          email : "email",
          roleName : "fptmember"
        }
      }
}