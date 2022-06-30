const options=require('./options/db_sqlite')
const knex=require('knex')(options)

knex.schema.createTable('mensajesDB',table=>{
    table.increments('id')
    table.string('username')
    table.integer('text')
})

.then(()=>console.log("table created"))
.catch(err=>{console.log(err);throw err})
.finally(()=>{
    knex.destroy()
})