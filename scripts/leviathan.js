const levicannon = extendContent(Weapon, "levicannon", {
	load: function(){
		this.region = Core.atlas.find("exotic-mod-leviathan-cannon");
	}
});
levicannon.ejectEffect = Fx.none;
levicannon.length = 12;
levicannon.width = 5.24;
levicannon.reload = 11;
levicannon.recoil = 1;
levicannon.shots = 1;
levicannon.alternate = true;
levicannon.velocityRnd = 0.05;
levicannon.bullet = Bullets.standardThoriumBig;
levicannon.shootSound = Sounds.shootBig;

const levi = extendContent(Mech, "leviathan", {
  updateAlt(player){
    this.super$updateAlt(player);
    
    if(player.timer.get(Player.timerAbility, 900)){
			for(var i = 0; i < 4; i ++){
        wr = UnitTypes.wraith.create(player.getTeam());
        Events.fire(new UnitCreateEvent(wr));
      }
		}
    if(player.timer.get(Player.timerAbility, 1800)){
      for(var i = 0; i < 2; i ++){
        rev = UnitTypes.revenant.create(player.getTeam());
        Events.fire(new UnitCreateEvent(rev));
      }
		}
    if(player.timer.get(Player.timerAbility, 3600)){
			dra = UnitTypes.draug.create(player.getTeam());
      Events.fire(new UnitCreateEvent(dra));
		}
    if(player.timer.get(Player.timerAbility, 18000)){
			lic = UnitTypes.lich.create(player.getTeam());
      Events.fire(new UnitCreateEvent(lic));
		}
  }
});

levi.localisedName = "Leviathan";
levi.description = "A gigantic ship with great destructive power. A Carrier Dropship This is the testing phase for the unit creation.";
levi.flying = true;
levi.speed = 0.6;
levi.maxSpeed = 1;
levi.drag = 0.25;
levi.hitsize = 53;
levi.mass = 10;
levi.health = 15000;
levi.engineSize = 9;
levi.engineOffset = 22;
levi.engineColor = Color.valueOf("ad66d4");
levi.buildPower = 10;
levi.drillPower = 200;
levi.mineSpeed = 40;
levi.itemCapacity = 10000;
levi.weaponOffsetX = 5.24;
levi.weaponOffsetY = 12;
levi.weapon = levicannon;

const levipad = extendContent(MechPad, "leviathan-mech-pad", {});

levipad.mech = levi;