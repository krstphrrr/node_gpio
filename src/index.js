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
  origin: ['https://samimaldita.tk','http://localhost:3000'],
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

app.get('/:pin/:toggle',cors(corsOptions), (req,res)=>{
  // console.log(req.params)
  let actuator
  switch(req.params.pin){
    case "red":
      actuator = 23
      break;
    case "yellow":
      actuator = 20
      break;
    case "green":
      actuator = 21
      break;
  }

  switch(parseInt(req.params.toggle)){
    case 1:
      turnItOn(actuator)
      break;
    case 0:
      turnItOff(actuator)
      break;
  }
  console.log("freeing device")
  console.log("closing chip")
  res.status(200).send()

})



app.get('/pinstatus',cors(corsOptions),async (req,res)=>{
  console.log("TOUCHED")
  const statusObj = await iterLED()
  res.send(statusObj)
})

function iterLED(){
  handle = lg.gpiochipOpen(0)
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

