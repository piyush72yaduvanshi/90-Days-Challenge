import express from "express";
import 'dotenv/config'
import logger from "./logger.js";
import morgan from "morgan";

const app = express();

app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

const port = process.env.PORT||3000;

let dataTea = [{
    id: 1,
    name: "Ice-Tea",
    price: 100,
}];
let idxId = 2;
let order = [
    {
        id: 1,
        teaName: "Ice-Tea",
        teaPrice: 100,
        payment: false
    },
];
let orderId = 2;

//post tea
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: idxId++,
    name,
    price,
  };
  dataTea.push(newTea);
  res.status(201).send(dataTea);
});

//get tea
app.get("/tea", (req, res) => {
    logger.info("Get All tea request by the user")
  res.status(201).send(dataTea);
});

//get by id
app.get("/tea/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const tea = dataTea.find(t=>t.id===id)
    if(tea){
       return res.status(201).send(tea);
    }else{
       return res.status(404).send("404 Not found")
    }
})

//update by id
app.put("/tea/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {name,price} = req.body
    const tea = dataTea.find(t=>t.id===id)
    if(tea){
        tea.name = name
        tea.price = price 
        return res.status(201).send(tea)
    }else{
        return res.status(404).send("404 Not found")
    }
})
//delete by id
app.delete("/tea/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const index = dataTea.findIndex(t=>t.id===id)
    console.log(index)
    if (index !== -1) {
        dataTea.splice(index,1)
        return res.status(201).send("Delete Success")
    }else{
        return res.status(404).send("404 Not found")
    }
})
//post order tea
app.post("/tea-order",(req,res)=>{
    const {teaName,teaPrice,payment} = req.body
    const orderTea = {
        id:orderId++,
        teaName,
        teaPrice,
        payment
    }
    order.push(orderTea);
    res.status(201).send(orderTea)

})
//get order
app.get("/tea-order",(req,res)=>{
    res.status(201).send(order)
})

// update by id
app.put("/tea-order/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {teaName,teaPrice,payment} = req.body
    const tea = order.find(t=>t.id===id)
    if(tea){
        tea.teaName = teaName
        tea.teaPrice = teaPrice
        tea.payment = payment
        return res.status(201).send(tea)
    }else{
        return res.status(404).send("404 Not found")
    }
})

//delete by id
app.delete("/tea-order/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const index = order.findIndex(t=>t.id===id)
    console.log(index)
    if (index !== -1) {
        order.splice(index,1)
        return res.status(201).send("Delete Success")
    }else{
        return res.status(404).send("404 Not found")
    }
})
//get order by order
app.get("/tea-order/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const tea = order.find(t=>t.id===id)
    if(tea){
       return res.status(201).send(tea);
    }else{
       return res.status(404).send("404 Not found")
    }
})

app.get("/", (req, res) => {
  res.status(200).send("Server working");
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
