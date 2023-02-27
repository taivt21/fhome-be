const errorHandler = (err, req, res, next) => {
    // Kiểm tra loại lỗi và xử lý tương ứng
    // if (err instanceof CustomError) {
    //   // Nếu là CustomError, trả về mã lỗi và thông báo lỗi cho client
    //   res.status(err.status).json({ error: err.message });
    // } else {
    //   // Nếu là lỗi khác, trả về mã lỗi 500 và thông báo lỗi cho client
    //   res.status(500).json({ error: "Internal Server Error" });
    // }
    return(
      err()
    )
  };
  
  module.exports = errorHandler;
  