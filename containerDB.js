const fs=require('fs')

class Contenedor {
constructor(nombreTabla,nombreBD){
    this.BD=nombreBD
    this.tabla=nombreTabla
    this.data=[]
    
    try{
        console.log('Initializing...')
        this.init()
    }
    catch(error){
        console.log(`Error initializing ${error}`)

    }
} 


async init(){
    this.data=await this.getAll()

}

async getAll() {
    const options=require(`./options/${this.BD}`)
    const knex=require('knex')(options)
    try{
        const result = knex
            .select('*')
            .from(this.tabla)
            return result  
    }
    catch (error){
        console.log(error)
    }  
   
}


}

module.exports=Contenedor





