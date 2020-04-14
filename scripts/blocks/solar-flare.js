//Large amounts of code copied from laser-interceptor.js from younggam/more-powerful-units.
const solarflare = new LaserTurret("solar-flare");

solarflare.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1),/*amount per tick*/0.5)).update(false);

var tmpColor = new Color();
var colors = [Color.valueOf("e6c04555"), Color.valueOf("f7d95eaa"), Color.valueOf("ffec6e"), Color.white];
var tscales = [1, 0.7, 0.5, 0.2];
var strokes = [2, 1.5, 1, 0.3];
var lenscales = [1, 1.12, 1.15, 1.17];
var length = 560;
var spread = 8;
var inaccuracy = 2;
var shots = 3;

solarflare.shootType = extend(BasicBulletType, {
    update(b){
        if (b == null) return;
        if (b.timer.get(1, 5)){
            //Look in damage.java for how this works, it's simular to lightning.
            Damage.collideLine(b, b.getTeam(), Fx.hitMeltdown, b.x, b.y, b.rot(), length + 35, true);
            Damage.collideLine(b, b.getTeam(), Fx.hitMeltdown, b.x + 8, b.y - 2, b.rot() -  spread, length + 56, true);
            Damage.collideLine(b, b.getTeam(), Fx.hitMeltdown, b.x - 8, b.y - 2, b.rot() +  spread, length + 56, true);
        }
        Effects.shake(1, 1, b.x, b.y);
    },
    hit(b,hitx,hity){
        Effects.effect(this.hitEffect,Color.valueOf("f7d95e"),hitx!=null?hitx:b.x,hity!=null?hity:b.y);
        if(Mathf.chance(0.8)){
            //DECUPLE BURNY BURN MWAHAHAHAHAHA
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
    draw(b){
        baseLen = (length) * b.fout();

        for(var s = 0; s < 4; s++){
            Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.1)));
            for(var i = 0; i < 4; i++){
                for(var v = 0; v < shots; v++){
                    var shootAngle = (v - shots / 2) * inaccuracy;
                    var shootSpread = (v - 1) * spread
                    Tmp.v1.trns(b.rot() + shootAngle + 180.0, (lenscales[i] - 1.0) * 55.0);
                    Lines.stroke((4 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * strokes[s] * tscales[i]);
                    Lines.lineAngle(b.x + Tmp.v1.x + shootSpread, b.y + Tmp.v1.y, b.rot() - shootAngle, baseLen * lenscales[i], CapStyle.none);
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
solarflare.shootType.collides = false;

corn = new StatusEffect("the-sun-is-a-deadly-laser");
corn.damage = 11570;
corn.effect = Fx.burning;
corn.armorMultiplier = 0.1;
solarflare.shootType.status = corn