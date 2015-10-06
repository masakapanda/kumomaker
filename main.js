var Simplex = require('perlin-simplex')

function rgb(ctx, r, g, b){
    ctx.fillStyle = 'rgb('+r+', '+g+', '+b+')';
}
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
var imageData = ctx.createImageData(canvas.width, canvas.height);

function redraw(){
  var simplex = new Simplex()
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var x = i / 4 % canvas.width;
    var y = i / 4 / canvas.width;
    
    var base = 60;
    var brightness = 0;
    for(var o = 1; o < 5; o++){
      brightness += simplex.noise(x / (o * base), y / (o * base)) / (5 - o);
    }
    
    //var gamma = 1.1;
    //var color = Math.pow(Math.floor(brightness * 256), 1 / gamma) / 2 + 128;
    var color = Math.floor(brightness * 256) / 8;
    color = 255 - color;
    
    
    data[i]     = color; // red
    data[i + 1] = color; // green
    data[i + 2] = color; // blue
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  console.log("done");
}

var Vue = require("vue");
new Vue({
  el: ".main",
  methods: {
    redraw: function(){
      console.log("redraw");
      redraw();
    }
  },
  ready: function(){
      redraw();
  }
  
});
