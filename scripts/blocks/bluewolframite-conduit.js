const bluewolframiteConduit = extendContent(Conduit, "bluewolframite-conduit", {
  load(){
    this.super$load()
    
    for(var l = 0; l < this.topRegions.length; l++){
      this.topRegions[l] = Core.atlas.find(this.name + "-top-" + l);
      this.botRegions[l] = Core.atlas.find(this.name + "-bottom-" + l);
    }
    //I'm not gonna bother making it not called rainbow.
    for(var i = 0; i < 8; i++){
      pulseReg0[i] = Core.atlas.find(this.name + "-rainbow-0-" + i);
      pulseReg1[i] = Core.atlas.find(this.name + "-rainbow-1-" + i);
      pulseReg2[i] = Core.atlas.find(this.name + "-rainbow-2-" + i);
      pulseReg3[i] = Core.atlas.find(this.name + "-rainbow-3-" + i);
      pulseReg4[i] = Core.atlas.find(this.name + "-rainbow-4-" + i);
      pulseReg5[i] = Core.atlas.find(this.name + "-rainbow-5-" + i);
      pulseReg6[i] = Core.atlas.find(this.name + "-rainbow-6-" + i);
    }
    pulseRegAll = [pulseReg0, pulseReg1, pulseReg2, pulseReg3, pulseReg4, pulseReg5, pulseReg6]
  },
  draw(tile){
    this.super$draw(tile);
    
    entity = tile.ent();
    rotation = tile.rotation() * 90;
    
    somethingidk = 0;
    
    for(var h = 0; h < 8; h++){
			Draw.color(Color.valueOf("91FFFF").shiftSaturation((Time.time() * 5) + (h * 17)));
			Draw.rect(pulseRegAll[entity.blendbits][h], tile.drawx(), tile.drawy(), rotation);
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