const solarflare = new LaserTurret("solar-flare");

solarflare.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1),/*amount per tick*/2.5)).update(false);
solarflare.coolantMultiplier = 0.2;

var length = 560;
var colors = [Color.valueOf("e6c04555"), Color.valueOf("f7d95eaa"), Color.valueOf("ffec6e"), Color.white];
var tscales = [1, 0.7, 0.5, 0.2];
var strokes = [2, 1.5, 1, 0.3];
var lenscales = [1, 1.12, 1.15, 1.17];
var tmpColor = new Color();
var lasers = 5;
//laser blast angles
const spread = [2, 1, 0, -1, -2];
//space between lasers
const spacing = [-8.375, -4.1875,0, 4.1875, 8.375];
const position = [1, 1.5, 3, 1.5, 1];
var length = [560, 280, 560, 280, 560];
const vec = new Vec2();

solarflare.shootType = extend(BasicBulletType, {
    update: function(b){
        if(b.timer.get(1, 5)){
            for(var v = 0; v < lasers; v++){
                vec.trns(b.rot() - 90, spacing[v], position[v]);
                var angleB = spread[v];
                Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x + vec.x, b.y + vec.y, b.rot() + angleB, length[v] + length[v]/8.75, true);
            }
        };
    },
    hit(b,hitx,hity){
        Effects.effect(this.hitEffect,Color.valueOf("f7d95e"),hitx!=null?hitx:b.x,hity!=null?hity:b.y);
        if(Mathf.chance(0.8)){
            //DODECUPLE BURNY BURN MWAHAHAHAHAHA
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
            Fire.create(Vars.world.tileWorld(hitx + Mathf.range(5), hity + Mathf.range(5)));
        }
    },
    draw: function(b){
        
        
        for(var s = 0; s < 4; s++){
            Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.3)));
            for(var i = 0; i < 4; i++){
                for(var v = 0; v < lasers; v++){
                    vec.trns(b.rot() - 90, spacing[v], position[v]);
                    var angleB = spread[v];
                    var baseLen = length[v] * b.fout();
                    Tmp.v1.trns(b.rot() + angleB + 180.0, (lenscales[i] - 1.0) * 55.0);
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
solarflare.shootType.damage = 5000;
solarflare.shootType.hitSize = 4;
solarflare.shootType.lifetime = 16;
solarflare.shootType.drawSize = 420;
solarflare.shootType.pierce = true;
solarflare.shootType.speed = 69420;

corn = new StatusEffect("the-sun-is-a-deadly-laser");
corn.damage = 16667;
corn.effect = Fx.burning;
corn.armorMultiplier = 0.1;
solarflare.shootType.status = corn