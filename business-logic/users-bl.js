const db = require('../db');


const getUserById = (id) => {
    const query = {
        text: "SELECT * FROM users WHERE id = $1",
        values: [id]
    };
    return db.selectOne(query);
}

const getUserByEmail = (email) => {
    const query = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [id]
    };
    return db.selectOne(query);
}


module.exports = {
    getUserById,
    getUserByEmail
}



