const express = require("express");
const app = express();
const port = 3000;
const { connectDB, closeDB, client } = require("./db/database");
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('img'))
app.use(express.static('style'))
app.use(express.static('views'))
app.set("view engine", "ejs");

connectDB();

app.get("/kerja-projek", async (req,res) => {
    res.render("index" , {
        massage: "",
    })
})



app.post("/feedback", async (req,res) => {

    
    const {nama, email, textarea} = req.body;
    const dbajuk = await client.db("databasejidan");
    const feedbackjidan = dbajuk.collection("feedback");
    if (nama == "" && email == "" && textarea == "" || nama  && email == "" && textarea == "" || nama == "" && email && textarea == "" || nama == "" && email == "" && textarea || nama && email && textarea == "" || nama && email == "" && textarea) {
        res.render("index", {
            massage: "gagal mengirim datanya, karena ada data yang kosong atau semuannya kosong",
        })
    } else {
        await feedbackjidan.insertOne({nama,email,textarea});
        res.render("index", {
            massage: "berhasil masuk datanya",
        })
    }

})

process.on('SIGINT', async () => {
    await closeDB();
    process.exit();
});


app.listen(port,() => {
    console.log("berhasil masuk di port 3000");
})