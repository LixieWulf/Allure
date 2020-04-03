const bluewolframiteConduit = extendContent(Conduit, "bluewolframite-conduit", {
    load(){
        super.load();

        liquidRegion = Core.atlas.find("conduit-liquid");
        for(int i = 0; i < topRegions.length; i++){
            topRegions[i] = Core.atlas.find(name + "-top-" + i);
            botRegions[i] = Core.atlas.find(name + "-bottom-" + i);
        }
    }
});