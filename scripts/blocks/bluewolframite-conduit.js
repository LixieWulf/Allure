const bluewolframiteConduit = extendContent(Conduit, "bluewolframite-conduit", {
  load(){
    this.super$load()
    for(var l = 0; l < this.topRegions.length; l++){
      this.topRegions[l] = Core.atlas.find(this.name + "-top-" + l);
      this.botRegions[l] = Core.atlas.find(this.name + "-bottom-" + l);
    }
    //I'm not gonna bother making it not called rainbow.
    for(var i = 0; i < 8; i++){
      this.pulseReg0[i] = Core.atlas.find(this.name + "rainbow-0-" + i);
      this.pulseReg1[i] = Core.atlas.find(this.name + "rainbow-1-" + i);
      this.pulseReg2[i] = Core.atlas.find(this.name + "rainbow-2-" + i);
      this.pulseReg3[i] = Core.atlas.find(this.name + "rainbow-3-" + i);
      this.pulseReg4[i] = Core.atlas.find(this.name + "rainbow-4-" + i);
      this.pulseReg5[i] = Core.atlas.find(this.name + "rainbow-5-" + i);
      this.pulseReg6[i] = Core.atlas.find(this.name + "rainbow-6-" + i);
    }
  },
  drawLayer: function(tile){
		//const tr2 = new Vec2();
		
		entity = tile.ent();
      condRotation = tile.rotation() * 90;

		this.tr.trns(condRotation, 0);

		Draw.rect(this.topRegions, tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
    
    Draw.color(Color.valueOf("91FFFF").shiftSaturation((Time.time() * 5) + (h * 17)));
    
    if(this.bits[0] == 0){
      for(var h = 0; h < 6; h++){
        Draw.rect(this.pulseReg0[h], tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
        Draw.color();
      }
    }
    if(this.bits[0] == 1){
      for(var h = 0; h < 6; h++){
        Draw.rect(this.pulseReg1[h], tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
        Draw.color();
      }
    }
    if(this.bits[0] == 2){
      for(var h = 0; h < 6; h++){
        Draw.rect(this.pulseReg2[h], tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
        Draw.color();
      }
    }
    if(this.bits[0] == 3){
      for(var h = 0; h < 6; h++){
        Draw.rect(this.pulseReg3[h], tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
        Draw.color();
      }
    }
    if(this.bits[0] == 4){
      for(var h = 0; h < 6; h++){
        Draw.rect(this.pulseReg4[h], tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
        Draw.color();
      }
    }
    if(this.bits[0] == 5){
      for(var h = 0; h < 6; h++){
        Draw.rect(this.pulseReg5[h], tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
        Draw.color();
      }
    }
    if(this.bits[0] == 6){
      for(var h = 0; h < 6; h++){
        Draw.rect(this.pulseReg6[h], tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
        Draw.color();
      }
    }
    if(this.bits[0] == 7){
      for(var h = 0; h < 6; h++){
        Draw.rect(this.pulseReg7[h], tile.drawx() + this.tr.x, tile.drawy() + this.tr.y, condRotation - 90);
        Draw.color();
      }
    }
	}
});