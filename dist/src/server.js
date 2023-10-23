"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = require("./connection/dbConnect");
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(body_parser_1.default.json())
    .use((0, cors_1.default)({ origin: "*" }))
    .use((req, res, next) => {
    res.setHeader('Access-Control-Origin', "*");
    next();
})
    .use('/', index_1.default);
(0, dbConnect_1.initDb)((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(PORT, () => {
            console.log(`Connected to DB and listening on port ${PORT}`);
        });
    }
});
