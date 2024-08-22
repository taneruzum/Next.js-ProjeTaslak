const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();

const PORT = 4000;

server.use(middleware);
server.use((req, res, next) => {
    console.log("Request received");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
server.use(router);

//Run Server -> in db folder -> node server

server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
});
