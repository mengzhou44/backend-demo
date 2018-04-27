const db = require('../db');

const getAllClients = () => {
    return db.execute({
        text: "SELECT * FROM clients"
    });
}

const getClientById = (id) => {
    const query = {
        text: "SELECT * FROM clients  WHERE id = $1",
        values: [id]
    };
    return db.execute(query);
}


const addClient = ({ name, company }) => {
    const query = {
        text: `INSERT INTO clients(name, company) 
                VALUES($1, $2) 
                RETURNING *`,
        values: [name, company]
    };

    return db.execute(query);
}


const updateClient = ({ id, name, company }) => {
    const query = {
        text: `UPDATE clients
               SET name =$2,
                   company = $3
               WHERE id = $1
               RETURNING *`,
        values: [id, name, company]
    };

    return db.execute(query);
}

const removeClient = (id) => {
    const query = {
        text: `DELETE FROM clients
               WHERE id = $1
               RETURNING *`,
        values: [id]
    };

    return db.execute(query);
}

module.exports = {
    getAllClients,
    getClientById,
    addClient,
    updateClient,
    removeClient
}



