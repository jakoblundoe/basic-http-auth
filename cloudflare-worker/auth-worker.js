const USERNAME = 'user';
const REALM = 'secure site';

export default {
    async fetch(request, env) {  // Access env directly from the fetch handler
        return handleRequest(request, env);
    }
};

async function handleRequest(request, env) {
    const PASSWORD = env.PASSWORD;  // Access PASSWORD directly from env
    const authorization = request.headers.get('authorization');

    if (!request.headers.has('authorization')) {
        return getUnauthorizedResponse(
            'Provide User Name and Password to access this page.'
        );
    }

    const credentials = parseCredentials(authorization);

    if (credentials[0] !== USERNAME || credentials[1] !== PASSWORD) {
        return getUnauthorizedResponse(
            'The User Name and Password combination you have entered is invalid.'
        );
    }

    return await fetch(request);
}

/**
 * Break down base64 encoded authorization string into plain-text username and password
 * @param {string} authorization
 * @returns {string[]}
 */
function parseCredentials(authorization) {
    const parts = authorization.split(' ');
    const plainAuth = atob(parts[1]);
    const credentials = plainAuth.split(':');
    return credentials;
}

/**
 * Helper function to generate Response object
 * @param {string} message
 * @returns {Response}
 */
function getUnauthorizedResponse(message) {
    let response = new Response(message, {
        status: 401,
    });
    response.headers.set('WWW-Authenticate', `Basic realm="${REALM}"`);
    return response;
}