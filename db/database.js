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

class Database {

    constructor() {
        this.connection = null;
    }

    async  execute(query) {
        if (this.connection !== null) {

            try {
                const res = await this.connection.query(query);

                return res.rows;

            } catch (error) {

                throw error;
            }

        } else {

            let con = await pool.connect();
            try {
                const res = await con.query(query);
                return res.rows;

            } catch (error) {
                throw error;
            }
            finally {
                con.release();
            }
        }
    }

    async executeInTest(callback) {

        this.connection = await pool.connect();

        try {

            await this.connection.query("BEGIN");

            await callback(this);

        } catch (error) {
            throw new Error('Error occured when executing in test.')
        }
        finally {
            await this.connection.query("ROLLBACK");
            this.connection.release();
        }

    }

}

module.exports = Database;



