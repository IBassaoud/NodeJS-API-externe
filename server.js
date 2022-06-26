const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const port = 9595;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));

//Affiche mon fichier HTML 
app.get("/", function(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', function(err, data){
        if(err) throw err;
        res.end(data);
    });
});

app.get("/images", function(req, res){
    let quantity = req.query.quantity;
    fetch('https://picsum.photos/v2/list?page=2&limit='+quantity)
    .then(
        reponse => reponse.json()
    )
    .then(
        reponse2 => res.json(reponse2)
    )
    .catch(
        function(err){
        console.log(err.message)
    });
});

app.get("/users", function(req, res){
    let quantity = 3;
    fetch('https://randomuser.me/api/?results='+quantity)
    .then(
        reponseUser => reponseUser.json()
    )
    .then(
        reponseUser2 => res.json(reponseUser2)
    )
    .catch(
        function(err){
        console.log(err.message)
    });
});

app.get("/creditCards", function(req, res){
    let quantity = 3;
    fetch('https://fakerapi.it/api/v1/credit_cards?_quantity='+quantity)
    .then(
        reponseCredCards => reponseCredCards.json()
    )
    .then(
        reponseCredCards2 => res.json(reponseCredCards2)
    )
    .catch(
        function(err){
        console.log(err.message)
    });
});

app.get("/companies", function(req, res){
    let quantity = 100;
    fetch('https://fakerapi.it/api/v1/companies?_quantity='+quantity)
    .then(
        responseCompanies => responseCompanies.json()
    )
    .then(
        responseCompanies2 => res.json(responseCompanies2)
    )
    .catch(
        function(err){
        console.log(err.message)
    });
});

//
app.listen(port, () => {
    console.log('\nServer running on http://localhost:' + port);
});
