const User = require("./models/user.docs");
const Posting = require('./models/Posting.docs')
const Rooms = require('./models/Rooms.docs')
const Building = require('./models/building.docs')
module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ...User,
      ...Posting,
      ...Rooms,
      ...Building,
    },
  },
};
