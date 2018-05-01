const { Pool } = require('pg');
const _ = require('lodash');
const keys = require('../config/keys');

const pool = getPool();

function getPool() {
    return new Pool({
        connectionString: keys.connectionString
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


async function selectOne(query) {
    const client = await pool.connect();
    try {
        const res = await client.query(query);
        return res.rows[0];

    } catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}


async function selectMany(query) {
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

        await client.query('BEGIN');

        await callback(client);

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error('Error occurred!');
    }
    finally {
        client.release();
    }

}


module.exports = { execute, executeInTransaction } 