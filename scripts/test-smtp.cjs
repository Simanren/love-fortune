require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: 'simanren2022@gmail.com', // 改成你要测试的邮箱
  subject: 'Test Email from Love Fortune',
  html: '<b>This is a test email. 邮件服务配置成功！</b>',
}).then(() => {
  console.log('邮件发送成功');
}).catch(console.error); 