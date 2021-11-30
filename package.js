module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    name: "backend",
    version: "1.0.0",
    description: "",
    main: "index.js",
    scripts: {
        start: "node index.js",
    },
    author: "",
    license: "ISC",
    dependencies: {
        bcrypt: "^5.0.1",
        cors: "^2.8.5",
        dotenv: "^10.0.0",
        express: "^4.17.1",
        joi: "^17.4.2",
        jsonwebtoken: "^8.5.1",
        pg: "^8.7.1",
        "pg-promise": "^10.11.1",
    },
    devDependencies: {
        nodemon: "^2.0.15",
    },
};
