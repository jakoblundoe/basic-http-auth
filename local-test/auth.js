// LOCAL TEST
const USER = "user";
const PASS = "dummypass";
const PROMPT_MESSAGE = "Authentication required";
const ERROR_MESSAGE = "Authentication failed";

const ENCODED_CREDENTIALS = Buffer.from(`${USER}:${PASS}`).toString("base64");

function authenticate(req, res) {
    const AUTH_HEADER = req.headers["authorization"];
    if (!AUTH_HEADER) {
        res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Access to site"' });
        res.end(PROMPT_MESSAGE)
        return false;
    }

    const RECEIVED_CREDENTIALS =AUTH_HEADER.split(" ")[1];
    if (RECEIVED_CREDENTIALS === ENCODED_CREDENTIALS) {
        return true;
    } else {
        res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Access to site"' });
        res.end(ERROR_MESSAGE);
        return false;
    }
}

module.exports = authenticate;