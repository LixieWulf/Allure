const bluewolfConduit = extendContent(Conduit, "bluewolframite-conduit", {
    load(){
        for(int i = 0; i < topRegions.length; i++){
            botRegions[i] = Core.atlas.find(this.name + "-bottom-" + i);
        }
    },
    
    draw(tile){
        Draw.colorl(0.34f);
        Draw.alpha(0.5f);
        Draw.rect(botRegions[bits[0]], tile.drawx(), tile.drawy(), botRegions[bits[0]].getWidth() * Draw.scl * tile.animScale, botRegions[bits[0]].getHeight() * Draw.scl * tile.animScale, tile.rotation * 90);
        Draw.color();
        
        Draw.rect(topRegions[bits[0]], tile.drawx(), tile.drawy(), topRegions[bits[0]].getWidth() * Draw.scl * tile.animScale, topRegions[bits[0]].getHeight() * Draw.scl * tile.animScale, tile.rotation * 90);
    }
});