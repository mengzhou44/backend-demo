const expect = require("expect");
const request = require("supertest");
const db = require("../db");
const clientsBL = require('../business-logic/clients-bl');

const { app } = require('../server');

const clients = [
    {
        name: "Mark",
        company: "Cenovous"
    },
    {
        name: "Denis",
        company: "Nexen"
    }
];


const populateClients = (done) => {
    db.executeInTransaction(async (client) => {
        await client.query({
            text: "DELETE FROM clients"
        });

        for (var i = 0; i < clients.length; i++) {
            const res = await client.query({
                text: `INSERT INTO clients(name, company) 
                        VALUES($1, $2) 
                        RETURNING *`,
                values: [clients[i].name, clients[i].company]
            });
            clients[i].id = res.rows[0].id;

        }
    })
        .then(() => {
            done();
        })
        .catch(error => {
            throw new Error('Error occured...');
        });
};

describe("Clients", () => {
    beforeEach(populateClients);

    describe("GET /clients", () => {
        it("should be able to get clients", (done) => {
            request(app)
                .get("/clients")
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                    expect(res.body.length).toBe(2);
                });
        })
    });

    describe("POST /clients/add", () => {
        it("should be able to add client", (done) => {
            request(app)
                .post("/clients/add")
                .send({ name: "Simon", company: "345454 alberta ltd." })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    if (res.error) {
                        console.log(JSON.stringify(res.error, null, 4));
                        return done(res.error);
                    }
                    clientsBL.getClientById(res.body.id)
                        .then((result) => {
                            done();
                            expect(result).not.toBe(null);

                        }).catch(err => {
                            done(err);
                        })
                });
        })
    });

    describe("POST /clients/update", () => {
        const client = clients[0];
        client.company = "new name";
        it("should be able to update client", (done) => {
            request(app)
                .post("/clients/update")
                .send(client)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    if (res.error) {
                        return done(res.error);
                    }
                    clientsBL.getClientById(client.id).then((result) => {
                        done();
                        expect(result[0].company).toBe("new name");
                    }).catch(err => {
                        done(err);
                    })
                });
        })
    });

    describe("POST /clients/remove", () => {
        it("should be able to remove client", (done) => {
            request(app)
                .post("/clients/remove")
                .send({ id: clients[0].id })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    if (res.error) {
                        console.log("error", res.error);
                        return done(res.error);
                    }
                    clientsBL.getAllClients().then((result) => {
                        done();
                        expect(result.length).toBe(1);
                    }).catch(err => {
                        done(err);
                    })
                });
        })
    });



});



