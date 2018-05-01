const db = require('../db');


const getUserById = (id) => {
    const query = {
        text: "SELECT * FROM users WHERE id = $1",
        values: [id]
    };
    return db.execute(query);
}

module.exports = {
    getUserById
}



