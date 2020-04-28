const bluewolframiteConduit = extendContent(Conduit, "bluewolframite-conduit", {
  load(){
    this.super$load()
    for(var l = 0; l < this.topRegions.length; l++){
      this.topRegions[l] = Core.atlas.find(this.name + "-top-" + l);
      this.botRegions[l] = Core.atlas.find(this.name + "-bottom-" + l);
    }
    //I'm not gonna bother making it not called rainbow.
    for(var i = 0; i < 8; i++){
      this.pulseReg0[i] = Core.atlas.find(this.name + "-rainbow-0-" + i);
      this.pulseReg1[i] = Core.atlas.find(this.name + "-rainbow-1-" + i);
      this.pulseReg2[i] = Core.atlas.find(this.name + "-rainbow-2-" + i);
      this.pulseReg3[i] = Core.atlas.find(this.name + "-rainbow-3-" + i);
      this.pulseReg4[i] = Core.atlas.find(this.name + "-rainbow-4-" + i);
      this.pulseReg5[i] = Core.atlas.find(this.name + "-rainbow-5-" + i);
      this.pulseReg6[i] = Core.atlas.find(this.name + "-rainbow-6-" + i);
    }
    this.pulseRegAll = [this.pulseReg0, this.pulseReg1, this.pulseReg2, this.pulseReg3, this.pulseReg4, this.pulseReg5, this.pulseReg6]
  },
  onProximityUpdate(tile){
    this.super$onProximityUpdate(tile);
  },
  draw(tile){
    entity = tile.ent();
    var rotation = tile.rotation() * 90;

    Draw.colorl(0.34f);
    Draw.rect(botRegions[entity.blendbits], tile.drawx(), tile.drawy(), rotation);

    Draw.color(tile.entity.liquids.current().color);
    Draw.alpha(entity.smoothLiquid);
    Draw.rect(botRegions[entity.blendbits], tile.drawx(), tile.drawy(), rotation);
    Draw.color();

    Draw.rect(topRegions[entity.blendbits], tile.drawx(), tile.drawy(), rotation);
    
    somethingidk = entity.blendbits;
    
    for(var h = 0; h < 8; h++){
			Draw.color(Color.valueOf("91FFFF").shiftSaturation((Time.time() * 5) + (h * 17)));
			Draw.rect(this.pulseRegAll[somethingidk][h], tile.drawx(), tile.drawy(), rotation);
			Draw.color();
		}
	}
});

bluewolframiteConduit.pulseReg0 = [];
bluewolframiteConduit.pulseReg1 = [];
bluewolframiteConduit.pulseReg2 = [];
bluewolframiteConduit.pulseReg3 = [];
bluewolframiteConduit.pulseReg4 = [];
bluewolframiteConduit.pulseReg5 = [];
bluewolframiteConduit.pulseReg6 = [];
bluewolframiteConduit.pulseReg7 = [];
bluewolframiteConduit.pulseRegAll = [];