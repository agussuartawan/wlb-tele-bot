import fs from "fs"

const path = "./core/subscribers.json"

export const read = () => {
    const data = fs.readFileSync(path)
    return JSON.parse(data)
}

export const sync = (data) => {
    fs.writeFileSync(path, JSON.stringify(data))
}

export const initStorage = () => {
    fs.readFile(path, "utf8", err => {
        if (err) {
            fs.writeFile(path, "[]", "utf8",err => {
                if (err) {
                    console.error("[STORAGE] Error writing file: ", err)
                } else {
                    console.info("[STORAGE] Success writing file")
                }
            })
        }
    })
}
