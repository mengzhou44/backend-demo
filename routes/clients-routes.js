const _ = require('lodash');
const clientsBL = require('../business-logic/clients-bl');

module.exports = (app) => {
    app.get("/clients", (req, res) => {
        clientsBL.getAllClients().then(result => {
            res.status(200).send(result);
        });
    })

    app.post("/clients/add", (req, res) => {
        const { name, company } = req.body;
        clientsBL.addClient({ name, company }).then((result) => {
            res.status(200).send({ success: true, id: result[0].id });
        }).catch(err => {
            res.status(400).send(err);
        })
    });

    app.post("/clients", (req, res) => {
        const { id } = req.body;
        clientsBL.getClientById(id).then((result) => {
            res.status(200).send(result);
        }).catch(err => {
            console.log(err);
            res.status(400).send(err);
            return;
        })
    });

    app.post("/clients/update", (req, res) => {
        const { id, name, company } = req.body;
        clientsBL.updateClient({ id, name, company }).then((result) => {
            res.status(200).send({ success: true });
        }).catch(err => {
            console.log("Not able to edit client.");
            res.status(400).send(err);
        })
    });

    app.post("/clients/remove", (req, res) => {
        const { id } = req.body;
        clientsBL.removeClient(id).then((result) => {
            res.status(200).send({ success: true, id });
        }).catch(err => {
            console.log('remove failed!');
            console.log(err);
            res.status(400).send("Not able to delete client.");
        })
    });


};


