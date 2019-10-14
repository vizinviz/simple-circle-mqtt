var temperature = 0;
var r = 0;



function setup () {
  createCanvas(800, 600);

  var client = mqtt.connect('mqtt://aeba5ae7:98e21bb6bccdb957@broker.shiftr.io', {
    clientId: 'vizinviz-simple-circle'
  });
  console.log('client', client);

  client.on('connect', function () {
    console.log('client has connected!');
    client.subscribe('/temperature');
  });

  client.on('message', function (topic, message) {
    console.log('new message:', topic, message.toString());
    temperature = +message.toString();

  });
}


function draw () {
  background(255);

  var targetR = map(temperature,20,30,0,300);
  r = ease(r,targetR);
  ellipse(width/2,height/2,r);
}

function ease (n, target) {
  var easing = 0.05;
  var d = target - n;
  return n + d * easing;
}
