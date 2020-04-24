//the name you put in the quotaion marks is the same for the .hjson, this file's name, and the sprites.
const galaxyEdge = new LaserTurret("galaxy-edge");

//Normally takes 30/sec to cool. Change this to multiply that amount.
var fluidCostMultiplier = 8;

//Editable stuff for custom laser.
//4 colors from outside in. Normal meltdown laser has trasnparrency 55 -> aa -> ff (no transparrency) -> ff(no transparrency)
var colors = [Color.valueOf("c90fd955"), Color.valueOf("10bbde55"), Color.valueOf("db410d55"), Color.valueOf("d228e0aa"), Color.valueOf("24cef0aa"), Color.valueOf("e65727aa"), Color.valueOf("f152ff"), Color.valueOf("3ddfff"), Color.valueOf("ed683b"), Color.white];
//Number of beams
var lasers = 1;

//The number of values in the next 4 arrays is the number of beams you have. First values in each go to the first beam, second values go to the second, etc.
//Beam angles in degrees
const spread = [0];
//Shift beam left or right. Negative is left, 0 is middle.
const spacing = [0];
//Shift beam foward or backward. Negative is backward, 0 is middle. Note that it counts from the start of the widest section.
const position = [0];
//Length of beam. Uses same 8 per tile rule.
var length = [160];

//Stuff you probably shouldn't edit unless you know what you're doing.
//Width of each section of the beam from thickest to thinnest
var tscales = [1, 0.9, 0.8, 0.7, 0.633333333, 0.566666666, 0.5, 0.4, 0.3, 0.2];
//Overall width of each color
var strokes = [6, 5.5, 5, 4.5, 4, 3.5 3, 2.3, 1.6, 0.9];
//Determines how far back each section in the start should be pulled
var pullscales = [1, 1.02, 1.04, 1.06, 1.0733333333, 1.08666666, 1.1, 1.1133333333, 1.12666666, 1.14];
//Determines how far each section of the end should extend past the main thickest section
var lenscales = [1, 1.0533333333, 1.10666666, 1.16, 1.2, 1.24,1.28, 1.32, 1.36, 1.4];

var tmpColor = new Color();
const vec = new Vec2();

galaxyEdge.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1), 0.5 * fluidCostMultiplier)).update(false);
galaxyEdge.coolantMultiplier = 1 / fluidCostMultiplier;

galaxyEdge.shootType = extend(BasicBulletType, {
  update: function(b){
    if(b.timer.get(1, 5)){
      for(var v = 0; v < lasers; v++){
        vec.trns(b.rot() - 90, spacing[v], position[v]);
        Tmp.v1.trns(b.rot() + angleB + 180.0, (pullscales[4] - 1.0) * 55.0);
        var angleB = spread[v];
        var baseLen = length[v] * b.fout();
        Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x + vec.x, b.y + vec.y, b.rot() + angleB, length[v] + length[v]/8.75, true);
      }
    };
  },
  hit(b,hitx,hity){
    Effects.effect(this.hitEffect,Color.valueOf("f152ff"),hitx!=null?hitx:b.x,hity!=null?hity:b.y);
    //Uncomment the following 3 lines to have incend. Chance is 0 to 1. Copy/past the Fire.create line multiple times to create more fire at once.
    if(Mathf.chance(0.9)){
      for(var a = 0; a < 69; a++){
          Fire.create(Vars.world.tileWorld(hitx + Mathf.range(24), hity + Mathf.range(24)));
      }
    }
  },
  draw: function(b){
    for(var s = 0; s < colors.length; s++){
      Draw.color(tmpColor.set(colors[s]).shiftHue(Time.time()));
      for(var i = 0; i < tscales.length; i++){
        for(var v = 0; v < lasers - 3; v++){
          vec.trns(b.rot() - 90, spacing[v], position[v]);
          var angleB = spread[v];
          var baseLen = length[v] * b.fout();
          Tmp.v1.trns(b.rot() + angleB + 180.0, (pullscales[i] - 1.0) * 55.0);
          Lines.stroke((4 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * strokes[s] * tscales[i]);
          Lines.lineAngle(b.x + Tmp.v1.x + vec.x, b.y + Tmp.v1.y + vec.y, b.rot() + angleB, baseLen * b.fout() * lenscales[i], CapStyle.none);
      }
    };
    Draw.reset();
  }
});

galaxyEdge.shootType.hitEffect = Fx.hitMeltdown;
galaxyEdge.shootType.despawnEffect = Fx.none;
galaxyEdge.shootType.damage = 580785;
galaxyEdge.shootType.hitSize = 4;
galaxyEdge.shootType.lifetime = 16;
galaxyEdge.shootType.drawSize = 420;
galaxyEdge.shootType.pierce = true;
galaxyEdge.shootType.speed = 0.001;
