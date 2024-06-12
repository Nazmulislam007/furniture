export default async function handler(req, res) {
  try {
    res.status(200).json({ message: "file uploaded!" });
  } catch (error) {
    console.log(error);
  }
}
