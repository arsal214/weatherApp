const http = require('http');
const fs = require('fs');
const requests = require('requests')

const homeFile = fs.readFileSync("index.html","utf-8");

const replaceVal =(tempVal,orgVal) =>{
    // {%tempVal%}
    let temperature = tempVal.replace("{%tempVal%}",orgVal.main.temp)
    return temperature
}

const server = http.createServer((req,res) => {
if (req.url == '/'){
    requests('https://api.openweathermap.org/data/2.5/weather?q=London&appid=ec027b10210bbf29ed1eb80d9e843cc9' )
        .on('data', function (chunk) {
            const  objData = JSON.parse(chunk);
            const arrayData = [objData]
            console.log(arrayData[0].main.temp)
            const realtdata = arrayData.map((val) => replaceVal(homeFile,val)).join("");
            res.write(realtdata);
            console.log(realtdata)

        })
        .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            console.log('end');
            res.end();
        });
}
})

server.listen(3000,"127.0.0.1",()=>{
    console.log('listening port number on port')
})