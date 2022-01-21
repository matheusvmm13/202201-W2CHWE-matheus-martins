const rows = 30;
const columns = 30;

function createWorld() {
  const world = document.querySelector(".world");
  const table = document.createElement("table");
  table.setAttribute("class", "--worldgrid");

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("td");
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  world.appendChild(table);
}

window.onload = () => {
  createWorld();
};
