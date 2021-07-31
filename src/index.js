const express = require('express')
const cors = require('cors')
const lg = require('lgpio')
const visitCount = require('express-visitor-counter')
// const {turnItOn, turnItOff} = require('./utils')
const app = express()
const port = 3000


let status = {"red":false,"yellow":false,"green":false}
let ledPinout = {
  "red":23,
  "yellow": 20,
  "green": 21
}

var corsOptions = {
  origin: 'https://samimaldita.tk',
  methods: ['GET','POST'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const turnItOn =(pin)=>{
  h = lg.gpiochipOpen(0)
  lg.gpioClaimOutput(h,pin)
  lg.gpioWrite(h, pin, 1)
  lg.gpioFree(h,pin)
  lg.gpiochipClose(h)
};

const turnItOff=(pin)=>{
  h = lg.gpiochipOpen(0)
  lg.gpioClaimOutput(h,pin)
  lg.gpioWrite(h, pin, 0)
  lg.gpioFree(h,pin)
  lg.gpiochipClose(h)
}


app.use(express.json());
app.use(cors())

// app.use(visitCount({hook:counterId => counters[counterId] = (counters[counterId] || 0)+1}))
app.get('/', (req,res)=>{
  res.status(200).send("please visit endpoints: '/red', '/yellow' or '/green'.")
})

app.post('/red',cors(corsOptions), (req,res)=>{
  console.log(req.body)
  h = lg.gpiochipOpen(0)
  if(req.body['red']){
    turnItOn(ledPinout['red'])
    status['red'] = true
    // res.status(200).send("ok")
  } else {
    turnItOff(ledPinout['red'])
    status['red'] = false
    // res.status(200).send("ok")
  }
  // switch(req.body["red"]){
  //   case true:
  //     // turnItOn(ledPinout['red'])
  //     status['red'] = false
      
  //     lg.gpioClaimOutput(h,ledPinout['red'])
  //     lg.gpioWrite(h, ledPinout['red'], 1)
  //     lg.gpioFree(h,ledPinout['red'])
  //     lg.gpiochipClose(h)
      
  //     break
  //   case false:
  //     // turnItOff(ledPinout['red'])
  //     status["red"] = true
  //     lg.gpioClaimOutput(h,ledPinout['red'])
  //     lg.gpioWrite(h, ledPinout['red'], 0)
  //     lg.gpioFree(h,ledPinout['red'])
  //     lg.gpiochipClose(h)
  //     break;
  // }

})

app.post('/yellow',cors(corsOptions),(req,res)=>{
  console.log(req.body)
  switch(req.body["yellow"]){
    case true:
      turnItOn(ledPinout['yellow'])
      status['yellow'] = false
      break
    case false:
      turnItOff(ledPinout['yellow'])
      status["yellow"] = true
      break;
  }
})

app.post('/green',cors(corsOptions),(req,res)=>{
  console.log(req.body, status)
  switch(req.body["green"]){
    case true:
      turnItOn(ledPinout['green'])
      status['green'] = false
      break
    case false:
      turnItOff(ledPinout['green'])
      status["green"] = true
      break;
  }
})


app.get('/pinstatus',cors(corsOptions),async (req,res)=>{
  console.log("TOUCHED")
  // res.send(status)
  h = lg.gpiochipOpen(0)
  let statusObj = await iterLED(h)
  res.send(statusObj)
})

function iterLED(handle){
  let statCopy = Object.assign(status)
  if(handle){
    for(const [key,value] of Object.entries(ledPinout)){
      console.log(key)
      lg.gpioClaimOutput(handle,ledPinout[key])
      switch(lg.gpioRead(handle,ledPinout[key])){
        case 1:
          statCopy[key] = true;
          break;
        case 0:
          statCopy[key] = false;
          break;
      }
      lg.gpioFree(handle,ledPinout[key])
    }
    lg.gpiochipClose(handle)
    return statCopy
  }
}


app.listen(port,()=>{
  console.log(`todo esta bien; usando puerto:${port}`)
})

