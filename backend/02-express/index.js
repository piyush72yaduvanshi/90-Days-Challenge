import express from "express";

const app = express();


app.use(express.json())

let data = []
let nextId = 1
let payment = null

// POST TEA
app.post("/tea",(req,res)=>{
    const {name, price} = req.body
    const newTea = {
        id: nextId++,
        name,
        price,
        payment: payment
    }
    data.push(newTea)
    res.status(201).send(newTea)
})
//GET ALL TEA
app.get("/tea", (req, res) => {
    res.status(200).send(data);
});
// GET TEA BY ID
app.get('/tea/:id', (req, res) => {
    const teas =data.find(tea => tea.id === parseInt(req.params.id))
    if (teas) {
        res.status(200).send(teas)
    } else {
        res.status(404).send("Tea not found")
        
    }
})
//UPADTE TEA
app.put('/tea/:id', (req, res) => {
    const teas = data.find(tea => tea.id === parseInt(req.params.id))
    if (teas) {
        teas.name = req.body.name
        teas.price = req.body.price
        res.status(200).send(teas)
    } else {
        res.status(404).send("Tea not found")
    }
})
// DELETE TEA
app.delete('/tea/:id', (req, res) => {
    const index = data.findIndex(tea => tea.id === parseInt(req.params.id))
    if (index !== -1) {
        data.splice(index, 1)
        res.status(200).send("Tea deleted")
    } else {
        res.status(404).send("Tea not found")
    }
})
// POST PAYMENT
app.post("/payment/:id",(req,res)=>{
    const {amount} = req.body
    const id = parseInt(req.params.id)
    const tea = data.find(tea => tea.id === id)
    if (tea) {
        tea.payment = amount
        res.status(200).send(tea)
    } else {
        res.status(404).send("Tea not found")
    }
})
// get payment
app.get('/payment/:id', (req, res) => {
    const teas =data.find(tea => tea.id === parseInt(req.params.id))
    if (teas) {
        res.status(200).send(teas)
    } else {
        res.status(404).send("Tea not found")
        
    }
})
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});