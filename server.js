const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
 
<<<<<<< HEAD
app.use(express.static(`${__dirname}/dist/`));
 
app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/index.html`));
=======
app.use(express.static(`${__dirname}/dist/${nomeApp}`));
 
app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
>>>>>>> feature/crud_volumes
});
 
app.listen(process.env.PORT || 8080);