const { Pool } = require("pg");
const _ = require("lodash");

const env = process.env.NODE_ENV || "development";

const pool = getPool();

function getPool() {
    if (env === "test") {
        return new Pool({
            user: "postgres",
            database: "gems_smartmats_test",
            server: "localhost",
            password: "Aa1197344",
            port: 5432
        });
    }

    return new Pool({
        user: "postgres",
        database: "gems_smartmats_qa",
        server: "localhost",
        password: "Aa1197344",
        port: 5432
    });
}

async function execute(query) {
    const client = await pool.connect();
    try {
        const res = await client.query(query);
        return res.rows;

    } catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}

async function executeInTransaction(callback) {

    const client = await pool.connect();
    try {

        await client.query("BEGIN");

        await callback(client);

        await client.query("COMMIT");

    } catch (error) {
        await client.query("ROLLBACK");
    }
    finally {
        client.release();
    }

}


module.exports = { execute, executeInTransaction }  