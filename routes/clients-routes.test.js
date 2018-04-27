const expect = require("expect");
const request = require("supertest");
const Database = require("../db/database");
const ClientsBL = require('../business-logic/clients-bl');

const { app } = require('../server');

describe("Clients", () => {
    // beforeEach(populateClients);

    describe("GET /clients", () => {
        it("should be able to get clients", (done) => {

            new Database().executeInTest((database) => {

                app.database = database;
                request(app)
                    .get("/clients")
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        done();
                        expect(res.body.length).toBe(2);
                    });
            });
        });
    });

    describe("POST /clients/add", () => {
        it("should be able to add client", (done) => {
            new Database().executeInTest((database) => {
                app.database = database;
                request(app)
                    .post("/clients/add")
                    .send({ name: "Simon", company: "345454 alberta ltd." })
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        new ClientsBL(database).getClientById(res.body.id)
                            .then((result) => {
                                done();
                                expect(result).not.toBe(null);

                            }).catch(err => {
                                done(err);
                            })
                    });
            });
        })
    });



});

/*

    describe("POST /clients/update", () => {
        const client = clients[0];
        client.name = "new name";
        it("should be able to update client", (done) => {
            request(app)
                .post("/clients/update")
                .send(client)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    clientsBL.getClientById(client.id).then((result) => {
                        done();
                        expect(result[0].name).toBe("new name");
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
                    clientsBL.getAllClients().then((result) => {
                        done();
                        expect(result.length).toBe(1);

                    }).catch(err => {
                        done(err);
                    })
                });
        })
    });
    */

