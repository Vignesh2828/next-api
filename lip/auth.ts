import mysql from 'mysql2/promise';

const authPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'my_auth',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export async function authQuery<T = any>(sql: string, values: any[] = []): Promise<T> {
    const [results] = await authPool.execute(sql, values);
    return results as T;
}
