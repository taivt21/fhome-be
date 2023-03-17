const admin = require("firebase-admin");

// Đường dẫn tới tệp JSON chứa thông tin xác thực Firebase của bạn
// const serviceAccount = require('../config/serviceAccount.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// Hàm gửi thông báo push đến một thiết bị cụ thể
const sendNotification = (deviceToken, title, message) => {
  const axios = require('axios');
const serverKey = process.env.SERVER_KEY; // Server key from Firebase console
const deviceToken = 'device-token'; // Device token from the client app

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
