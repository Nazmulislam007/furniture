export const generateEmailContent = (data) => {
  const resetPasswordLink = `http://localhost:3000/login/reset_password?token=${data.email}`;

  const htmlData = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
  </head>
  
  <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333333;">Forgot Password?</h2>
      <p style="color: #666666; margin-bottom: 20px;">We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
      <p style="color: #666666; margin-bottom: 20px;">If you did request a password reset, click the button below to choose a new password:</p>
      <a href="${resetPasswordLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-decoration: none; background-color: #007bff; color: #ffffff; border-radius: 4px;" 
         onmouseover="this.style.backgroundColor='#0056b3'" onmouseout="this.style.backgroundColor='#007bff'">Reset Password</a>
      <p style="color: #666666; margin-bottom: 20px;">If the button above doesn't work, you can copy and paste the following link into your browser:</p>
      <p style="color: #666666; margin-bottom: 20px;"><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>
      <p>Thanks,<br>Your Company Name</p>
    </div>
  
  </body>
  
  </html>
  `;

  return {
    html: htmlData
  };
};
