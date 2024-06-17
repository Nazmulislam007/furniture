import { apiUrl } from "@/Context/constant";
import loggedInUser from "@/lib/isUserAvailable";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ProfileSettings() {
  const [image, setImage] = useState();
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setLogo(file.name);
  };

  useEffect(() => {
    async function getLogo() {
      const apiUrlEndpoint = `${apiUrl}/api/uploader/getLogoName?id=${loggedInUser.id}`;
      const res = await fetch(apiUrlEndpoint);
      const data = await res.json();

      if (data.logo) {
        setLogo(data.logo);

        const apiUrlEndpoint = `${apiUrl}/api/uploader/sendImage?filename=${data.logo}`;
        const res = await fetch(apiUrlEndpoint);
        if (res.ok) {
          const blob = await res.blob();
          const imageUrl = URL.createObjectURL(blob);
          setUrl(imageUrl);
        }
      }
    }
    getLogo();
  }, [loading]);

  const resizeImage = (file, maxSize) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const ratio = Math.min(maxSize / img.width, maxSize / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(resizedFile);
          }, file.type);
        };
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleUpload = async () => {
    setLoading(true);
    if (!image) return;
    const apiUrlEndpoint = `${apiUrl}/api/uploader/upload`;

    let resizedFile = image;

    if (image.size > 200000) {
      resizedFile = await resizeImage(image, 200);
    }

    const formData = new FormData();
    formData.append("file", resizedFile);

    const res = await fetch(apiUrlEndpoint, {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      await fetch(`${apiUrl}/api/uploader/uploadOnDb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: loggedInUser.id, fileName: image.name })
      });
    }

    setLoading(false);
  };

  return (
    <Box
      component="div"
      sx={{
        mt: 2,
        py: 4,
        px: 5,
        bgcolor: "white"
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: "18px",
          fontWeight: "500"
        }}
      >
        Profile Settings
      </Typography>
      <Box component="form" sx={{ mt: 2 }}>
        <Box component="div">
          <Typography component="label" sx={{ fontSize: "14px", fontWeight: "500" }}>
            My Logo
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              gap: "10px"
            }}
          >
            <Box
              component="div"
              sx={{
                position: "relative",
                border: "1px solid",
                py: "5.5px",
                px: 1,
                minWidth: "250px"
              }}
            >
              <Typography component="p">{logo || "Upload logo"}</Typography>
              <input
                type="file"
                accept="image/*"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer"
                }}
                onChange={handleChange}
              />
            </Box>

            <Button variant="contained" onClick={handleUpload}>
              Upload
            </Button>
          </Box>

          {logo && (
            <Box sx={{ width: "100px", height: "65px", mt: 2 }}>
              <img
                src={url}
                alt={logo}
                style={{ display: "block", height: "100%", width: "100%" }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
