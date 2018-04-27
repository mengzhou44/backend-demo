const Database = require('../db/database');

class ClientsBL {
    constructor(database) {

        if (database === null) {
            this.database = new Database();
        } else {
            this.database = database;
        }
    }

    getAllClients() {
        return this.database.execute({
            text: "SELECT * FROM clients"
        });
    }

    addClient({ name, company }) {

        const query = {
            text: `INSERT INTO clients(name, company) 
                    VALUES($1, $2) 
                    RETURNING *`,
            values: [name, company]
        };

        return this.database.execute(query);
    }

    getClientById(id) {
        const query = {
            text: "SELECT * FROM clients  WHERE id = $1",
            values: [id]
        };
        return this.database.execute(query);
    }

    updateClient({ id, name, company }) {
        const query = {
            text: `UPDATE clients
                   SET name =$2,
                       company = $3
                   WHERE id = $1
                   RETURNING *`,
            values: [id, name, company]
        };

        return this.database.execute(query);
    }

    removeClient(id) {
        const query = {
            text: `DELETE FROM clients
                   WHERE id = $1
                   RETURNING *`,
            values: [id]
        };

        return this.database.execute(query);
    }

}

module.exports = ClientsBL;





