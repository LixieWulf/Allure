const solarflare = new LaserTurret("solarflare");


solarflare.shootType = extend(BulletType{
    Color tmpColor = new Color();
    colors = [Color.valueOf("e6c04555"), Color.valueOf("f7d95eaa"), Color.valueOf("ffec6e"), Color.white]
    tscales = [1, 0.7, 0.5, 0.2]
    strokes = [2, 1.5, 1, 0.3]
    lenscales = [1, 1.12, 1.15, 1.17]
    float length = 560
});

solarflare.shootType.lifetime = 16;
solarflare.shootType.damage = 5;
solarflare.shootType.despawnEffect = Fx.none;
solarflare.shootType.hitEffect = Fx.hitMeltdown;
solarflare.shootType.pierce = true;
solarflare.shootType.drawSize = 420;
solarflare.shootType.hitSize = 4;
