const express = require('express');
const app = express();
const morgan  = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow_Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-Width,Content-Type,Accept,Authorization');

    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({});
    }
    next();
})

const CommuntyRoutes = require('./api/routes/communities');
const MemberRoutes = require('./api/routes/members');
const UserRoutes = require('./api/routes/users');
const RoleRoutes = require('./api/routes/roles');
mongoose.connect('mongodb+srv://aditya20169:adityabasatia@assignment-2.sbzbrix.mongodb.net/?retryWrites=true&w=majority',).then(()=>console.log('Connected Succesfully')).catch((err)=>{console.error(err);});
app.use('/v1/community',CommuntyRoutes);
app.use('/v1/member',MemberRoutes);
app.use('/v1/auth',UserRoutes);
app.use('/v1/role',RoleRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status =404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{messsage:error.message}
    })
})

module.exports = app;