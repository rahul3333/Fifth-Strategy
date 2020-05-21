const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development={
    name:'development',
    assets_path:'/assets',
    session_cookie_key:'RahulDewan',
    db:'fifth_Strategy_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'fifthstrategy.fs@gmail.com',
            pass:'mystrategy123'
        }
    },
    google_client_ID:"118627288182-1d0khuolrp96819fftkco6d39rhg7qjc.apps.googleusercontent.com",
    google_client_Secret:"AbMEnqWSMmofCV5IjMNiHEfy",
    google_callback_URL:"http://localhost:8000/users/auth/google/callback",
    jwt_Secret:'fifth_Strategy',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production={
    name:'production',
    assets_path:process.env.FIFTH_STRATEGY_ASSETS_PATH,
    session_cookie_key:process.env.FIFTH_STRATEGY_SESSION_COOKIE_KEY,
    db:process.env.FIFTH_STRATEGY_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.FIFTH_STRATEGY_GMAIL_USERNAME,
            pass:process.env.FIFTH_STRATEGY_GMAIL_PASSWORD
        }
    },
    google_client_ID:process.env.FIFTH_STRATEGY_GOOGLE_CLIENT_ID,               
    google_client_Secret:process.env.FIFTH_STRATEGY_GOOGLE_CLIENT_SECRET,
    google_callback_URL:process.env.FIFTH_STRATEGY_GOOGLE_CALLBACK_URL,
    jwt_Secret:process.env.FIFTH_STRATEGY_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports=eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.FIFTH_STRATEGY_ENVIRONMENT);
