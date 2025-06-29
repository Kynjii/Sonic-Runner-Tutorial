import k from "./kaplayCrtx";

k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");

k.scene("game", () => {
    const bgPiecesWidth = 2880;
    const bgPieces = [k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.opacity(0.8), k.scale(1.5)]), k.add([k.sprite("chemical-bg"), k.pos(bgPiecesWidth, 0), k.opacity(0.8), k.scale(1.5)])];

    const platformWidth = 2560;
    const platforms = [k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(2)]), k.add([k.sprite("platforms"), k.pos(platformWidth, 450), k.scale(2)])];

    k.onUpdate(() => {
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPiecesWidth * 2, 0);

            const frontBgPiece = bgPieces.shift();

            if (frontBgPiece) bgPieces.push(frontBgPiece);
        }

        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPiecesWidth * 2, 0);

        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWidth, platforms[1].pos.y);

            const frontPlatform = platforms.shift();

            if (frontPlatform) platforms.push(frontPlatform);
        }

        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth, platforms[0].pos.y);
    });

    let gameSpeed = 100;
    k.loop(1, () => {
        gameSpeed += 50;
    });
});

k.scene("game-over", () => {
    // TODO
});

k.go("game");
