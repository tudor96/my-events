var mqtt = require('mqtt')
var url = require('url')
let logging = require(__dirname+"/logging.js")


var mqtt_url = url.parse("mqtt://giruzqus:0WSzZTInshqj@farmer.cloudmqtt.com:10472");
var auth = (mqtt_url.auth || ':').split(':');

// Create a client connection
var client = mqtt.connect(mqtt_url, {
  username: auth[0],
  password: auth[1]
});

function connect() {
  client.on('connect', function() { // When connected

    // subscribe to a topic
    client.subscribe('api/mqtt/test', function() {
      // when a message arrives, do something with itd
      logging.LOG("Listening to Server MQTT api/mqtt/test")
      client.on('message', function(topic, message, packet) {
        logging.LOG("Received '" + logging.textColor.Blue +message + logging.textColor.Green+ "' on '" + topic + "'");
      });
    });
  
    
  });  
}

module.exports =
{
  connect : connect
}