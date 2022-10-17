const fs = require('fs')

class Contenedor {
    constructor(name) {
        this.name = name
        this.create()
    }
    
    async create() {
        try {
            await fs.promises.writeFile(`./${this.name}.txt`, "[]")
            console.log('container creado')
        } catch(error) {
            console.log(error)
        }
    }


    async save(producto){
        try {
        const productos = await fs.readFile(`./${this.name}.txt`, 'utf-8')
        const parsedProductos = JSON.parse(productos)
        let idMax = 0
        if(parsedProductos.length == 0){
            Object.assign(producto, {
                id: 1
            })
            parsedProductos.push(producto)
            await fs.writeFile(`./${this.name}.txt`, JSON.stringify(parsedProductos, null, 2))
            return 1
        }else{
            parsedProductos.forEach(i => {
                if(i.id > idMax){
                    idMax = i.id
                }
            })
            Object.assign(producto, {
                id: idMax + 1
            })
            parsedProductos.push(producto)
            fs.writeFileSync(`./${this.name}.txt`, JSON.stringify(parsedProductos, null, 2))
            return (idMax + 1)
        }
    }catch(err){
        console.log(err)
    }}


    async getById(Number) {
        try {
            const data = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            let dataP = JSON.parse(data);
            let resultado = dataP.filter(producto => producto.id === Number)
            console.log(resultado);

        } catch(err) {
            console.log(err)
        }
    }


    async getAll() {
        try {
            const data = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            let dataP = JSON.parse(data);
            console.log(dataP)

        }catch(err) {
            console.log(err)
        }
    }


    async deleteById(Number){
        try {
            let newArray = []
            const data = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            let dataP = JSON.parse(data);
            let resultado = dataP.filter(producto => producto.id /= Number)
            newArray.push(resultado)
            fs.promises.writeFile(`./${this.name}.txt`,JSON.stringify(resultado))

        }catch(err) {
            console.log(err)
        }
    }


    async deleteAll() {
        try {
            fs.promises.writeFile(`./${this.name}.txt`, '')
        }catch(err) {
            console.log(err)
        }
    }

}

const contenedor1 = new Contenedor('productos')

contenedor1.save({
    name: "Libro2",
    price: 22.32
})