import assert from "node:assert/strict";
import combo = require("..");

suite("combo", function () {
  test("1 item array", function () {
    const out = combo(["a"]);
    assert.deepEqual(out, [["a"]]);
  });

  test("2 item array", function () {
    const out = combo(["a", "b"]);
    assert.deepEqual(out, [["a"], ["b"], ["a", "b"]]);
  });

  test("3 item array", function () {
    const out = combo(["a", "b", "c"]);
    assert.deepEqual(out, [
      ["a"],
      ["b"],
      ["c"],
      ["a", "b"],
      ["a", "c"],
      ["b", "c"],
      ["a", "b", "c"],
    ]);
  });

  test("4 item array with min 2 and max 3 elements", function () {
    const out = combo(["a", "b", "c", "d"], 2, 3);
    assert.deepEqual(out, [
      ["a", "b"],
      ["a", "c"],
      ["a", "d"],
      ["b", "c"],
      ["b", "d"],
      ["c", "d"],
      ["a", "b", "c"],
      ["a", "b", "d"],
      ["a", "c", "d"],
      ["b", "c", "d"],
    ]);
  });

  test("5 item array with min 2 and max 3 elements", function () {
    const out = combo(["a", "b", "c", "d", "e"], 2, 3);
    assert.deepEqual(out, [
      ["a", "b"],
      ["a", "c"],
      ["a", "d"],
      ["a", "e"],
      ["b", "c"],
      ["b", "d"],
      ["b", "e"],
      ["c", "d"],
      ["c", "e"],
      ["d", "e"],
      ["a", "b", "c"],
      ["a", "b", "d"],
      ["a", "b", "e"],
      ["a", "c", "d"],
      ["a", "c", "e"],
      ["a", "d", "e"],
      ["b", "c", "d"],
      ["b", "c", "e"],
      ["b", "d", "e"],
      ["c", "d", "e"],
    ]);
  });

  test("duplicates are handled positionally", function () {
    const out = combo(["a", "a", "b"]);
    assert.deepEqual(out, [
      ["a"],
      ["a"],
      ["b"],
      ["a", "a"],
      ["a", "b"],
      ["a", "b"],
      ["a", "a", "b"],
    ]);
  });

  test("size bounds are clamped to valid range", function () {
    const out = combo(["a", "b"], -10, 99);
    assert.deepEqual(out, [["a"], ["b"], ["a", "b"]]);
  });

  test("impossible ranges return an empty array", function () {
    const out = combo(["a", "b"], 3, 1);
    assert.deepEqual(out, []);
  });

  test("non-array input throws TypeError", function () {
    assert.throws(
      () => combo("abc" as unknown as string[]),
      /Expected first argument to be an array/,
    );
  });
});
