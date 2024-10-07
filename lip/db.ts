import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'root123',
    database : 'nextjs_ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export async function query<T=any>(sql:string, values: any[] =[]) : Promise<T> {
    const [results] = await pool.execute(sql, values )
    return results as T
}