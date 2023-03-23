const nodemailer = require("nodemailer");

const sendEmail = async (status, post, order_url) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });



  if (status == "confirm") {
    try {
      const response = await transporter.sendMail(mailUserConfirm);
    } catch (error) {}
  } else if (status == "approved") {
    try {
      const response = await transporter.sendMail(mailUserApproved);
    } catch (error) {}
  } else if (status == "rejected") {
    try {
      const response = await transporter.sendMail(mailUserRejected);
    } catch (error) {}
  } else if (status == "register") {
    try {
      const response = await transporter.sendMail(mailRegister);
    } catch (error) {}
  } else if (status == "registerSuccess") {
    try {
      const response = await transporter.sendMail(mailRegisterSuccess);
    } catch (error) {}
  } else {
    try {
      const response = await transporter.sendMail(mailAdmin);
    } catch (error) {}
  }
  const mailUserConfirm = {
    from: process.env.EMAIL,
    to: post.userPosting.email,
    subject: "Bài đăng của bạn đã được gửi lên admin",
    html: `<p>Xin chào ${post.userPosting.fullname},</p>
             <p>Bài đăng "${post.title}" của bạn đã được gửi lên và chờ phê duyệt.</p>
             <p>Nếu bạn gặp bất kỳ vấn đề gì khi thanh toán hoặc có thắc mắc về bài đăng của mình, xin vui lòng liên hệ với chúng tôi qua địa chỉ email ${process.env.EMAIL}.</p>
             <p>Trân trọng,</p>
             <p>Đội ngũ quản trị viên</p>`,
  };

  const mailUserRejected = {
    from: process.env.EMAIL,
    to: post.userPosting.email,
    subject: "Bài đăng của bạn bị từ chối",
    html: `<p>Xin chào ${post.userPosting.fullname},</p>
             <p>Bài đăng "${post.title}" của bạn đã bị <b> từ chối </b> phê duyệt.</p>
             <p>Nếu bạn gặp bất kỳ vấn đề gì khi thanh toán hoặc có thắc mắc về bài đăng của mình, xin vui lòng liên hệ với chúng tôi qua địa chỉ email ${process.env.EMAIL}.</p>
             <p>Trân trọng,</p>
             <p>Đội ngũ quản trị viên</p>`,
  };

  const mailUserApproved = {
    from: process.env.EMAIL,
    to: post.userPosting.email,
    subject: "Bài đăng của bạn đã được phê duyệt",
    html: `<p>Xin chào ${post.userPosting.fullname},</p>
             <p>Bài đăng "${post.title}" của bạn đã <b> phê duyệt </b> được và cần được thanh toán để hiển thị lên trang web của chúng tôi.</p>
             <p>Bạn có thể thanh toán tiền thuê phòng bằng cách truy cập bên dưới</p>
             <p><a href="${order_url}">Thanh toán tại đây</a></p>
             <p>Nếu bạn gặp bất kỳ vấn đề gì khi thanh toán hoặc có thắc mắc về bài đăng của mình, xin vui lòng liên hệ với chúng tôi qua địa chỉ email ${process.env.EMAIL}.</p>
             <p>Trân trọng,</p>
             <p>Đội ngũ quản trị viên</p>`,
  };

  const mailAdmin = {
    from: process.env.EMAIL,
    to: "tranvinh2499@gmail.com",
    subject: "Bài đăng mới đang đợi bạn phê duyệt",
    html: `<p>Xin chào Vinh Tran,</p>
    <p>Có bài post mới đang chờ được phê duyệt</p>`,
  };

  const mailRegister = {
    from: process.env.EMAIL,
    to: "tranvinh2499@gmail.com",
    subject: "Có chủ trọ mới đang đợi bạn phê duyệt",
    html: `<p>Xin chào Vinh Tran,</p>
    <p>Có người dùng vừa đăng kí và đang chờ được phê duyệt</p>
    <p>Vui lòng vào xét duyệt</p>
    <p>Trân trọng</p>
    <p>Đội ngũ quản trị viên</p>`,
  };

  const mailRegisterSuccess = {
    from: process.env.EMAIL,
    to: post.email,
    subject: "Chúc mừng bạn được phê duyệt tài khoản",
    html: `<p>Xin chào ${post.fullname},</p>
    <p>Chúc mừng bạn với email <b> ${post.email} </b> đã được phê duyệt thành công</p>
    <p>Hãy vào web và đăng bài nhé!</p>
    <p>Trân trọng</p>
    <p>Đội ngũ quản trị viên</p>`,
  };
};

module.exports = sendEmail;
