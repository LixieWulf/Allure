const cutefluffydoggo = extendContent(ItemTurret, "wolfsteeth", {
    load(){
        this.baseRegion = Core.atlas.find(this.name + "-base");
    }
});