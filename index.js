const jsonServer = require('json-server')
const server = jsonServer.create()
const bodyParser = require('body-parser');
const fs = require('fs');
const sortJsonArray = require('sort-json-array');
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 4000

server.use(jsonServer.bodyParser)
server.use(bodyParser.urlencoded({ extended: true }));
server.use(middlewares)
server.get('/scenarios', (request, response) => {
    if (request.method === 'GET') {
        const dataPath = './data/data.json';
        let sortField = request.query.sortField;
        let sortFieldOrder = request.query.sortOrder;
        console.log(sortField);
        let sortOrder = '';
        sortFieldOrder == -1 ? sortOrder='des' : sortOrder='asc';
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            } 
            let scenarioData = JSON.parse(data); 
            let sortscenarioData = sortJsonArray(scenarioData, sortField, sortOrder);     
            response.send(sortscenarioData);
        });      
    }
   })

server.listen(port, () => {
 console.log('JSON Server is running')
})