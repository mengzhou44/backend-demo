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
        values: [email]
    };
    return db.selectOne(query);
}

const addUser = ({ email, name }) => {
    const query = {
        text: `INSERT INTO users(name, email) 
                    VALUES($1, $2) 
                    RETURNING *`,
        values: [name, email]
    };
    return db.execute(query);
}


module.exports = {
    getUserById,
    getUserByEmail,
    addUser
}



