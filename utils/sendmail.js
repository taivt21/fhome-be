const nodemailer = require("nodemailer");

const sendEmail = async (post, order_url) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailUser = {
    from: process.env.EMAIL,
    to: post.userPosting.email,
    subject: "Bài đăng của bạn đã được phê duyệt",
    html: `<p>Xin chào ${post.userPosting.fullname},</p>
             <p>Bài đăng "${post.title}" của bạn đã được phê duyệt và đã được đăng lên trang web của chúng tôi.</p>
             <p>Bạn có thể thanh toán tiền thuê phòng bằng cách truy cập bên dưới</p>
             <p><a href="${order_url}">Thanh toán tại đây</a></p>
             <p>Nếu bạn gặp bất kỳ vấn đề gì khi thanh toán hoặc có thắc mắc về bài đăng của mình, xin vui lòng liên hệ với chúng tôi qua địa chỉ email ${process.env.EMAIL}.</p>
             <p>Trân trọng,</p>
             <p>Đội ngũ quản trị viên</p>`,
  };

  const mailAdmin = {
    from: process.env.EMAIL,
    to: "vinhthse151179@fpt.edu.vn",
    subject: "Bài đăng của bạn đã được phê duyệt",
    html: `<p>Xin chào Vinh Tran,</p>
    <p>Có bài post mới đang chờ được phê duyệt</p>`,
  };

  if (post.userPosting.roleName == "landlord" || "fptmember") {
    try {
      const response = await transporter.sendMail(mailUser);
      console.log(response, "email");
    } catch (error) {}
  } else {
    try {
      const response = await transporter.sendMail(mailAdmin);
      console.log(response, "email");
    } catch (error) {}
  }
};

module.exports = sendEmail;
