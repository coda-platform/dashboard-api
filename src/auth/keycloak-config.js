const config = {
    "realm": process.env.CODA_DASHBOARD_API_AUTH_REALM,
    "auth-server-url": process.env.CODA_AUTH_SERVICE_URL,
    "ssl-required": "external",
    "resource": "coda-dashboard-api",
    "credentials": {
        "secret": process.env.CODA_DASHBOARD_API_AUTH_CLIENT_SECRET
    },
    "confidential-port": 0
}

module.exports = config;