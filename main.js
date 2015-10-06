var Simplex = require('perlin-simplex')
var simplex = new Simplex()
var size = 300

function rgb(ctx, r, g, b){
    ctx.fillStyle = 'rgb('+r+', '+g+', '+b+')';
}

function redraw(){
  var canvas = document.getElementById('c');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  for (var y = size; y > 0; y--) {
    for (var x = size; x > 0; x--) {
      var b1 = simplex.noise(x / 200, y / 200);
      var b2 = simplex.noise(x / 100, y / 100);
      var b3 = simplex.noise(x / 50, y / 50);
      
      var brightness = (b1 + b2 + b3) / 3;
      var color = Math.floor(brightness * 256);
  
      rgb(ctx, color, color, color);
      ctx.fillRect(x,y,1,1);
    }
  }
}

var Vue = require("vue");
new Vue({
  el: ".main",
  methods: {
    redraw: function(){
      redraw();
    }
  },
  ready: function(){
      redraw();
  }
  
});
