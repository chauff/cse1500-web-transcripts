const Game = require("../game");

test("valid transition", () => {
    expect(Game.prototype.isValidTransition(null, null)).toBe(false);
    expect(Game.prototype.isValidTransition("1 JOINT", "2 JOINT")).toBe(true);
    expect(Game.prototype.isValidTransition("1 JOINT", "ABORTED")).toBe(false);
});

test("valid state", () => {
    expect(Game.prototype.isValidState("")).toBe(false);
    expect(Game.prototype.isValidState("ABORTED")).toBe(true);
    expect(Game.prototype.isValidState({ one: 1 })).toBe(false);
});

test("set status", () => {
    const g = new Game(1);
    expect(g.id).toBe(1);
    expect(g.gameState).toBe("0 JOINT");

    g.setStatus("1 JOINT");// possible

    expect(g.gameState).toBe("1 JOINT");

    g.setStatus("ABORTED");// 1 JOINT -> ABORTED is not possible, gameState remains the same
    expect(g.gameState).toBe("1 JOINT");
});


test("set word", () => {
    const g = new Game(1);
    // TODO: use proper mockups of the WebSocket object
    g.addPlayer("1");
    g.addPlayer("2");

    expect(g.gameState).toBe("2 JOINT");
    g.setWord("garden");
    expect(g.wordToGuess).toBe("garden");
});
