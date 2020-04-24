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
		const predict = Predict.intercept(tile, entity.target, type.speed));
		const dst = entity.dst(predict.x, predict.y);
		const maxTraveled = type.lifetime * type.speed);
		
    const i = entity.shots % 4;
    var shift = [-23, -5, 5, -23];
    var setback = [-8, 24, 24, -8];
    
		tr3.trns(entity.rotation - 90, shift[i], setback[i] - entity.recoil);
    
    Bullet.create(ammo, tile.entity, tile.getTeam(), tile.drawx() + tr3.x, tile.drawy() + tr3.y, entity.rotation + Mathf.range(this.inaccuracy + type.inaccuracy), type.speed, (dst / maxTraveled));

		this.effects(tile);
		this.useAmmo(tile);
	},
  effects: function(tile){
		const tr3 = new Vec2();
		entity = tile.ent();
		
		const i = entity.shots % 4;
    var shift = [-23, -5, 5, -23];
    var setback = [-8, 24, 24, -8];
		
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
