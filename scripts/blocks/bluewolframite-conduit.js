const bluewolfConduit = extendContent(Conduit, "bluewolframite-conduit", {
    load(){
        for(int i = 0; i < topRegions.length; i++){
            botRegions[i] = Core.atlas.find(this.name + "-bottom-" + i);
        }
    },
    
    draw(tile){
        Draw.rect(botRegions[bits[0]], req.drawx(), req.drawy(), botRegions[bits[0]].getWidth() * Draw.scl * req.animScale, botRegions[bits[0]].getHeight() * Draw.scl * req.animScale, req.rotation * 90);
    }
});