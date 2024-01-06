const express = require("express")
const fileUpload = require("express-fileupload")
const db = require("./config/database")
const cors = require("cors");

const app = express()

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:'/temp'
}));

db.connect();

const Upload = require('./routes/fileUpload');
const Download = require('./routes/downloadfile')
const Delete = require("./routes/deleteroute")
const User = require("./routes/user")

// console.log("printing Upload", Upload);
app.use('/api/v1/upload', Upload)
app.use('/api/v1/download', Download)
app.use("/api/v1/delete", Delete)
app.use('/api/v1/auth', User)

app.listen(PORT,() =>{
    console.log(`app started at ${PORT}` )
})
