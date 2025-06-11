require('dotenv').config();

const express = require('express');
const configViewEngine = require('./config/configEngine');
const routes = require('./routes/web');
const cronJobController = require('./controllers/cronJobController');
const socketIoController = require('./controllers/socketIoController');
const cookieParser = require('cookie-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup view engine
configViewEngine(app);

// Init web routes
routes.initWebRouter(app);

// Start cron job
cronJobController.cronJobGame1p(io);

// Setup socket.io
socketIoController.sendMessageAdmin(io);

// Handle 404 (optional)
// app.all('*', (req, res) => {
//     return res.render("404.ejs");
// });

server.listen(port, () => {
    console.log("Connected success port: " + port);
});
