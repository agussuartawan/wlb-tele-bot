import express from "express";
import {sendMessage} from "./bot.js";

const router = express.Router()

// send mesage to bot
router.post("/bot/send-message-to-subscriber", async (req, res) => {
    const title = req.body.title
    const detail = req.body.detail
    if (!title || !detail) {
        res.status(400).json({
            status: "fail",
            message: "title and detail required"
        })
        return
    }

    await sendMessage(title, detail, (err) => {
        if (err) {
            console.error(err)
            res.status(500).json({
                status: "fail",
                message: err
            })
        } else {
            res.status(200).json({
                status: "success",
                message: "Message sended..."
            })
        }
    })
})

export default router
