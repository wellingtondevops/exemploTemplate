const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
 
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3703e5b4905929c4d9492a52320d41ec373464dc
app.use(express.static(`${__dirname}/dist/`));
 
app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/index.html`));
<<<<<<< HEAD
=======
app.use(express.static(`${__dirname}/dist/${nomeApp}`));
 
app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
>>>>>>> feature/crud_volumes
=======
>>>>>>> 3703e5b4905929c4d9492a52320d41ec373464dc
});
 
app.listen(process.env.PORT || 8080);