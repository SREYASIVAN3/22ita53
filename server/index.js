const mongoose = require ("mongoose");

const express = require ("express");
const cors = require ("cors");
const dotenv = require ("dotenv");
const registerRoutes = require ("./routes/registerRoutes")
dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use("/register",registerRoutes);

const PORT=process.env.PORT||8080;
const DB = process.env.DB;
mongoose.connect(DB)
.then(()=>{console.log("Connected to DB")
    
app.listen(PORT,()=>{
    console.log(`The port is running in ${PORT}`);
})
}).catch((error)=>{console.log("Some ERrror to connect to Db",error)
})