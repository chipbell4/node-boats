var Cylon = require('cylon')

var MAX_ROT = 7

function clamp(min, x, max) {
  return Math.min(max, Math.max(min, x))
}

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
      var boat = require('./initboat')

      my.sphero.on('connect', function() {
          my.sphero.configureLocator(0, 0, 0, 0)
          my.sphero.startCalibration()
          setTimeout(function() {
              my.sphero.finishCalibration()
              my.sphero.setBackLED(1)
              my.sphero.setStabilization(false)
              my.sphero.setAccelerometerRange(3)
              my.sphero.detectLocator()
              my.sphero.stop()
            }, 1000)
        })

      var blink = true
      every((.25).second(), function() {
          blink = !blink
          my.sphero.setColor(blink ? 'orange' : 'green')
        })

      my.sphero.on('locator', function(data) {
          var dir = clamp(-MAX_ROT, data[0], MAX_ROT)
          var angle = Math.PI * dir / MAX_ROT
          var speed = 1
          console.log('STEERO!', speed, angle)
          b.forward(speed, angle)
        })
    }
}).start()
