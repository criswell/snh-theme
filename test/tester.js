var stage;
var canvas;
var logo;
var w;
var h;
var particles;
var maxParticles = 30;
var breeze;
var br = 0;
var brStep = 0.05;
var brMax = 2 * Math.PI;
var breezeType = Math.floor(Math.random() * 5);
var bubbleType = Math.floor(Math.random() * 2);

function ParticleObj() {
  this.particle = new createjs.Shape();
  this.percentage = 0;
  this.stepPercentage = 0;
  this.startX = 0;
  this.startY = 0;
  this.endX = 0;
  this.endY = 0;
  this.startR = 0;
  this.endR = 0;
  this.startW = 0;
  this.endW = 0;
  this.randVar = 0;
  this.color = "0,68,0";

  this.update = function() {
    x = this.startX + (this.endX - this.startX) * this.percentage;
    x = x + this.randVar * breeze;
    y = this.startY + (this.endY - this.startY) * this.percentage;
    r = this.startR + (this.endR - this.startR) * this.percentage;
    wh = this.startW + (this.endW - this.startW) * this.percentage;
    color = "rgba(" + this.color + "," + (1 - this.percentage) + ")";
    this.particle.graphics.clear();
    if (bubbleType == 0) {
      this.particle.graphics.beginFill(color).drawCircle(x, y, r);
    } else {
      this.particle.graphics.beginFill(color).drawRoundRect(x, y,
          wh, wh, r);
    }
  }
}

function resetParticle(p) {
  p.percentage = 0;
  p.stepPercentage = 0.05 * Math.random() + 0.0005;
  p.startX = w * Math.random();
  p.startY = h;
  p.endX = p.startX + (40 * Math.random() - 20);
  p.endY = 100 * Math.random();
  p.startR = 50 * Math.random();
  p.endR = 50 * Math.random();
  p.startW = 100 * Math.random() + 20;
  p.endW = 100 * Math.random() + 20;
  p.randVar = 100 * Math.random() + 20;
}

function init() {
  canvas = document.getElementById("snhCanvas")
    stage = new createjs.Stage(canvas);
  logo = new createjs.Bitmap("snh.png");
  w = document.getElementById('mainWell').offsetWidth;
  canvas.width = w;
  h = canvas.height;
  logo.x = w / 10;
  logo.y = h / 2 - 65;
  particles = [];
  for (i = 0; i < maxParticles; i++) {
    var p = new ParticleObj();
    particles.push(p);
    resetParticle(p);
    stage.addChild(p.particle);
  }
  stage.addChild(logo);

  createjs.Ticker.on("tick", tick);
  createjs.Ticker.setFPS(30);
}

function resetParts() {
  for (i = 0; i < maxParticles; i++) {
    resetParticle(particles[i]);
  }
}

$(window).resize(function() {
  w = document.getElementById('mainWell').offsetWidth;
  canvas.width = w;
  resetParts();
});

function updateBreeze() {
  br += brStep;
  if (br > brMax) {
    br = 0;
  }

  if (breezeType == 0) {
    breeze = -1 * Math.tan(br);
  } else if (breezeType == 1) {
    breeze = Math.tan(br);
  } else {
    breeze = Math.sin(br);
  }
}

function tick(event) {
  updateBreeze();

  for (i = 0; i < maxParticles; i++) {
    var p = particles[i];
    p.percentage += p.stepPercentage;
    if (p.percentage > 1) {
      resetParticle(p);
    }
    p.update();
  }
  stage.update(event);
}
