import multer from "multer";
import { createRouter } from "next-connect";

const router = createRouter();

// Set up multer storage and file destination
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/company-logo", // Set the destination for uploaded files
    filename: (req, file, cb) => cb(null, file.originalname) // Use the original file name
  })
});

// Create a nextConnect handler
export default router.handler({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

// Configure the API route to handle POST requests with file uploads
router.use(upload.single("file"));

// Define the handler for the route
router.post((req, res) => {
  res.status(200).json({ data: "File uploaded successfully" });
});

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, since we will handle it using multer
  }
};
