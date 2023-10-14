
gsap.registerPlugin(
  ScrollTrigger,
  Observer,
  ScrollSmoother
);

ScrollSmoother.create({
  normalizeScroll: true,
  smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: false, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

const canvas = document.querySelector("#bg-canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

window.addEventListener("resize", () => init());

let delta = 40;

init();
requestAnimationFrame(draw);

function init() {
  console.log("init");
  
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
}

function draw() {
  delta += 0.1;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let purple = ctx.createLinearGradient(0, 0, 0, canvas.height);
  purple.addColorStop(0, "#524185");
  purple.addColorStop(0.5, "#383979");
  purple.addColorStop(1, "#2A2B67");

  ctx.fillStyle = purple;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //orange
  let orange = ctx.createLinearGradient(0, 0, 0, 100);
  orange.addColorStop(0, "#FFE29E");
  orange.addColorStop(1, "#E9978A");

  ctx.fillStyle = orange;

  let orangePath = new Path2D();
  orangePath.moveTo(0, 0);
  for (let i = 0; i < canvas.width + 1; i++) {
    let y =
      canvas.height / 3 + Math.sin(i / 50) * (40 * Math.sin(delta * 0.03));
    y += Math.sin(i / 100) * (50 * Math.sin(delta * 0.02));
    orangePath.lineTo(i, y);
  }
  orangePath.lineTo(canvas.width, 0);
  orangePath.closePath();
  ctx.fill(orangePath);

  //white
  let white = ctx.createLinearGradient(
    canvas.width,
    canvas.height / 2,
    0,
    canvas.height
  );
  white.addColorStop(0, "#B3B0D5");
  white.addColorStop(0.7, "#F1F0F7");
  white.addColorStop(1, "#FDFCFD");

  ctx.fillStyle = white;

  let whitePath = new Path2D();
  whitePath.moveTo(0, canvas.height);
  for (let i = 0; i < canvas.width + 1; i++) {
    let y =
      (canvas.height / 3) * 2 +
      Math.sin(i / 200) * (100 * Math.sin(delta * 0.04));
    y += Math.sin(i / 50) * (40 * Math.sin(delta * 0.01));
    whitePath.lineTo(i, y);
  }
  whitePath.lineTo(canvas.width, canvas.height);
  whitePath.closePath();
  ctx.fill(whitePath);

  requestAnimationFrame(draw);
}