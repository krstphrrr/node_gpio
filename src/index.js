const express = require('express')
const lg = require('lgpio')
const app = express()
const port = 3000
const LED = 23
let swtch = 0
app.get('/', (req,res)=>{
  h = lg.gpiochipOpen(0)
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
    
    console.log("cabrona no")
    lg.gpio_write(h, LED, 0)
    res.send("cabrona no")
  } else {
    console.log("cabrona si")
    lg.gpio_write(h, LED, 1)
    res.send("cabrona si")
  }

  // h = lg.gpiochipOpen(0)
  // lg.gpioClaimOutput(h,LED)


})

app.listen(port,()=>{
  console.log(`todo esta bien; usando puerto:${port}`)
})

