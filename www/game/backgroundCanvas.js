(() => {
  /** @type {HTMLCanvasElement} */
  const canvas = document.querySelector(".background-canvas");
  const ctx = canvas.getContext("2d");

  let isMouseDown = false;

  document.addEventListener("mousedown", () => { isMouseDown = true; });
  document.addEventListener("mouseup", () => { isMouseDown = false; });
  document.addEventListener("mouseleave", () => { isMouseDown = false; });

  /** @type {Set<{x:number,y:number,t:number}>} */
  const data = new Set();

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    data.forEach((i) => {
      ctx.beginPath();
      let b = randomInteger(220, 255)
      ctx.fillStyle = `rgba(${b},${b},${b}, 0.1)`;
      ctx.arc(i.x, i.y, 20, 0, 2 * Math.PI, false);
      ctx.fill();
    });
  }, 1000/30)

  setInterval(() => {
    data.forEach((i) => {
      i.t += 1;
      if (i.t > 60) data.delete(i);
    });
  }, 20);


  canvas.addEventListener("mousemove", (e) => {
    if (isMouseDown) data.add({ x: e.x, y: e.y, t: 0 });
  });

  window.data = data;

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  })

  function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();