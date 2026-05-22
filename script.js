const table = document.getElementById("table");
const toolbox = document.getElementById("toolbox");

/* LOAD WORKS */

async function loadWorks() {

  const response = await fetch("./data/works.json");
  const works = await response.json();

  renderWorks(works);
}

/* RENDER WORKS */

function renderWorks(works) {

  table.innerHTML = "";

  works.forEach((work, index) => {

    const workEl = document.createElement("div");
    workEl.classList.add("work");

    const img = document.createElement("img");
    img.src = work.image;

const x =
  Math.random() * (work.xMax - work.xMin)
  + work.xMin;

const y =
  Math.random() * (work.yMax - work.yMin)
  + work.yMin;

workEl.style.left = `${x}%`;
workEl.style.top = `${y}%`;

workEl.style.width = `${work.width}px`;

const rotation =
  Math.random() *
  (work.rotationMax - work.rotationMin)
  + work.rotationMin;

workEl.style.transform =
  `rotate(${rotation}deg)`;

workEl.style.zIndex = work.z;

    workEl.appendChild(img);

    workEl.addEventListener("click", () => {

  if (hasMoved) return;

  window.location.href = `/projects/${work.project}/`;
});

    enableDrag(workEl);

    table.appendChild(workEl);

  });
}

/* DRAG FUNCTION */

function enableDrag(element) {

  let isDragging = false;
  let hasMoved = false;

  let offsetX = 0;
  let offsetY = 0;

element.addEventListener("mousedown", (e) => {

  isDragging = true;
  hasMoved = false;

    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    element.style.zIndex = 9999;
  });

document.addEventListener("mousemove", (e) => {

  if (!isDragging) return;

  hasMoved = true;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    const maxX = window.innerWidth - element.offsetWidth;
    const maxY = window.innerHeight - element.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

/* MAKE TOPBAR DRAGGABLE */

enableDrag(toolbox);

/* START */

loadWorks();
