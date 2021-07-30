const express = require('express')
const lg = require('lgpio')
const visitCount = require('express-visitor-counter')
const app = express()
const port = 3000
const RED = 23
const YELLOW = 20
const GREEN = 21
let swtch = 0
counters = {}
let count

app.use(visitCount({hook:counterId => counters[counterId] = (counters[counterId] || 0)+1}))
app.get('/', (req,res)=>{
  res.send("please visit endpoints: '/red', '/yellow' or '/green'.")
})

app.get('/red',(req,res)=>{
  h = lg.gpiochipOpen(0)
  
  lg.gpioClaimOutput(h,RED)
  switch(swtch){
    case 0:
      swtch = 1
      break 
    case 1:
      swtch = 0 
      break 
  }
  if(swtch===0){
    lg.gpioWrite(h, RED, 0)
    for(let [key,value] of Object.entries(counters)){
      count = value
    }
    console.log(count)
    res.send(`<b>sam visitor:${count}; LED off</b>`)

  } else {
    lg.gpioWrite(h, RED, 1)
    for(let [key,value] of Object.entries(counters)){
      count = value
    }
    console.log(count)
    res.send(`<b>sam visitor:${count}; LED on</b>`)
  }

  lg.gpioFree(h,RED)
  lg.gpiochipClose(h)
})

app.get('/yellow',(req,res)=>{
  h = lg.gpiochipOpen(0)
  
  lg.gpioClaimOutput(h,YELLOW)
  switch(swtch){
    case 0:
      swtch = 1
      break 
    case 1:
      swtch = 0 
      break 
  }
  if(swtch===0){
    lg.gpioWrite(h, YELLOW, 0)
    for(let [key,value] of Object.entries(counters)){
      count = value
    }
    console.log(count)
    res.send(`<b>sam visitor:${count}; LED off</b>`)

  } else {
    lg.gpioWrite(h, YELLOW, 1)
    for(let [key,value] of Object.entries(counters)){
      count = value
    }
    console.log(count)
    res.send(`<b>sam visitor:${count}; LED on</b>`)
  }

  lg.gpioFree(h,YELLOW)
  lg.gpiochipClose(h)
})

app.get('/green',(req,res)=>{
  h = lg.gpiochipOpen(0)

  lg.gpioClaimOutput(h,GREEN)
  switch(swtch){
    case 0:
      swtch = 1
      break 
    case 1:
      swtch = 0 
      break 
  }
  if(swtch===0){
    lg.gpioWrite(h, GREEN, 0)
    for(let [key,value] of Object.entries(counters)){
      count = value
    }
    console.log(count)
    res.send(`<b>sam visitor:${count}; LED off</b>`)

  } else {
    lg.gpioWrite(h, GREEN, 1)
    for(let [key,value] of Object.entries(counters)){
      count = value
    }
    console.log(count)
    res.send(`<b>sam visitor:${count}; LED on</b>`)
  }

  lg.gpioFree(h,GREEN)
  lg.gpiochipClose(h)
})


app.listen(port,()=>{
  console.log(`todo esta bien; usando puerto:${port}`)
})

