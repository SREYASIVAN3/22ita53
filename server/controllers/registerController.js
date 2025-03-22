const crypto = require ("crypto")
const register = require("../models/register");

exports.registerUser = async (req, res) => {
    try {
        const { companyname, ownername, rollno, owneremail, accesscode } = req.body;
        if (!companyname || !ownername || !rollno || !owneremail || !accesscode) {
            return res.status(400).json({ message: "All Fields are required" });
        }

        
        

        const clientId = crypto.randomBytes(16).toString("hex");
        const clientSecret = crypto.randomBytes(32).toString("hex");
        const newUser = await register.create({companyname,ownername,rollno,owneremail,accesscode,clientId,clientSecret});
        res.status(201).json({
            companyname: newUser.companyname,
            clientId: newUser.clientId,
            clientSecret: newUser.clientSecret,
            ownername: newUser.ownername,
            owneremail: newUser.owneremail,
            rollno: parseInt(rollno)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};