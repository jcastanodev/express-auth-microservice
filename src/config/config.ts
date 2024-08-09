import Joi from 'joi';

// All env variables used by the app should be defined in this file.

// To define new env:
// 1. Add env variable to .env.local file;
// 2. Provide validation rules for your env in envsSchema;
// 3. Make it visible outside of this module in export section;
// 4. Access your env variable only via config file.
// Do not use process.env object outside of this file.

const envsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'integration', 'development')
      .required(),
    PORT: Joi.number().default(8080),
    X_API_KEY: Joi.string().required(),
    APP_URL: Joi.string().required(),
    APP_FRONT_URL: Joi.string().required(),
    SECRET_TOKEN: Joi.string().required(),
    TOKEN_EXPIRATION_TIME: Joi.string().required(),
    MONGODB_URL: Joi.string().required(),
    EMAIL_SECRET_KEY: Joi.string().required(),
    EMAIL_API_KEY: Joi.string().required(),
    EMAIL_API_URL: Joi.string().required(),
    EMAIL_SENDER: Joi.string().required(),
    EMAIL_SENDER_NAME: Joi.string().required(),
  })
  .unknown(true);

const { value: envVars, error } = envsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message}. \n
     This app requires env variables to work properly. If you run app locally use docker-compose`,
  );
}

// map env vars and make it visible outside module
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  xApiKey: envVars.X_API_KEY,
  appUrl: envVars.APP_URL,
  appFrontUrl: envVars.APP_FRONT_URL,
  secretToken: envVars.SECRET_TOKEN,
  tokenExpirationTime: envVars.TOKEN_EXPIRATION_TIME,
  mongoUrl: envVars.MONGODB_URL,
  emailSecretKey: envVars.EMAIL_SECRET_KEY,
  emailApiKey: envVars.EMAIL_API_KEY,
  emailApiUrl: envVars.EMAIL_API_URL,
  emailSender: envVars.EMAIL_SENDER,
  emailSenderName: envVars.EMAIL_SENDER_NAME,
};
