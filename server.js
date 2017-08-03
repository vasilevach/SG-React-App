const path = require('path');
const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, 'dist');

var data = {
  "products" : [
        {
            "name" : "TV",
            "price" : 1000,
            "currency" : "USD"
        },
        {
            "name" : "SSD",
            "price" : 100,
            "currency" : "USD"
        },
    ]
};


app.use(express.static(dist));
app.use(cors());
app.use( bodyParser.json() );

app.get('/', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.get('/api/products', (req, res) => {
  res.send(data);
});

app.delete('/api/product/:name', (req, res) => {
  data.products = data.products.filter(function(product) {
    return product.name !== req.params.name;
  });
  res.send(data);
});

app.post('/api/product/:name', (req, res) => {

  data.products.push(req.body)
  res.send(req.body);
});

app.put('/api/product/:name', (req, res) => {

  for(let i = 0; i < data.products.length; i++) {
    if(data.products[i].name == req.params.name) {
      data.products[i] = req.body;
      break;
    }
  }

  res.send(req.body);
});

app.get('/api/permissions', (req, res) => {
  res.send({
        "permissions" : ['CREATE','READ','UPDATE','DELETE']
  });
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.info('Express is listening on port %s.', port);
});
