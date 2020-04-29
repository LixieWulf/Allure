//the name you put in the quotaion marks is the same for the .hjson, this file's name, and the sprites.
const galaxyEdge = new LaserTurret("galaxy-edge");

//Normally takes 30/sec to cool. Change this to multiply that amount.
var fluidCostMultiplier = 8;

//Editable stuff for custom laser.
//4 colors from outside in. Normal meltdown laser has trasnparrency 55 -> aa -> ff (no transparrency) -> ff(no transparrency)
var colors1 = [Color.valueOf("c90fd955"), Color.valueOf("d228e0aa"), Color.valueOf("f152ff"), Color.white];
var colors2 = [Color.valueOf("10bbde55"), Color.valueOf("24cef0aa"), Color.valueOf("3ddfff"), Color.white];
var colors3 = [Color.valueOf("db410d55"), Color.valueOf("e65727aa"), Color.valueOf("ed683b"), Color.white];
//Number of beams
var lasers = 5;

//The number of values in the next 4 arrays is the number of beams you have. First values in each go to the first beam, second values go to the second, etc.
//Beam angles in degrees
const spread = [0, 10, -10, 20, -20];
//Shift beam left or right. Negative is left, 0 is middle.
const spacing = [0, 2 ,-2, 4, -4];
//Shift beam foward or backward. Negative is backward, 0 is middle. Note that it counts from the start of the widest section.
const position = [0, 0, 0, 0 ,0];
//Length of beam. Uses same 8 per tile rule.
var length = [160, 152, 152, 144, 144];

//Stuff you probably shouldn't edit unless you know what you're doing.
//Width of each section of the beam from thickest to thinnest
var tscales = [1, 0.7, 0.5, 0.2];
//Overall width of each color
var strokes = [6, 4.5, 3, 0.9];
//Determines how far back each section in the start should be pulled
var pullscales = [1, 1.06, 1.1, 1.14];
//Determines how far each section of the end should extend past the main thickest section
var lenscales = [1, 1.16, 1.27, 1.39];

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
                Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x + vec.x, b.y + vec.y, b.rot() + angleB, length[v] + length[v]/8, true);
            }
        };
    },
    hit(b,hitx,hity){
        Effects.effect(this.hitEffect,Color.valueOf("f7d95e"),hitx!=null?hitx:b.x,hity!=null?hity:b.y);
        //Uncomment the following 3 lines to have incend. Chance is 0 to 1. Copy/past the Fire.create line multiple times to create more fire at once.
        if(Mathf.chance(0.9)){
            for(var a = 0; a < 69; a++){
                Damage.createIncend(hitx, hity, 64, 10);
            }
        }
    },
    draw: function(b){
        
        for(var s = 0; s < 4; s++){
            Draw.color(tmpColor.set(colors3[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.3)).shiftHue(Time.time() * 1.5));
            for(var i = 0; i < 4; i++){
                for(var v = 3; v < 5; v++){
                    vec.trns(b.rot() - 90, spacing[v], position[v]);
                    Tmp.v1.trns(b.rot() + angleB + 180.0, (pullscales[i] - 1.0) * 55.0);
                    var angleB = spread[v];
                    var baseLen = length[v] * b.fout();
                    Lines.stroke((4 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * strokes[s] * tscales[i]);
                    Lines.lineAngle(b.x + Tmp.v1.x + vec.x, b.y + Tmp.v1.y + vec.y, b.rot() + angleB, baseLen * b.fout() * lenscales[i], CapStyle.none);
                }
            }
            Draw.color(tmpColor.set(colors2[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.3)).shiftHue(Time.time() * 1.5));
            for(var i = 0; i < 4; i++){
                for(var v = 1; v < 3; v++){
                    vec.trns(b.rot() - 90, spacing[v], position[v]);
                    Tmp.v1.trns(b.rot() + angleB + 180.0, (pullscales[i] - 1.0) * 55.0);
                    var angleB = spread[v];
                    var baseLen = length[v] * b.fout();
                    Lines.stroke((4 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * strokes[s] * tscales[i]);
                    Lines.lineAngle(b.x + Tmp.v1.x + vec.x, b.y + Tmp.v1.y + vec.y, b.rot() + angleB, baseLen * b.fout() * lenscales[i], CapStyle.none);
                }
            }
            Draw.color(tmpColor.set(colors1[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.3)).shiftHue(Time.time() * 1.5));
            for(var i = 0; i < 4; i++){
                vec.trns(b.rot() - 90, spacing[0], position[0]);
                Tmp.v1.trns(b.rot() + angleB + 180.0, (pullscales[i] - 1.0) * 55.0);
                var angleB = spread[0];
                var baseLen = length[0] * b.fout();
                Lines.stroke((4 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * strokes[s] * tscales[i]);
                Lines.lineAngle(b.x + Tmp.v1.x + vec.x, b.y + Tmp.v1.y + vec.y, b.rot() + angleB, baseLen * b.fout() * lenscales[i], CapStyle.none);
            }
        };
        Draw.reset();
    }
});

galaxyEdge.shootType.hitEffect = Fx.hitMeltdown;
galaxyEdge.shootType.despawnEffect = Fx.none;
galaxyEdge.shootType.damage = 5807850;
galaxyEdge.shootType.hitSize = 4;
galaxyEdge.shootType.lifetime = 16;
galaxyEdge.shootType.drawSize = 420;
galaxyEdge.shootType.pierce = true;
galaxyEdge.shootType.speed = 0.001;

//make the beam inflict a status effect. Remove if you don't want a status effect applied.
damg = new StatusEffect("the-sun-is-a-deadly-laser");
//damage per tick like usual
damg.damage = 580785;
damg.effect = Fx.burning;
damg.armorMultiplier = 0.1;
solarflare.shootType.status = damg;