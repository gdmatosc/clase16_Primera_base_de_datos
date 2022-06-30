console.log('socket ui')
//const options=require('../options/db_sqlite');
const socket=io.connect();


const render=(data)=>{
    const html=data.map((element,index)=>{
        return(`
            <div>
                <strong>${element.username}</strong> 
                <em>${element.text} </em>
            </div>
        `)
    }).join('');
    document.getElementById('messages').innerHTML=html;
}

socket.on('messages',(messages)=>{
    console.log(messages);
    render(messages);
}) 


const addMessage=()=>{
    const message={
        username: document.getElementById('username').value,
        text: document.getElementById('text').value
    };
    const a=[];
    
    /*const knex=require('knex')(options);
    */
    socket.emit('new-message',message);
    
    /*knex('productosT').insert({username,text})
        .then(()=>console.log("data inserted"))
        .catch(err=>console.log(err))
        .finally(()=>knex.destroy())*/
    return false
}



const element=document.getElementById('form')

element.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    //addMessage();
    //console.log('submit')
});





