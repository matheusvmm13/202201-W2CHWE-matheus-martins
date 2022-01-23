let rows = 20;
let columns = 20;
const currentGeneration = [rows];
const nextGeneration = [columns];
let neighborCount = 0;

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
  console.log(currentGeneration); // test
};

window.onload = () => {
  createWorld();
  createGenerationArray();
  startGenerationArray();
};

function getNeighborCount(rows, columns) {
  const numberRow = Number(rows);
  const numberColumns = Number(columns);

  // Check we're not in the 1st row
  if (numberRow - 1 >= 0) {
    if (currentGeneration[numberRow - 1][numberColumns] === 1) {
      neighborCount++;
      console.log(`neighbor count: ${neighborCount}`);
    }
  }

  // not in the first cell
  if (numberRow - 1 >= 0 && numberColumns - 1 >= 0) {
    // Check top-left neighbor
    if (currentGeneration[numberRow - 1][numberColumns - 1] === 1) {
      neighborCount++;
      console.log(`neighbor count: ${neighborCount}`);
    }
  }

  // not on the first row last column
  if (numberRow - 1 >= 0 && numberColumns + 1 < columns) {
    // Check top-righ neighbor
    if (currentGeneration[numberRow - 1][numberColumns + 1] === 1) {
      neighborCount++;
      console.log(`neighbor count: ${neighborCount}`);
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
      console.log(`neighbor count: ${neighborCount}`);
    }
  }

  // not on the bottom left corner
  if (numberRow + 1 < rows && numberColumns - 1 >= 0) {
    // Check bottom-left neighbor
    if (currentGeneration[numberRow + 1][numberColumns - 1] === 1) {
      neighborCount++;
      console.log(`neighbor count: ${neighborCount}`);
    }
  }

  if (numberRow + 1 < rows && numberColumns + 1 < columns) {
    // Check bottom-righ neighbor
    if (currentGeneration[numberRow + 1][numberColumns + 1] === 1) {
      neighborCount++;
      console.log(`neighbor count: ${neighborCount}`);
    }
  }

  // not on the last row
  if (numberRow + 1 < rows) {
    // Check bottom neighbor
    if (currentGeneration[numberRow + 1][numberColumns] === 1) {
      neighborCount++;
      console.log(`neighbor count: ${neighborCount}`);
    }
  }
  return neighborCount;
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
            } else if (neighbor < 2) {
              // Any live cell with fewer than 2 live neighbours, dies.
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
}

function updateCurrentGeneration() {
  for (rows in currentGeneration) {
    if (Object.hasOwnProperty.call(currentGeneration, rows)) {
      for (columns in currentGeneration[rows]) {
        if (Object.hasOwnProperty.call(currentGeneration, columns)) {
          currentGeneration[rows][columns] = nextGeneration[rows][columns];
          // nextGeneration[rows][columns] = 0;
        }
      }
    }
  }
}

function updateWorld() {
  let clickedCell = "";

  for (rows in currentGeneration) {
    if (Object.hasOwnProperty.call(currentGeneration, rows)) {
      for (columns in currentGeneration[rows]) {
        if (Object.hasOwnProperty.call(currentGeneration, columns)) {
          if (currentGeneration[rows][columns] === 0) {
            clickedCell = document.getElementById(`${rows}_${columns}`);
            clickedCell.setAttribute("class", "dead");
          } else {
            clickedCell.setAttribute("class", "live");
          }
        }
      }
    }
  }
}

function evolve() {
  createNextGeneration(); // Apply the rules
  updateCurrentGeneration(); // Set Current values from new generation
  updateWorld(); // Update the world view
}
