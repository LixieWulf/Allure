const bluewolframiteConduit = extendContent(Conduit, "bluewolframite-conduit", {
  load(){
    this.super$load()
    for(var i = 0; i < this.topRegions.length; i++){
      this.topRegions[i] = Core.atlas.find(this.name + "-top-" + i);
      this.botRegions[i] = Core.atlas.find(this.name + "-bottom-" + i);
    }
    
    //I'm not gonna bother making it not called rainbow.
    for(i = 0; i < 8; i++){
      this.pulseReg0[i] = Core.atlas.find("bluewolframite-rainbow-0-" + i);
      this.pulseReg1[i] = Core.atlas.find("bluewolframite-rainbow-1-" + i);
      this.pulseReg2[i] = Core.atlas.find("bluewolframite-rainbow-2-" + i);
      this.pulseReg3[i] = Core.atlas.find("bluewolframite-rainbow-3-" + i);
      this.pulseReg4[i] = Core.atlas.find("bluewolframite-rainbow-4-" + i);
      this.pulseReg5[i] = Core.atlas.find("bluewolframite-rainbow-5-" + i);
      this.pulseReg6[i] = Core.atlas.find("bluewolframite-rainbow-6-" + i);
    }
    this.pulseRegAll = [pulseReg0, pulseReg1, pulseReg2, pulseReg3, pulseReg4, pulseReg5, pulseReg6]
  }
  onProximityUpdate(Tile tile){
    this.super$onProximityUpdate(tile);

    ConduitEntity entity = tile.ent();
    var bits = buildBlending(tile, tile.rotation(), null, true);
    entity.blendbits = bits[0];
  }
  drawLayer: function(tile){
		//const tr2 = new Vec2();
		
		entity = tile.ent();
      condRotation = tile.rotation() * 90;

		this.tr.trns(condRotation, 0);

		Draw.rect(this.topRegions, tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);

		for(var h = 0; h < 6; h++){
			Draw.color(Color.valueOf("91FFFF").shiftSaturation((Time.time() * 5) + (h * 17)));
			Draw.rect(this.pulseRegAll[bits[0]][h], tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
			Draw.color();
		}
	}
});