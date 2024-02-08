import express from "express"
import bodyParser from "body-parser";
import {initStorage} from "./core/storage.js";
import router from "./core/controller.js";
import {listenBot} from "./core/bot.js";

const app = express()
const port = 8075

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)

app.listen(port, () => {
    initStorage()
    listenBot()
    console.info("[APP] Server started at port: ", port)
})
