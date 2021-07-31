const lg = require('lgpio')

let ledPinout = {
  "red":23,
  "yellow": 21,
  "green": 20
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
