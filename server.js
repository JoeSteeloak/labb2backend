const express = require('express');
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

//connect till databas
let db = new sqlite3.Database('./CV_db.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.use(cors()); //hindrar cors-error när man kallar på API
app.use(express.json()); //middleware som gör att vi kan läsa in body från Json

//Routes
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to my API" });
});

app.get("/api/workexperience", (req, res) => {

    //Get workexperience
    const sql = `SELECT * FROM workexperience`;

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).jason({ error: "something went wrong: " + err });
            return;
        }

        if (rows.length === 0) {
            res.status(404).json({ message: "no work experience found" });
        } else {
            res.json(rows); // Skicka resultaten tillbaka som JSON-svar
        }
    });
});

app.post("/api/workexperience", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    //error handling
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        //error messages
        errors.message = "Missing data";
        errors.detail = "You must include companyname, jobtitle, location, startdate, enddate, and description in JSON";

        //response code
        errors.https_response.message = "Bad Request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        return;
    }

    //add work experience to database

    const sql = `INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?);`;

    db.all(sql, [companyname, jobtitle, location, startdate, enddate, description], (err, results) => {
        if (err) {
            res.status(500).json({ error: "something went wrong: " + err });
            return;
        }

        let data = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description,
        };

        res.json({ message: "work experience added", data });
    });
});

//uppdatera data
app.put("/api/workexperience/:id", (req, res) => {

    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    const id = req.params.id;

    //error handling
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description || !id) {
        //error messages
        errors.message = "Missing data";
        errors.detail = "You must include companyname, jobtitle, location, startdate, enddate, description and id in JSON";

        //response code
        errors.https_response.message = "Bad Request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        return;
    }

    const sql = `UPDATE workexperience SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ? WHERE id = ?`;

    db.run(sql, [companyname, jobtitle, location, startdate, enddate, description, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "something went wrong: " + err });
            return;
        }

        res.json({ message: "User updated: " + req.params.id });
    });

});

//Ta bort rader från databasen
app.delete("/api/workexperience/:id", (req, res) => {

    const id = req.params.id;

    const sql = `DELETE FROM workexperience WHERE id = ?`;

    db.run(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "something went wrong: " + err });
            return;
        }

        res.json({ message: "User deleted: " + req.params.id });
    });
});



app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});