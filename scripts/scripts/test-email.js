"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var email_1 = require("../lib/email");
(0, email_1.sendEmail)({
    to: 'simanren2022@gmail.com', // 这里可以改成你想测试的收件邮箱
    subject: 'Test Email from Love Fortune',
    html: '<b>This is a test email. 邮件服务配置成功！</b>',
}).then(function () {
    console.log('邮件发送成功');
}).catch(console.error);
