function renderWorks(works) {

  table.innerHTML = "";

  works.forEach((work, index) => {

    const workEl = document.createElement("div");
    workEl.classList.add("work");

    const img = document.createElement("img");
    img.src = work.image;

    const x =
      Math.random() *
      (work.xMax - work.xMin) +
      work.xMin;

    const y =
      Math.random() *
      (work.yMax - work.yMin) +
      work.yMin;

    const rotation =
      Math.random() *
      (work.rotationMax - work.rotationMin) +
      work.rotationMin;

    workEl.style.left = `${x}%`;
    workEl.style.top = `${y}%`;

    workEl.style.width = `${work.width}px`;

    workEl.style.transform =
      `rotate(${rotation}deg)`;

    workEl.style.zIndex = work.z;

    workEl.appendChild(img);

    workEl.addEventListener("click", () => {

      highestZ++;

      workEl.style.zIndex = highestZ;

    });

    enableDrag(workEl);

    table.appendChild(workEl);

  });

}
