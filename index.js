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

    console.log(req.url)
    
    if(req.url == '/products'){
        if(req.method == 'GET'){
            // Step1. Get data products
            let products = fs.readFileSync('./data/products.json')

            res.writeHead(200, 'Get Products Success!', headers)
            res.end(products)
        }else if(req.method == 'POST'){
            // 
        }else if(req.method == 'PUT'){
            // 
        }else if(req.method == 'PATCH'){
            // 
        }else if(req.method == 'DELETE'){
            // 
        }
    }else{
        res.writeHead(404, 'Request Not Found!', headers)
        res.end('')
    }
})

server.listen(PORT, () => console.log('Server Running on PORT' + PORT))