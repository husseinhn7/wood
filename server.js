import express from "express"


const app = express()

app.get("/", (req,res) => {
    res.end("go fuck off ")
})
app.listen( 5000 ,   ()=>console.log("listening "))  