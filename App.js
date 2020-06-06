const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const path = require("path")

app.use(express.json({extended: true}));
app.use("/api/auth",require("./routs/auth.routs"));
app.use("/api/link",require("./routs/link.routs"));
app.use("/t",require("./routs/redirect.routs"));

if(process.env.NODE_ENV === "production"){
    app.use("/", express.static(path.join(__dirname,"client","build")))
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,"cient","build","index.html"))
    })
}

const PORT = config.get("port")||5000;


async function start(){
    try {
        await mongoose.connect(config.get("mongoUri"),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT,()=>console.log(`App has been started on ${PORT}...`))
    }catch (e) {
        console.log("server error",e.massege)
        process.exit(1)
    }
}
start()




