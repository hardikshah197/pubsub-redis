var NRP = require('node-redis-pubsub');
const redis = require('redis');

var redisPub = redis.createClient();
var redisSub = redis.createClient();

var config = {
  emitter: redisPub,                      
  receiver: redisSub,                    
}

var nrp = new NRP(config);

export default function pubsub(requestData) {

  nrp.on('say hello', function(data){
    console.log('Hello ' + data);
  });
  
  nrp.emit('say hello', { name: 'Louis' });   // Outputs 'Hello Louis'

  // You can use patterns to capture all messages of a certain type
  // The matched channel is given as a second parameter to the callback
  nrp.on('city:*', (data, channel) => {
  console.log(data.city + ' is great');
  });

  nrp.emit('city:hello' , { city: 'Paris' });         // Outputs 'Paris is great'
  nrp.emit('city:yeah'  , { city: 'San Francisco' }); // Outputs 'San Francisco is great'
};
// nrp.on('mydata:sync', function(myData) {
//     console.log(myData);
//   }, function() {
//     nrp.emit('mydata:requestsync'); // request a sync of the data after the handler is registered, so there are no race conditions
//   });

export default function unsubpub(data, Callback) {
  var unsubscribe = nrp.on('say hello', function(data){
    // Never called
  });
  
  unsubscribe([Callback]);
}