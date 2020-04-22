const dwago = extendContent(DoubleTurret, "dragon-roar", {
    load(){
        this.baseRegion = Core.atlas.find(this.name + "-base");
    }
});