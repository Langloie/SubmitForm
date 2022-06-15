//set up a server using express and node
const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const sendMail = require('./mail')

//configure data parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//receive data
app.post('/email', (req,res)=>{
    const {username, email} = req.body;
    console.log('Data: ', req.body);
    sendMail(email, username, (err, data)=>{
        if(err){
            res.status(500).json({message: 'Internal Error'});
        } else{
            res.json({message: 'Email sent succesfully'})
        }
    });
});

//view index.html on server running on localhost:8080
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//start server
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});