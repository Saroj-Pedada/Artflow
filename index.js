const express = require("express")
const app = express()

app.use(express.static(__dirname + '/public'));

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/pages/index.html")
})

app.get("/info", (_, res) => {
    res.sendFile(__dirname + "/pages/info.html")
})

app.use((_, res, __) => {
    res.sendFile(__dirname + "/pages/error.html")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000...")
})