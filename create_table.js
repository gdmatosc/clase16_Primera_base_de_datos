console.log('CreateT.Step0');
const options=require('./options/db')
const knex=require('knex')(options)
//console.log('CreateT.Step1');
knex.schema.createTable('productosT',table=>{
    table.increments('id')
    table.string('title')
    table.string('thumbnail')
    table.integer('price')
    //console.log('CreateT.Step2')
})

    .then(()=>console.log("table created"))
    .catch(err=>{
        //console.log('CreateT.Step3')
        console.log(err);throw err})
    .finally(()=>{
    //console.log('CreateT.Step4')
    knex.destroy()
})