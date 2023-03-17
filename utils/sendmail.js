const nodemailer = require("nodemailer");

const sendEmail = async (post, order_url) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: post.userPosting.email,
    subject: "Bài đăng của bạn đã được phê duyệt",
    html: `<p>Xin chào ${post.userPosting.fullname},</p>
             <p>Bài đăng "${post.title}" của bạn đã được phê duyệt và đã được đăng lên trang web của chúng tôi.</p>
             <p>Bạn có thể thanh toán tiền thuê phòng bằng cách quét mã QR code bên dưới</p>
             <p><img src="${qrcode}" alt="QR Code" /></p>
             <p>Số tiền thanh toán: ${post.amount} VND</p>
             <p>Nếu bạn gặp bất kỳ vấn đề gì khi thanh toán hoặc có thắc mắc về bài đăng của mình, xin vui lòng liên hệ với chúng tôi qua địa chỉ email ${process.env.EMAIL}.</p>
             <p>Trân trọng,</p>
             <p>Đội ngũ quản trị viên</p>`,
  });
};

module.exports = sendEmail;
