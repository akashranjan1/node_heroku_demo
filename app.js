const appRouterFactory = require('./routes/router-factory');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//app.use(express.static(__dirname+'dist/faasos-spa'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('dist/demo-spa'));
}


app.use('/api', appRouterFactory);

app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/demo-spa','index.html'));
})

app.listen(port, () => {
    console.log("Listening on port ",port);
});


