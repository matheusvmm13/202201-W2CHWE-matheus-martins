const rows = 20;
const columns = 20;

const createWorld = () => {
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
};

window.onload = () => {
  createWorld();
};

const currentGeneration = [rows];
const nextGeneration = [columns];

const createGenerationArray = () => {
  for (let i = 0; i < rows; i++) {
    currentGeneration[i] = new Array(columns);
    nextGeneration[i] = new Array(columns);
  }
  console.log(currentGeneration);
};

const startGenerationArray = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      currentGeneration[i][j] = 0;
      nextGeneration[i][j] = 0;
    }
  }
};

createGenerationArray();
startGenerationArray();
