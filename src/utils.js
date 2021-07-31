const lg = require('lgpio')

let ledPinout = {
  "red":23,
  "yellow": 21,
  "green": 20
}

let iterLED = (handle,status) =>{
  if(handle){
    for(let i of Object.keys(ledPinout)){
      lg.gpioClaimOutput(handle,ledPinout[i])
      switch(lg.gpioRead(handle,ledPinout[i])){
        case 1:
          status[i] = true;
          break;
        case 0:
          status[i] = false;
          break;
      }
      lg.gpioFree(handle,ledPinout[i])
    }
    lg.gpiochipClose(handle)
    return this.status
  }
}

exports.turnItOn =(pin)=>{
  h = lg.gpiochipOpen(0)
  lg.gpioClaimOutput(h,pin)
  lg.gpioWrite(h, pin, 1)
  lg.gpioFree(h,pin)
  lg.gpiochipClose(h)
};

exports.turnItOff=(pin)=>{
  h = lg.gpiochipOpen(0)
  lg.gpioClaimOutput(h,pin)
  lg.gpioWrite(h, pin, 0)
  lg.gpioFree(h,pin)
  lg.gpiochipClose(h)
}

module.exports = ledPinout
module.exports = iterLED