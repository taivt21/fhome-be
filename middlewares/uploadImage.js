const admin = require("firebase-admin");

const serviceAccount = require("../config/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const image = req.file;
  const filename = Date.now() + "-" + image.originalname;

  const file = bucket.file(filename);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on("error", (err) => {
    console.error(err);
    next(err);
  });

  stream.on("finish", async () => {
    try {
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      req.body.img = imageUrl;
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  stream.end(image.buffer);
};

module.exports = uploadImage;
