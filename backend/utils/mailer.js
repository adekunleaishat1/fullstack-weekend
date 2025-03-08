const nodemailer = require("nodemailer")

const Sendemail = async (email,username) =>{ 
   
    const messageTemplate = `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Service!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Our Service, ${username}!</h1>
        <p>We are thrilled to have you on board. If you have any questions or need assistance, feel free to reach out to us.</p>
        <p>Best regards,<br>The Team</p>
        <div class="footer">This is an automated message, please do not reply.</div>
    </div>
</body>
</html>

    `

  const transporter = nodemailer. createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASS
        }
    })

    const mailOptions ={
        from:process.env.USER_EMAIL,
        to:email,
        subject:"Welcome to Our Service",
        html:messageTemplate
    }

    try {
      const forwordmail = await transporter.sendMail(mailOptions)
      if (forwordmail) {
        console.log("mail sent");
        
      }
    } catch (error) {
      console.log(error);
        
    }

}


module.exports = Sendemail