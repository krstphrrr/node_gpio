const express = require('express')
const cors = require('cors')
const lg = require('lgpio')
const visitCount = require('express-visitor-counter')
const {turnItOn, turnItOff} = require('./utils')
const app = express()
const port = 3000

counters = {}
let ledPinout = {
  "red":23,
  "yellow": 21,
  "green": 20
}
let status = {"red":false,"yellow":false,"green":false}

app.use(express.json());
app.use(cors())

app.use(visitCount({hook:counterId => counters[counterId] = (counters[counterId] || 0)+1}))
app.get('/', (req,res)=>{
  res.status(200).send("please visit endpoints: '/red', '/yellow' or '/green'.")
})

app.post('/red',(req,res)=>{
  console.log(req.body)
  switch(req.body["red"]){
    case true:
      turnItOn(ledPinout['red'])
      status['red'] = !status['red']
      break
    case false:
      turnItOff(ledPinout['red'])
      status["red"] = !status['red']
  }

})

app.post('/yellow',(req,res)=>{
  console.log(req.body)
  switch(req.body["yellow"]){
    case true:
      turnItOn(ledPinout['yellow'])
      status['yellow'] = !status['yellow']
      break
    case false:
      turnItOff(ledPinout['yellow'])
      status["yellow"] = !status['yellow']
  }
})

app.post('/green',(req,res)=>{
  console.log(req.body)
  switch(req.body["green"]){
    case true:
      turnItOn(ledPinout['green'])
      status['green'] = !status['green']
      break
    case false:
      turnItOff(ledPinout['green'])
      status["green"] = !status['green']
  }
})


app.get('/pinstatus',(req,res)=>{
  console.log("TOUCHED")
  // res.send(status)
  h = lg.gpiochipOpen(0)
  let statusObj = iterLED(h)
  res.send(statusObj)
})

function iterLED(handle){
  // let statCopy = Object.assign(status)
  if(handle){
    for(const [key,value] of Object.entries(ledPinout)){
      console.log(key)
      lg.gpioClaimOutput(handle,ledPinout[key])
      switch(lg.gpioRead(handle,ledPinout[key])){
        case 1:
          status[key] = true;
          break;
        case 0:
          status[key] = false;
          break;
      }
      lg.gpioFree(handle,ledPinout[key])
    }
    lg.gpiochipClose(handle)
    return status
  }
}


app.listen(port,()=>{
  console.log(`todo esta bien; usando puerto:${port}`)
})

module.exports = status