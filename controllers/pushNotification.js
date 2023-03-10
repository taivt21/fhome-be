const admin = require('firebase-admin');

// Đường dẫn tới tệp JSON chứa thông tin xác thực Firebase của bạn
// const serviceAccount = require('../config/serviceAccount.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// Hàm gửi thông báo push đến một thiết bị cụ thể
const sendNotification = (deviceToken, title, message) => {
  const payload = {
    notification: {
      title: title,
      body: message
    }
  };

  admin.messaging().sendToDevice(deviceToken, payload)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
}

module.exports = {
  sendNotification
};
