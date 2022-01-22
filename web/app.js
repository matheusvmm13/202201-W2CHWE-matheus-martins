/* eslint-disable prefer-template */
let rows = 20;
let columns = 20;
const currentGeneration = [rows];
const nextGeneration = [columns];

function cellClick() {
  const location = this.id.split("_"); // splits the string id into an array.
  const row = Number(location[0]); // Get i
  const col = Number(location[1]); // Get j

  if (this.className === "live") {
    currentGeneration[row][col] = false;
    this.setAttribute("class", "dead");
  } else if (this.className === "dead") {
    currentGeneration[row][col] = true;
    this.setAttribute("class", "live");
  }
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
      cell.setAttribute("id", i + "_" + j);
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
  console.log(currentGeneration); // test
};

const startGenerationArray = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      currentGeneration[i][j] = false;
      nextGeneration[i][j] = false;
    }
  }
};

window.onload = () => {
  createWorld();
  createGenerationArray();
  startGenerationArray();
};

function getNeighborCount() {
  let neighborCount = 0;
  const numberRow = Number(rows);
  const numberColumns = Number(columns);

  // Check we're not in the 1st row
  if (numberRow - 1 >= 0) {
    // not the first row
    if (numberColumns - 1 >= 0) {
      // Check top neighbor
      console.log("Entrei..."); // test
      if (currentGeneration[numberRow - 1][numberColumns] === 1) {
        neighborCount++;
      }
    }
  }

  // not in the first cell
  if (numberRow - 1 >= 0 && numberColumns - 1 >= 0) {
    // Check top-left neighbor
    if (currentGeneration[numberRow - 1][numberColumns - 1] === 1) {
      neighborCount++;
    }
  }

  // not on the first row last column
  if (numberRow - 1 >= 0 && numberColumns + 1 < columns) {
    // Check top-righ neighbor
    if (currentGeneration[numberRow - 1][numberColumns + 1] === 1) {
      neighborCount++;
    }
  }

  /* // not the first column
  if (numberColumns - 1 >= 0) {
    // Check left neighbor
    if (currentGeneration[numberRow][numberColumns - 1] === 1) {
      neighborCount++;
    }
  } */

  // not the last column
  if (numberColumns + 1 < columns) {
    // Check righ neighbor
    if (currentGeneration[numberRow][numberColumns + 1] === 1) {
      neighborCount++;
    }
  }

  // not on the bottom left corner
  if (numberRow + 1 < rows && numberColumns - 1 >= 0) {
    // Check bottom-left neighbor
    if (currentGeneration[numberRow + 1][numberColumns - 1] === 1) {
      neighborCount++;
    }
  }

  if (numberRow + 1 < rows && numberColumns + 1 < columns) {
    // Check bottom-righ neighbor
    if (currentGeneration[numberRow + 1][numberColumns + 1] === 1) {
      neighborCount++;
    }
  }

  // not on the last row
  if (numberRow + 1 < rows) {
    // Check bottom neighbor
    if (currentGeneration[numberRow + 1][numberColumns] === 1) {
      neighborCount++;
    }
  }

  return neighborCount;
}

// getNeighborCount();

function createNextGeneration() {
  const neighbor = getNeighborCount(rows, columns);

  for (rows in currentGeneration) {
    if (Object.hasOwnProperty.call(currentGeneration, rows)) {
      for (columns in currentGeneration) {
        if (Object.hasOwnProperty.call(currentGeneration, columns)) {
          if (currentGeneration[rows][columns] === 1) {
            // It's alive
            if (neighbor === 2 || neighbor === 3) {
              // Any live cell with 2 or 3 live neighbours, lives on to the next generation.
              nextGeneration[rows][columns] = 1;
            } else if (neighbor < 2) {
              // Any live cell with fewer than 2 live neighbours, dies.
              nextGeneration[rows][columns] = 0;
            } else if (neighbor > 3) {
              // Any live cell with more than 3 live neighbours, dies.
              nextGeneration[rows][columns] = 0;
            }
          }

          if (nextGeneration[rows][columns] === 0) {
            // It's dead
            if (neighbor === 3) {
              nextGeneration[rows][columns] = 1; // Any dead cell with exactly 3 live neighbours, becomes a live cell.
            }
          }
        }
      }
    }
  }
}

// createNextGeneration();

function updateCurrentGeneration() {
  for (rows in currentGeneration) {
    if (Object.hasOwnProperty.call(currentGeneration, rows)) {
      for (columns in currentGeneration) {
        if (Object.hasOwnProperty.call(currentGeneration, columns)) {
          currentGeneration[rows][columns] = nextGeneration[rows][columns];
        }
      }
    }
  }
  nextGeneration[rows][columns] = 0;
  console.log(nextGeneration);
}

// updateCurrentGeneration();

function updateWorld() {
  const cell = "";
  for (rows in currentGeneration) {
    if (Object.hasOwnProperty.call(currentGeneration, rows)) {
      document.getElementById(`${rows}_${columns}`);
      if (currentGeneration[rows][columns] === 0) {
        cell.setAttribute("id", "dead");
      } else {
        cell.setAttribute("class", "live");
      }
    }
  }
}

// updateWorld();

function evolve() {
  createNextGeneration(); // Apply the rules
  updateCurrentGeneration(); // Set Current values from new generation
  updateWorld(); // Update the world view
}
