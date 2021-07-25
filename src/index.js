const express = require('express')
const lg = require('lgpio')
const visitCount = require('express-visit-counter')
const app = express()
const port = 3000
const LED = 23
let swtch = 0

app.get('/', async (req,res)=>{

  h = lg.gpiochipOpen(0)
  let total = await visitCount.getCount()
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
    res.send(`<b>sam visitor:${total}; LED off</b>`)

  } else {
    
    lg.gpioWrite(h, LED, 1)
    res.send(`<b>sam visitor:${total}; LED on</b>`)
  }

  lg.gpioFree(h,23)
  lg.gpiochipClose(h)
})

app.listen(port,()=>{
  console.log(`todo esta bien; usando puerto:${port}`)
})

