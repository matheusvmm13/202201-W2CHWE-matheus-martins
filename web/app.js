let rows = 15;
let columns = 15;
const currentGeneration = [rows];
const nextGeneration = [columns];

function cellClick() {
  const location = this.id.split("_"); // splits the string id into an array.
  const rowLocation = Number(location[0]); // Get i
  const colLocation = Number(location[1]); // Get j

  if (this.className === "live") {
    currentGeneration[rowLocation][colLocation] = 0;
    this.setAttribute("class", "dead");
  } else if (this.className === "dead") {
    currentGeneration[rowLocation][colLocation] = 1;
    this.setAttribute("class", "live");
  }
  return currentGeneration;
}

const createWorld = () => {
  const world = document.querySelector(".world");
  const table = document.createElement("table");
  table.setAttribute("class", "--worldgrid");

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("td");
      cell.addEventListener("click", cellClick);
      cell.setAttribute("id", `${i}_${j}`);
      cell.setAttribute("class", "dead");
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  world.appendChild(table);
};

const createGenerationArray = () => {
  for (let i = 0; i < rows; i++) {
    currentGeneration[i] = new Array(columns);
    nextGeneration[i] = new Array(columns);
  }
};

const startGenerationArray = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      currentGeneration[i][j] = 0;
      nextGeneration[i][j] = 0;
    }
  }
  console.log(`current generation: ${currentGeneration}`); // test
};

window.onload = () => {
  createWorld();
  createGenerationArray();
  startGenerationArray();
};

function getNeighborCount(i, j) {
  let neighborCount = 0;
  const numberRow = Number(i);
  const numberColumns = Number(j);

  if (numberRow - 1 >= 0) {
    if (currentGeneration[numberRow - 1][numberColumns] === 1) neighborCount++;
  }
  if (numberRow - 1 >= 0 && numberColumns - 1 >= 0) {
    if (currentGeneration[numberRow - 1][numberColumns - 1] === 1)
      neighborCount++;
  }

  if (numberRow - 1 >= 0 && numberColumns + 1 < columns) {
    if (currentGeneration[numberRow - 1][numberColumns + 1] === 1)
      neighborCount++;
  }

  if (numberColumns - 1 >= 0) {
    if (currentGeneration[numberRow][numberColumns - 1] === 1) neighborCount++;
  }

  if (numberColumns + 1 < columns) {
    if (currentGeneration[numberRow][numberColumns + 1] === 1) neighborCount++;
  }

  if (numberRow + 1 < rows && numberColumns - 1 >= 0) {
    if (currentGeneration[numberRow + 1][numberColumns - 1] === 1)
      neighborCount++;
  }

  if (numberRow + 1 < rows && numberColumns + 1 < columns) {
    if (currentGeneration[numberRow + 1][numberColumns + 1] === 1)
      neighborCount++;
  }

  if (numberRow + 1 < rows) {
    if (currentGeneration[numberRow + 1][numberColumns] === 1) neighborCount++;
  }
  return neighborCount;
}

function ArrayNeighborRun() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const neighborsNew = getNeighborCount(i, j);
      console.log(neighborsNew);

      const cell = document.getElementById(`${i}_${j}`);

      if (currentGeneration[i][j] === 1) {
        if (neighborsNew === 2 || neighborsNew === 3) {
          nextGeneration[i][j] = 1;
        } else if (neighborsNew < 2) {
          nextGeneration[i][j] = 0;
          cell.classList.remove("live");
          cell.classList.add("dead");
        } else if (neighborsNew > 3) {
          nextGeneration[i][j] = 0;
          cell.classList.remove("live");
          cell.classList.add("dead");
        }
      }
      if (currentGeneration[i][j] === 0) {
        if (neighborsNew === 3) {
          nextGeneration[i][j] = 1;
          cell.classList.remove("dead");
          cell.classList.add("live");
        }
      }
    }
  }
}

function createNextGeneration() {
  for (rows in currentGeneration) {
    if (Object.hasOwnProperty.call(currentGeneration, rows)) {
      for (columns in currentGeneration[rows]) {
        if (Object.hasOwnProperty.call(currentGeneration, columns)) {
          const neighbor = getNeighborCount(rows, columns);

          if (currentGeneration[rows][columns] === 1) {
            // It's alive
            if (neighbor === 2 || neighbor === 3) {
              // Any live cell with 2 or 3 live neighbours, lives on to the next generation.
              nextGeneration[rows][columns] = 1;
              console.log("I can live");
            } else if (neighbor < 2) {
              // Any live cell with fewer than 2 live neighbours, dies.
              console.log("I have few neighbors, I died");
              nextGeneration[rows][columns] = 0;
            } else if (neighbor > 3) {
              // Any live cell with more than 3 live neighbours, dies.
              nextGeneration[rows][columns] = 0;
            }
          }

          if (currentGeneration[rows][columns] === 0) {
            // It's dead
            if (neighbor === 3) {
              nextGeneration[rows][columns] = 1; // Any dead cell with exactly 3 live neighbours, becomes a live cell.
            }
          }
        }
      }
    }
  }
  console.log(`this is the next-generation: ${nextGeneration}`);
  return nextGeneration;
}

function updateCurrentGeneration() {
  for (rows in currentGeneration) {
    if (Object.hasOwnProperty.call(currentGeneration, rows)) {
      for (columns in currentGeneration[rows]) {
        if (Object.hasOwnProperty.call(currentGeneration, columns)) {
          // nextGeneration[rows][columns] = currentGeneration[rows][columns];
          currentGeneration[rows][columns] = nextGeneration[rows][columns];
          nextGeneration[rows][columns] = 0;
        }
      }
    }
  }
  console.table(`new current generation${currentGeneration}`);
  return currentGeneration;
}

function updateWorld() {
  let cell = "";

  for (rows in currentGeneration) {
    if (Object.hasOwnProperty.call(currentGeneration, rows)) {
      for (columns in currentGeneration[rows]) {
        if (Object.hasOwnProperty.call(currentGeneration, columns)) {
          if (currentGeneration[rows][columns] === 0) {
            cell = document.getElementById(`${rows}_${columns}`);
            cell.setAttribute("class", "dead");
          } else {
            // cell = document.getElementById(`${rows}_${columns}`);
            cell.setAttribute("class", "live");
          }
        }
      }
    }
  }
}

function TimeOut() {
  setTimeout(() => {
    ArrayNeighborRun();
    createNextGeneration(); // Apply the rules
    updateCurrentGeneration(); // Set Current values from new generation
    updateWorld();
    TimeOut();
  }, 1000);
}

function evolve() {
  ArrayNeighborRun();
  createNextGeneration(); // Apply the rules
  updateCurrentGeneration(); // Set Current values from new generation
  updateWorld(); // Update the world view
  TimeOut();
}

function startEvolution() {
  const evolveButton = document.querySelector(".evolve-button");
  evolveButton.addEventListener("click", evolve);
}

startEvolution();
