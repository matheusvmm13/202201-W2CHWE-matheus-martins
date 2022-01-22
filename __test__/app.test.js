const rows = 20;
const columns = 20;
const currentGeneration = [rows];

const createGenerationArray = () => {
  for (let i = 0; i < rows; i++) {
    currentGeneration[i] = new Array(columns);
  }
  console.log(currentGeneration);
  return currentGeneration;
};

createGenerationArray();

describe("Given a createGenerationArray", () => {
  describe("When it receives currentGeneration rows", () => {
    test("Then it should return a new array inside each position of currentGeneration", () => {
      // Arrange
      const fruits = ["melons", "apples", "pines"];
      const expectedPosition = 1;

      // Act
      const generationArray = createGenerationArray();

      // Assert
      expect(generationArray).toBe(expectedPosition);
    });
  });
});
