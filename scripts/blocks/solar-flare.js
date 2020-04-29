//Normally takes 30/sec to cool. Change this to multiply that amount.
var fluidCostMultiplier = 5;

//Editable stuff for custom laser.
//4 colors from outside in. Normal meltdown laser has trasnparrency 55 -> aa -> ff (no transparrency) -> ff(no transparrency)
var colors = [Color.valueOf("e6c04555"), Color.valueOf("f7d95eaa"), Color.valueOf("ffec6e"), Color.white];
//Number of lasers
var lasers = 9;

//The number of values in the next 4 arrays is the number of beams you have. First values in each go to the first beam, second values go to the second, etc.
//Beam angles in degrees
const spread = [7, 5, 3, -3, -5, -7, 2, 0, -2];
//Shift beam left or right. Negative is left, 0 is middle.
const spacing = [-17.25, -17.25, -17.25, 17.25, 17.25, 17.25, 0, 0, 0];
//Shift beam foward or backward. Negative is backward, 0 is middle. Note that it counts from the start of the widest section.
const position = [-1, -1, -1, -1, -1, -1, 3, 3, 3];
//Length of beam. Uses same 8 per tile rule
var length = [500, 515, 530, 530, 515, 500, 545, 560, 545];

//Stuff you probably shouldn't edit.
//Width of each section of the beam from thickest to thinnest
var tscales = [1, 0.7, 0.5, 0.2];
//Overall width of each color
var strokes = [2.5, 1.875, 1.25, 0.375];
//Determines how far back each section in the start should be pulled
var pullscales = [1, 1.12, 1.15, 1.17];
//Determines how far each section of the end should extend past the main thickest section
var lenscales = [1, 1.12, 1.15, 1.17];

var tmpColor = new Color();
const vec = new Vec2();

const theSun = newEffect(60, e => {
  const sunRegion = Core.atlas.find("exotic-mod-solar-flare-sun");
  
  Draw.blend(Blending.additive);
	Draw.color(Color.valueOf("722a18"), Color.valueOf("36080230"), e.fin());
	Draw.rect(lightRegion, e.x, e.y, 270);
	Draw.blend();
});
const sunshine = newEffect(20, e => {
  
  Draw.color(Color.valueOf("fff200"), Color.white, e.fin());
  Lines.stroke(e.fout() * 8);
  Lines.circle(e.x, e.y, e.fin() * 18); //draw a circle whose radius goes from 0 to 100
});

const solarflare = extendContent(LaserTurret, "solar-flare", {
  drawLayer(tile){
    this.super$drawLayer(tile);
    
    entity = tile.ent();
    
    vec.trns(entity.rotation, 0, -9.5 - entity.recoil);
    Effects.effect(theSun, entity.x, entity.y + vec.y, 270);
  },
  updateShooting(tile){
    this.super$updateShooting(tile);
    
    entity = tile.ent();
    
    vec.trns(entity.rotation, 0, -9.5 - entity.recoil);
    Effects.effect(sunshine, entity.x, entity.y + vec.y, 270);
  }
});

solarflare.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1), 0.5 * fluidCostMultiplier)).update(false);
solarflare.coolantMultiplier = 1 / fluidCostMultiplier;

solarflare.shootType = extend(BasicBulletType, {
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
    Effects.effect(this.hitEffect,Color.valueOf("f7d95e"),hitx!=null?hitx:b.x,hity!=null?hity:b.y);
    //Uncomment the following 3 lines to have incend. Chance is 0 to 1. Copy/past the Fire.create line multiple times to create more fire at once.
    if(Mathf.chance(0.8)){
      for(ohno = 0; ohno < 69; ohno++) {
        Damage.createIncend(hitx, hity, 12, 3);
      }
    }
  },
  draw: function(b){
    
    for(var s = 0; s < 4; s++){
      Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.3)));
      for(var i = 0; i < 4; i++){
        for(var v = 0; v < lasers - 3; v++){
          strokes = [2.5, 1.875, 1.25, 0.375];
          vec.trns(b.rot() - 90, spacing[v], position[v]);
          var angleB = spread[v];
          var baseLen = length[v] * b.fout();
          Tmp.v1.trns(b.rot() + angleB + 180.0, (pullscales[i] - 1.0) * 55.0);
          Lines.stroke((4 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * strokes[s] * tscales[i]);
          Lines.lineAngle(b.x + Tmp.v1.x + vec.x, b.y + Tmp.v1.y + vec.y, b.rot() + angleB, baseLen * b.fout() * lenscales[i], CapStyle.none);
        }
        for(var r = lasers - 3; r < lasers; r++){
          strokes = [3.75, 2.8125, 1.875, 0.5625];
          vec.trns(b.rot() - 90, spacing[r], position[r]);
          var angleB = spread[r];
          var baseLen = length[r] * b.fout();
          Tmp.v1.trns(b.rot() + angleB + 180.0, (pullscales[i] - 1.0) * 55.0);
          Lines.stroke((4 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * strokes[s] * tscales[i]);
          Lines.lineAngle(b.x + Tmp.v1.x + vec.x, b.y + Tmp.v1.y + vec.y, b.rot() + angleB, baseLen * b.fout() * lenscales[i], CapStyle.none);
        }
      }
    };
    Draw.reset();
  }
});

solarflare.shootType.hitEffect = Fx.hitMeltdown;
solarflare.shootType.despawnEffect = Fx.none;
solarflare.shootType.damage = 10000;
solarflare.shootType.hitSize = 4;
solarflare.shootType.lifetime = 16;
solarflare.shootType.drawSize = 420;
solarflare.shootType.pierce = true;
solarflare.shootType.speed = 0.001;

//make the beam inflict a status effect. Remove if you don't want a status effect applied.
corn = new StatusEffect("the-sun-is-a-deadly-laser");
//damage per tick like usual
corn.damage = 40000;
corn.effect = Fx.burning;
corn.armorMultiplier = 0.1;
solarflare.shootType.status = corn