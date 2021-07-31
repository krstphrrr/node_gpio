const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
mongoose
 .connect(
  'mongodb://rootuser:example@mongo:27017',
  {
    useNewUrlParser:true,
    useFindAndModify:false
  }
 )
 .then(()=>console.log('mongodb connected'))
 .catch(err=>console.log(err))

 const PinSchema = mongoose.Schema({
   red: Boolean,
   yellow: Boolean,
   green: Boolean
 }) 
const Pins = mongoose.model('pins', PinSchema)

const pin = new Pins({red:false, yellow:false, green:false})
pin.save(function(err,pin){
  if(err) return console.error(err)
})

const lg = require('lgpio')

const app = express()
const port = 3000


var corsOptions = {
  origin: ['https://samimaldita.tk','http://localhost:3000'],
  methods: ['GET','POST'],
  optionsSuccessStatus: 200 
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
app.get('/', async (req,res)=>{
  
  res.status(200).send("please visit endpoints: '/red', '/yellow' or '/green'.")
})

app.get('/:pin/:toggle',cors(corsOptions), async (req,res)=>{
  console.log(req.params)
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
      switch(req.params.pin){
        case 'red':
          await Pins.findOneAndUpdate(
            {red: false},
            {red: true},
            {
              new: true, 
              useFindAndModify: false
            }
          )
          .then(success=>console.log(success))
          .catch(err=>console.log(err))
          break
        case 'yellow':
          await Pins.findOneAndUpdate(
            {yellow: false},
            {yellow: true},
            {
              new: true, 
              useFindAndModify: false
            }
          )
          .then(success=>console.log(success))
          .catch(err=>console.log(err))
          break
        case 'green':
          await Pins.findOneAndUpdate(
            {green: false},
            {green: true},
            {
              new: true, 
              useFindAndModify: false
            }
          )
          .then(success=>console.log(success))
          .catch(err=>console.log(err))
          break
      }
      
      break;
    case 0:
      turnItOff(actuator)
      switch(req.params.pin){
        case 'red':
          await Pins.findOneAndUpdate(
            {red: true},
            {red: false},
            {
              new: true, 
              useFindAndModify: false
            }
          )
          .then(success=>console.log(success))
          .catch(err=>console.log(err))
          break
        case 'yellow':
          await Pins.findOneAndUpdate(
            {yellow: true},
            {yellow: false},
            {
              new: true, 
              useFindAndModify: false
            }
          )
          .then(success=>console.log(success))
          .catch(err=>console.log(err))
          break
        case 'green':
          await Pins.findOneAndUpdate(
            {green: true},
            {green: false},
            {
              new: true, 
              useFindAndModify: false
            }
          )
          .then(success=>console.log(success))
          .catch(err=>console.log(err))
          break
      }
      break;
  }
  console.log("freeing device")
  console.log("closing chip")
  res.status(200).send()

})



app.get('/pinstatus',cors(corsOptions),async (req,res)=>{
  console.log("TOUCHED")
  let statusObj = {}
  await Pins.find({_id: '610597b6d83b3d61447644f0'})
  .then(e=>{
    statusObj['red'] = e[0]['red']
    statusObj['yellow'] = e[0]['yellow']
    statusObj['green'] = e[0]['green']
    res.send(statusObj)
  })
  // console.
  // const statusObj = await iterLED()
  
})
const filtering = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate))

// function iterLED(){
//   handle = lg.gpiochipOpen(0)
//   let statCopy = Object.assign(status)
//   if(handle){
//     for(const [key,value] of Object.entries(ledPinout)){
//       console.log(key)
//       lg.gpioClaimOutput(handle,ledPinout[key])
//       switch(lg.gpioRead(handle,ledPinout[key])){
//         case 1:
//           statCopy[key] = true;
//           break;
//         case 0:
//           statCopy[key] = false;
//           break;
//       }
//       lg.gpioFree(handle,ledPinout[key])
//     }
//     lg.gpiochipClose(handle)
//     return statCopy
//   }
// }


app.listen(port,()=>{
  console.log(`todo esta bien; usando puerto:${port}`)
})

