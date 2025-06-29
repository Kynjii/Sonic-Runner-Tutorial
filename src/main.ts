import k from "./kaplayCrtx";
import { makeSonic } from "./entities";

k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("sonic", "graphics/sonic.png", {
    sliceX: 8,
    sliceY: 2,
    anims: {
        run: { from: 0, to: 7, loop: true, speed: 30 },
        jump: { from: 8, to: 15, loop: true, speed: 100 },
    },
});
k.loadSound("jump", "sounds/Jump.wav");

k.scene("game", () => {
    k.setGravity(3100);

    // Background objects
    const bgPiecesWidth = 2880;
    const bgPieces = [k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.opacity(0.8), k.scale(1.5)]), k.add([k.sprite("chemical-bg"), k.pos(bgPiecesWidth, 0), k.opacity(0.8), k.scale(1.5)])];

    // Platform objects
    const platformWidth = 2560;
    const platforms = [k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(2)]), k.add([k.sprite("platforms"), k.pos(platformWidth, 450), k.scale(2)])];

    // Sonic entity
    const sonic = makeSonic(k.vec2(100, 100));
    sonic.setControls();
    sonic.setEvents();

    // static body for the platforms
    k.add([k.rect(1280, 200), k.opacity(0), k.pos(0, 641), k.area(), k.body({ isStatic: true })]);

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
