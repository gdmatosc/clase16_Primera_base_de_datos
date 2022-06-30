const express=require('express');
const http=require('http');
const productosRouter=require('./routes/productosRouter');
const { Server }=require("socket.io");


const app=express();
const server=http.createServer(app)
const io=new Server(server);
const PORT=8081;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
    req.io = io;
    return next();
});

app.use('/productos',productosRouter);


app.get('/',(req,res)=>{
    res.sendFile('index.html',{root: __dirname})
})

app.get('/productos',(req,res)=>{
    res.sendFile('productos.html',{root: __dirname+'/public'})
})

app.set('views','./views')
app.set('view engine','pug')
app.set('view engine','ejs')

app.get('/testp',(req,res)=>{
    res.render('testp.pug');
})


server.listen(PORT,()=>{
    console.log('Listening on port: '+PORT);
})