const dwago = extendContent(DoubleTurret, "dragon-roar", {
    load(){
        this.super$load()
        this.baseRegion = Core.atlas.find(this.name + "-base");
    }
});