const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); //hindrar cors-error när man kallar på API
app.use(express.json()); //middleware som gör att vi kan läsa in body från Json

//Routes
app.get("/api", (req, res) => {
    res.json({message: "Welcome to my API"});
});

app.get("/api/users", (req, res) => {
    res.json({message: "Get users"});
});

app.post("/api/users", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;

    //error handling
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    if(!name || !email) {
        //error messages
        errors.message = "Name and email not included";
        errors.detail = "You must include both name and email in JSON";

        //response code
        errors.https_response.message = "Bad Request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        return;
    }

    let user = {
        name: name,
        email: email
    };

    res.json({message: "User added", user});
});

app.put("/api/users/:id", (req, res) => {
    res.json({message: "User updated: " + req.params.id});
});

app.delete("/api/users/:id", (req, res) => {
    res.json({message: "User deleted: " + req.params.id});
});



app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});