import { sendEmail } from '../lib/email';

sendEmail({
  to: 'simanren2022@gmail.com', // 这里可以改成你想测试的收件邮箱
  subject: 'Test Email from Love Fortune',
  html: '<b>This is a test email. 邮件服务配置成功！</b>',
}).then(() => {
  console.log('邮件发送成功');
}).catch(console.error); 