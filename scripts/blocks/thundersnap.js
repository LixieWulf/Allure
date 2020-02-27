const thundersnap = new ChargeTurret("thundersnap");


thundersnap.shootType = extend(BasicBulletType, {
    draw(b) { },

    init(b){
        if (b == null) return;
        const amount = 4 + Math.floor(Math.random() * 6)
        const damagePerOne = this.damage / amount;
        for (var i = 0; i != amount; ++i) {
            Lightning.create(b.getTeam(), Pal.lancerLaser, damagePerOne, b.x, b.y, b.rot(), 500 + Math.floor(Math.random() * 100));
        };
    }
});

thundersnap.shootType.lifetime = 30;
thundersnap.shootType.damage = 5000;
thundersnap.shootType.despawnEffect = Fx.none;
thundersnap.shootType.hitEffect = Fx.hitLancer;