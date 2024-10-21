import sql from 'mssql'
import { configDB } from '../config.js';

const dbConfig = {
    user: configDB.user,
    password: configDB.password,
    server: configDB.server,
    database: configDB.name,
    port: parseInt(configDB.port),
    options: {
        trustServerCertificate: true
    }
}

export async function getConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        // const result = await pool.request().query('SELECT 1');
        // console.log(result)
        return pool
    } catch (error) {
        console.error(error)
    }
}

getConnection()

export { sql }