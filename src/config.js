import { config } from 'dotenv'

config();

const expressConfig = {
    port: process.env.PORT_EXPRESS,
    host: process.env.HOST_EXPRESS,
}

const configDB = {
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    server: process.env.SERVER_DB,
    name: process.env.NAME_DB,
    port: process.env.PORT_DB,
    options: {
        trustServerCertificate: true
}
}

export { expressConfig, configDB }