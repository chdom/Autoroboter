var five = require("johnny-five");

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3010);

app.use(express.static('public'));







/**
             -y
             |
             |
             |
-x -------------------- +x
             |
             |
             |
             +y
*/
io.on('connection', function (socket)
{
  var left, right;
  var board = new five.Board();
  board.on("ready", function()
  {
    right = new five.Servo.Continuous(10).stop();
    left = new five.Servo.Continuous(9).stop();

    socket.on('move', servoController);
  });
});






function servoController(pData)
{
    var x = pData.x;
    var y = pData.y;

    if(x==0 && y==0){
      //stop
      right.stop();
      left.stop();
      console.log('stop');
    }
    else if (x>0 && Math.abs(y)<15) {
      // turn to right
      right.cw();
      left.cw();
      console.log('turn right');
    }
    else if (Math.abs(x)<15 && y>0) {
      // go back
      right.cw();
      left.ccw();
      console.log('go back');
    }
    else if (Math.abs(x)<15 && y<0) {
      // forward
      right.ccw();
      left.cw();
      console.log('forward');
    }
    else if (x<0 && Math.abs(y)<15) {
      // turn left
      right.ccw();
      left.ccw();
      console.log('tur left');
    }
}
