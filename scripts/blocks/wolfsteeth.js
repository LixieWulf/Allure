const cutefluffydoggo = extendContent(ItemTurret, "wolfsteeth", {
  load(){
    this.super$load() 
    this.baseRegion = Core.atlas.find(this.name + "-base");
  },
  generateIcons: function(){
    return [
      Core.atlas.find("exotic-mod-wolfsteeth-base-icon"),
      Core.atlas.find("exotic-mod-wolfsteeth-icon")
    ];
  },
  shoot: function(tile, ammo){
		const tr3 = new Vec2();
		entity = tile.ent();
		entity.shots++;
		entity.recoil = this.recoil;
		entity.heat = 1;
		
		const type = this.peekAmmo(tile);
		const predict = Predict.intercept(tile, entity.target, type.speed);
		const dst = entity.dst(predict.x, predict.y);
		const maxTraveled = type.lifetime * type.speed;
		
    const i = entity.shots % 4;
    const shift = [-23, -5, 5, -23];
    const setback = [-8, 24, 24, -8];
    
		tr3.trns(entity.rotation - 90, shift[i], setback[i] - entity.recoil);
    
    Bullet.create(ammo, tile.entity, tile.getTeam(), tile.drawx() + tr3.x, tile.drawy() + tr3.y, entity.rotation + Mathf.range(this.inaccuracy + type.inaccuracy), type.speed, (dst / maxTraveled));

		this.effects(tile);
		this.useAmmo(tile);
	},
  effects: function(tile){
		const tr3 = new Vec2();
		entity = tile.ent();
		
		const i = entity.shots % 4;
    const shift = [-23, -5, 5, -23];
    const setback = [-8, 24, 24, -8];
		
		tr3.trns(entity.rotation - 90, shift[i], setback[i] - entity.recoil);
    
		const shootEffectB = this.shootEffect == Fx.none ? this.peekAmmo(tile).shootEffect : this.shootEffect;
		const smokeEffectB = this.smokeEffect == Fx.none ? this.peekAmmo(tile).smokeEffect : this.smokeEffect;

		Effects.effect(shootEffectB, tile.drawx() + tr3.x, tile.drawy() + tr3.y, entity.rotation);
		Effects.effect(smokeEffectB, tile.drawx() + tr3.x, tile.drawy() + tr3.y, entity.rotation);
		this.shootSound.at(tile, Mathf.random(0.9, 1.1));

		if(this.shootShake > 0){
		Effects.shake(this.shootShake, this.shootShake, tile.entity);
		};

		entity.recoil = this.recoil;
	}
});

const drFF = extend(BasicBulletType,{});
drFF.speed = 11;
drFF.damage = 1000;
drFF.bulletSprite = "exotic-mod-railbolt";
drFF.bulletWidth = 5;
drFF.bulletHeight = 15;
drFF.shootEffect = Fx.shootBig;
drFF.bulletShrink = 0;
drFF.smokeEffect = Fx.shootBigSmoke;
drFF.homingRange = 480;
drFF.homingPower = 0.01;
drFF.status = StatusEffects.melting;
drFF.hitEffect = Fx.hitMeltdown;
drFF.splashDamage = 1000;
drFF.splashDamageRadius = 100;
drFF.lifetime = 64;
drFF.frontColor = Color.valueOf("f53b11");
drFF.backColor = Color.valueOf("d92800");

const drF = extend(BasicBulletType,{});
drF.speed = 11;
drF.damage = 1000;
drF.bulletSprite = "exotic-mod-railbolt";
drF.bulletWidth = 15;
drF.bulletHeight = 45;
drF.shootEffect = Fx.shootBig;
drF.bulletShrink = 0;
drF.smokeEffect = Fx.shootBigSmoke;
drF.homingRange = 480;
drF.homingPower = 0.01;
drF.status = StatusEffects.melting;
drF.hitEffect = Fx.hitMeltdown;
drF.splashDamage = 1000;
drF.splashDamageRadius = 100;
drF.lifetime = 64;
drF.frontColor = Color.valueOf("f53b11");
drF.backColor = Color.valueOf("d92800");
drF.fragVelocityMin = 0.9;
drF.fragVelocityMax = 1.1;
drF.fragBullets = 5;
drF.fragBullet = drFF;

const drB = extend(BasicBulletType,{});
drB.speed = 11;
drB.damage = 30000;
drB.bulletSprite = "exotic-mod-railbolt";
drB.bulletWidth = 20;
drB.bulletHeight = 60;
drB.shootEffect = Fx.shootBig;
drB.smokeEffect = Fx.shootBigSmoke;
drB.lifetime = 128;
drB.status = StatusEffects.melting;
drB.hitEffect = Fx.hitMeltdown;
drB.homingRange = 480;
drB.homingPower = 0.01;
drB.ammoMultiplier = 3;
drB.bulletShrink = 0;
drB.frontColor = Color.valueOf("f53b11");
drB.backColor = Color.valueOf("d92800");
drB.fragVelocityMin = 0.9;
drB.fragVelocityMax = 1.1;
drB.fragBullets = 5;
drB.fragBullet = drF;

const doL = extend(BasicBulletType,{});
doL.damage = 1000;
doL.bulletWidth = 6;
doL.bulletHeight = 10;
doL.lifetime = 10;
doL.hitEffect = Fx.hitMeltdown;
doL.frontColor = Color.valueOf("40ccff");
doL.backColor = Color.valueOf("1397F0");
doL.lightining = 10;
doL.lightningLength = 50;

const doB = extend(BasicBulletType,{});
doB.speed = 10;
doB.damage = 100000;
doB.bulletSprite = "exotic-mod-railbolt";
doB.bulletWidth = 24;
doB.bulletHeight = 68;
doB.shootEffect = Fx.shootBig;
doB.smokeEffect = Fx.shootBigSmoke;
doB.bulletShrink = 0;
doB.status = StatusEffects.burning;
doB.homingRange = 480;
doB.homingPower = 0.01;
doB.hitEffect = Fx.padlaunch;
doB.splashDamage = 25000;
doB.splashDamageRadius = 100;
doB.lifetime = 180;
doB.ammoMultiplier = 4;
doB.frontColor = Color.valueOf("40ccff");
doB.backColor = Color.valueOf("1397F0");
doB.fragVelocityMin = 0.9;
doB.fragVelocityMax = 1.1;
doB.fragBullets = 100;
doB.fragBullet = doL;

const pB = extend(BasicBulletType,{});
pB.speed = 19;
pB.damage = 25000;
pB.bulletSprite = "exotic-mod-railbolt";
pB.pierce = true;
pB.bulletWidth = 16;
pB.bulletHeight = 52;
pB.shootEffect = Fx.shootBig;
pB.bulletShrink = 0;
pB.ammoMultiplier = 5;
pB.smokeEffect = Fx.shootBigSmoke;
pB.status = StatusEffects.freezing;
pB.hitEffect = Fx.shootBig;
pB.homingRange = 480;
pB.homingPower = 0.002;
pB.frontColor = Color.valueOf("b966cc");
pB.backColor = Color.valueOf("8e479e");
pB.lifetime = 156;

const itemfunc = name => Vars.content.getByName(ContentType.item, name);

const egg = itemfunc("draconium");
const puprock = itemfunc("bluewolframite");
const jem = itemfunc("amethyst-gem");

cutefluffydoggo.ammo(
  egg, drB,
  puprock, doB,
  jem, pB
);
cutefluffydoggo.shootShake = 3;
cutefluffydoggo.recoil = 6;
cutefluffydoggo.shootEffect = Fx.lightningShoot;
cutefluffydoggo.smokeEffect = Fx.shootPyraFlame;
cutefluffydoggo.shootSound = corexplode;