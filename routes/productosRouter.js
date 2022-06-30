const { Router }=require('express');

const Container=require('../container');
const productos= new Container('productos.txt');
const Container1=require('../containerDB');
const productosDB= new Container1('productosT','db');

productos.init();
productosDB.init();

const router=Router();

const messages1=[
    {username:'DanteX',text:'Test1'}
];

router.get('/ejs', (req, res) => {
    res.render('teste.ejs', { productosDB});
    console.log("StepM1")
    const messages=[
        {author:'Juan',text:'Hola Que tal'},
        {author:'Pedro',text:'Muy bien'},
        {author:'Ana',text:'Genial'}
    ];
    
    req.io.on('connection',(socket)=>{
        console.log('User conectado, id:'+socket.id);
        socket.emit('messages',messages1);
        socket.on('new-message',(newMessage)=>{
            console.log({newMessage});
            messages1.push(newMessage);
            req.io.sockets.emit('messages',messages1);
            const {username,text}=newMessage;
            const options=require('../options/db_sqlite')
            const knex=require('knex')(options)
            knex('mensajesDB').insert({username,text})
                .then(()=>console.log("data inserted"))
                .catch(err=>console.log(err))
                .finally(()=>knex.destroy())
        })
        

    })
    
});

router.post('/',async(req,res)=>{
    
    const {title,thumbnail,price}=req.body;
    if(!title || !thumbnail || !price){
        return res.status(400).send({error: 'Los datos están incompletos'});
    }

    
    knex('productosT').insert({title,thumbnail,price})
        .then(()=>console.log("data inserted"))
        .catch(err=>console.log(err))
        .finally(()=>knex.destroy())
    return res.send({message:'Producto agregado existosamente'})
})

router.put('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        const {field,value}=req.body;
        await productos.editById(Number(id),field,value);
        res.send({message:`El producto con id ${id} se modificó exitosamente`})

    }catch(error){
        throw error
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        await productos.deleteById(Number(id));
        res.send({message:`El producto con id ${id} se borró exitosamente`})

    }catch(error){
        throw error
    }
})



module.exports=router;
