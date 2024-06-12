import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/company-logo",
  filename: (req, file, cb) => cb(null, file.originalname)
});



const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export async function uploadMiddleware(req,res){
  try {
    const upload = multer({ storage });
    const uploadMiddleware = upload.single("file");
    await runMiddleware(req, res, uploadMiddleware);
   
  } catch (error) {
    console.log(error)
  }
}


export async function query({ query, values = [] }) {
  // const dbconnection = await mysql.createConnection({
  //   host: "localhost",
  //   database: "renocommerce",
  //   user: "nazmul",
  //   password: "112233"
  // });

  const dbconnection = await mysql.createConnection({
    host: "167.99.182.9",
    database: "renocommerce",
    user: "renocomdb",
    password: "aprjun365"
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    console.log(error);
  }
}
