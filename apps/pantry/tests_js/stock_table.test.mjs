import assert from "node:assert/strict";
import test from "node:test";
import {expiryLabel, matchesFilter, stockGroup} from "../static/pantry/stock_table.mjs";

const today = "2026-10-20";

test("stockGroup follows the two-day soon rule", () => {
  assert.equal(stockGroup("2026-10-19", "estimate", today), "expired");
  assert.equal(stockGroup("2026-10-20", "estimate", today), "soon");
  assert.equal(stockGroup("2026-10-22", "estimate", today), "soon");
  assert.equal(stockGroup("2026-10-23", "estimate", today), "ok");
  assert.equal(stockGroup("", "unknown", today), "unknown");
  assert.equal(stockGroup("2026-10-23", "unknown", today), "unknown");
  assert.equal(stockGroup("", "manual", today), "unknown");
});

test("expiryLabel is short and Indonesian", () => {
  assert.equal(expiryLabel("2026-10-19", "manual", today), "Lewat");
  assert.equal(expiryLabel("2026-10-20", "manual", today), "Hari ini");
  assert.equal(expiryLabel("2026-10-21", "manual", today), "1 hari");
  assert.equal(expiryLabel("2026-10-22", "manual", today), "2 hari");
  assert.equal(expiryLabel("2026-11-19", "manual", today), "30 hari");
  assert.equal(expiryLabel("2026-11-20", "manual", today), "20 Nov");
  assert.equal(expiryLabel("", "unknown", today), "Tgl ?");
});

test("matchesFilter: soon includes expired, locations accept kulkas or chiller", () => {
  assert.equal(matchesFilter({group: "expired", location: "kulkas"}, "soon"), true);
  assert.equal(matchesFilter({group: "ok", location: "freezer"}, "kulkas"), false);
  assert.equal(matchesFilter({group: "ok", location: "chiller"}, "kulkas"), true);
  assert.equal(matchesFilter({group: "unknown", location: "suhu_ruang"}, "unknown"), true);
  assert.equal(matchesFilter({group: "ok", location: "suhu_ruang"}, "all"), true);
});
