const tracker = require("../statTracker");

test("object exists", () => {
  expect(tracker).toHaveProperty("gamesAborted");
});
