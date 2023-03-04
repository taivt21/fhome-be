const firebase = require("firebase");
const admin = require("firebase-admin");
const Multer = require("multer");

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: "<your-storage-bucket-name>",
});

// Create a Multer instance for handling file uploads
const upload = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

// Define a route for handling file uploads
app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
    }

    const bucket = admin.storage().bucket();
    const blob = bucket.file(req.file.originalname);

    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    blobStream.on("error", (error) => {
        console.log(error);
        res.status(500).send("Something went wrong.");
    });

    blobStream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(200).send(publicUrl);
    });

    blobStream.end(req.file.buffer);
});
