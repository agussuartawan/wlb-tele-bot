import {sync, read} from "./storage.js";
import TelegramBot from "node-telegram-bot-api";
import * as dotenv from 'dotenv';

dotenv.config();

const bot = new TelegramBot(
    process.env.TELE_KEY,
    { polling: true }
)

function listenBot() {
    bot.onText(/\/start/, msg => {
        const chatId = msg.chat.id
        bot.sendMessage(chatId, "Anda telah berlangganan untuk notifikasi WLB Payment")
            .then(() => {
                console.info(`[BOT MESSAGE] ${chatId} Has subscribed`)
                const subs = read()
                subs.push({
                    chatId: chatId,
                    date: Date.now()
                })
                sync(subs)
            })
            .catch(err => console.error("[BOT MESSAGE] Failed to send message: ", err))
    })

    bot.onText(/\/stop/, msg => {
        const chatId = msg.chat.id
        bot.sendMessage(chatId, "Anda telah berhenti berlangganan untuk notifikasi WLB Payment")
            .then(() => {
                console.info(`[BOT MESSAGE] ${chatId} Has un subscribed`)
                const subs = read()
                let i = 0;
                while (i < subs.length) {
                    if (subs[i].chatId === chatId) {
                        subs.splice(i, 1);
                    } else {
                        ++i;
                    }
                }
                sync(subs)
            })
            .catch(err => console.error("[BOT MESSAGE] Failed to send message: ", err))
    })

    bot.on("polling_error", (msg) => console.error(msg));
}

function sendMessage(title, detail, cb) {
    const errors = []
    read().forEach(sub => {
        const chat = `${title}\n${detail}`
        const chatId = sub.chatId
        console.log(sub)
        bot.sendMessage(chatId, chat)
            .then(() => {
                console.info(`[BOT MESSAGE] Message sended to ${chatId}`)
            })
            .catch(err => {
                errors.push(`[BOT MESSAGE] Failed send message to ${err}`)
            })
    })

    if (errors.length > 0) {
        return cb && cb(errors)
    }

    return cb && cb(null)
}

export { sendMessage, listenBot }
