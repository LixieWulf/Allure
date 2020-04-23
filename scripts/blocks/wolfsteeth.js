const cutefluffydoggo = extendContent(ItemTurret, "wolfsteeth", {
  load(){
    this.super$load() 
    this.baseRegion = Core.atlas.find(this.name + "-base");
  },
  generateIcons: function(){
    return [
      Core.atlas.find("wolfsteeth-base-icon"),
      Core.atlas.find("wolfsteeth-roar-icon")
    ];
  },
});