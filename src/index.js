const express = require('express')
const lg = require('lgpio')
const visitCount = require('express-visitor-counter')
const app = express()
const port = 3000
const LED = 23
let swtch = 0
counters = {}

app.use(visitCount({hook:counterId => counters[counterId] = (counters[counterId] || 0)+1}))
app.get('/', (req,res)=>{

  h = lg.gpiochipOpen(0)
  let count
  lg.gpioClaimOutput(h,LED)
  switch(swtch){
    case 0:
      swtch = 1
      break 
    case 1:
      swtch = 0 
      break 
  }
  if(swtch===0){
    lg.gpioWrite(h, LED, 0)
    for(let [key,value] of Object.entries(counters)){
      count = value
    }
    res.send(`<b>sam visitor:${count}; LED off</b>`)

  } else {
    lg.gpioWrite(h, LED, 1)
    for(let [key,value] of Object.entries(counters)){
      count = value
    }
    res.send(`<b>sam visitor:${count}; LED on</b>`)
  }

  lg.gpioFree(h,23)
  lg.gpiochipClose(h)
})

app.listen(port,()=>{
  console.log(`todo esta bien; usando puerto:${port}`)
})

