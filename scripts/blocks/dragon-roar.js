const dwago = extendContent(DoubleTurret, "dragon-roar", {
  load(){
    this.super$load() 
    this.baseRegion = Core.atlas.find(this.name + "-base");
  },
  generateIcons: function(){
		return [
			Core.atlas.find("dragon-roar-base-icon"),
			Core.atlas.find("dragon-roar-icon")
		];
	}
});