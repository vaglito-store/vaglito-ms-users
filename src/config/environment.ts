import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST_DB: string;
  PORT_DB: number;
  USERNAME_DB: string;
  NAME_DB: string;
  PASSWORD_DB: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
  })

  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


const envsVars: EnvVars = value


export const environmentVars = {
    port: envsVars.PORT,
    hostDB: envsVars.HOST_DB,
    portDB: envsVars.PORT_DB,
    usernameDB: envsVars.USERNAME_DB,
    nameDB: envsVars.NAME_DB,
    passwordDB: envsVars.PASSWORD_DB
}