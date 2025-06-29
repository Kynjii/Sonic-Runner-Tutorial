import kaplay from "kaplay";

const k = kaplay({
    width: 1280,
    height: 720,
    letterbox: true,
    global: false,
    buttons: {
        jump: {
            keyboard: ["space"],
            mouse: "left",
        },
    },
    touchToMouse: true,
    debug: true,
    pixelDensity: window.devicePixelRatio,
    background: [0, 0, 0],
});

export default k;
