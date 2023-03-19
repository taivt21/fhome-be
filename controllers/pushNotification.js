// const admin = require("firebase-admin");
const axios = require('axios');

// Hàm gửi thông báo push đến một thiết bị cụ thể
const sendNotification = ( title, message) => {
const serverKey = process.env.SERVER_KEY; // Server key from Firebase console
const deviceToken = req.body.deviceToken || "eiu1k7EfSIyTdBKl2q7ly3:APA91bE8PSetGf1Bu-F53KZkIgtnrKLGprFhXzLmVMlpHO25jigofisXzvEk121yBX7tjPBJXNGb7JVHr3yw7rYz-wZBJM0-0y3U93HrF4rGwTLtKihYfx93ZdTjRxoLVBWT7-4GyJbH";


const data = {
  notification: {
    title: 'New message',
    body: 'You have a new message'
  },
  to: deviceToken
};

axios.post('https://fcm.googleapis.com/fcm/send', data, {
  headers: {
    'Authorization': `key=${serverKey}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});

};

module.exports = {
  sendNotification,
};
