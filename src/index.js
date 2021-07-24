const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res)=>{
  res.send("cabrona")
})

app.listen(port,()=>{
  console.log(`todo esta bien; usando puerto:${port}`)
})