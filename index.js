const http = require('http') // Untuk membuat server
const fs = require('fs') // File System : Digunakan untuk membaca data dari sebuah file 
const url = require('url') // Untuk memanipulasi request url yang dikirim oleh user
const PORT = 3001 // Alamat Port : Menjadi lokasi jalannya aplikasi Node JS kita nantinya

const server = http.createServer((req, res) => {

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Method": "GET, POST, PUT, PATCH, DELETE"
    }
    
    if(req.url == '/products'){
        if(req.method == 'GET'){
            // Step1. Get data products
            let products = fs.readFileSync('./data/products.json')

            res.writeHead(200, 'Get Products Success!', headers)
            res.end(products)
        }else if(req.method == 'POST'){
            let body = [] // Variable untuk menampung data yg dikirim oleh frontend
            
            // Step1. Get data products
            let products = JSON.parse(fs.readFileSync('./data/products.json')) // Karakter fs, dia akan mengambil file dan dikonversi dalam bentuk string. Karena masih dalam bentuk string, kita konversi menjadi JSON parse untuk kebutuhan push data dari req.body

            req.on('data', (data) => { // 1.1. Data yang diterima masih dalam bentuk buffer byte
                body.push(data)
            }).on('end', () => {
                body = Buffer.concat(body).toString() // 1.2. Karena datanya masih dalam bentuk buffer, kita konversi dalam bentuk string
                body = JSON.parse(body) // 1.3. Kita konversi dalam bentuk JSON ---> Untuk kebutuhan push data kedalam variabel products
                products.push(body)

                fs.writeFileSync('./data/products.json', JSON.stringify(products))
                res.writeHead(200, 'Post Products Success!', headers)
                res.end(fs.readFileSync('./data/products.json'))
            })
        }
    }else if(req.url.includes('?')){
        if(req.method == 'PUT'){
            // 
        }else if(req.method == 'PATCH'){
            const queryUrl = url.parse(req.url, true).query
            const queryId = parseInt(queryUrl.id) 
            
            // Step1. Get Data Products
            let products = JSON.parse(fs.readFileSync('./data/products.json'))
            let body = []

            req.on('data', (data) => {
                body.push(data)
            }).on('end', () => {
                body = Buffer.concat(body).toString()
                body = JSON.parse(body)

                let idx = products.findIndex(value => value.id == queryId)
       
                products[idx].name = body.name 
                products[idx].price = body.price 

                fs.writeFileSync('./data/products.json', JSON.stringify(products))
                res.writeHead(201, 'Update Product Success!', headers)
                res.end(fs.readFileSync('./data/products.json'))

            })
        }else if(req.method == 'DELETE'){
            // 
        }
    }else{
        res.writeHead(404, 'Request Not Found!', headers)
        res.end('')
    }
})

server.listen(PORT, () => console.log('Server Running on PORT' + PORT))



// Nodemon ---> npm install -g nodemon ---> nodemon index.js 