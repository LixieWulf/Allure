const dwago = extendContent(DoubleTurret, "dragon-roar", {
  load(){
    this.super$load() 
    this.baseRegion = Core.atlas.find(this.name + "-base");
  },
  generateIcons: function(){
		return [
			Core.atlas.find("exotic-mod-dragon-roar-base-icon"),
			Core.atlas.find("exotic-mod-dragon-roar-icon")
		];
	}
});