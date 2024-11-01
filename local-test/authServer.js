// LOCAL TEST
const HTTP = require("http");
const FS = require("fs");
const PATH = require("path");
const AUTHENTICATE = require("./auth.js");
const PORT = 3040;

// HTTP server
const server = HTTP.createServer((req, res) => {
    if (AUTHENTICATE(req, res)) {
        if (req.url === "/index.html" || req.url === "/") {
            const FILEPATH = PATH.join(__dirname, "index.html");
            FS.readFile(FILEPATH, (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Server error");
                    return;
                }
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });
        } else {
            res.writeHead(302, { Location: "/index.html" });
            res.end();
        }
    }
})

// PORT specification
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${ PORT }/`);
});