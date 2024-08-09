import { IUser } from '@components/account/user/user.interface';
import config from '@config/config';
import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(config.emailApiKey, config.emailSecretKey);

const clearEmail = (email: string): string => {
  const indexPlusAt = email.indexOf('+');
  const indexAt = email.indexOf('@');
  return email.replace(email.slice(indexPlusAt, indexAt), '');
};

const sendVerificationEmail = (user: IUser): Promise<any> => {
  return mailjet.post('send', { version: 'v3.1' }).request({
    SandboxMode: 'true',
    Messages: [
      {
        From: [
          {
            Email: config.emailSender,
            Name: config.emailSenderName,
          },
        ],
        HTMLPart: `<html>
        <head></head>
        <body>
            <h1>Hello this email is for verificate your email address,
                <a href="${config.appUrl}/api/account/verify/${user.verified}">please click here for continue...</a>
            </h1>
        </body>
        </html>`,
        Subject: 'Verification Email',
        TextPart: 'Hello this email is for verificate your email address',
        To: [
          {
            Email: clearEmail(user.email),
            Name: user.name,
          },
        ],
      },
    ],
  });
};

const sendWelcomeEmail = (user: IUser): Promise<any> => {
  return mailjet.post('send', { version: 'v3.1' }).request({
    SandboxMode: 'true',
    Messages: [
      {
        From: [
          {
            Email: config.emailSender,
            Name: config.emailSenderName,
          },
        ],
        HTMLPart: `<html>
        <head></head>
        <body>
            <h1>Hello, this email is to welcome you to the project,
            <a href="${config.appFrontUrl}">we hope to see you here often.</a>
            </h1>
        </body>
        </html>`,
        Subject: 'Welcome to the project',
        TextPart: 'Hello, this email is to welcome you to the project',
        To: [
          {
            Email: clearEmail(user.email),
            Name: user.name,
          },
        ],
      },
    ],
  });
};

export { sendVerificationEmail, sendWelcomeEmail };
