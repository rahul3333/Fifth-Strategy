const mongoose=require('mongoose');
const env=require('./environment')

mongoose.connect(`mongodb://localhost/${env.db}`,{useUnifiedTopology: true,useNewUrlParser: true });

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to DB'));

db.once('open',function(){
    console.log('Connected to DB :: MongoDB');
})

module.exports=db;