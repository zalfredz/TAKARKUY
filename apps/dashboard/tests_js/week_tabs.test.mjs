import assert from 'node:assert/strict';
import test from 'node:test';
import {selectDay, initWeekTabs} from '../static/dashboard/week_tabs.mjs';

function build(n = 3) {
  const panels = new Map(), tabs = [];
  for (let i = 0; i < n; i++) {
    const attrs = {'aria-controls': `day-panel-${i}`};
    const tab = {attrs, listeners: {}, focused: false, hidden: false,
      setAttribute(k, v) { attrs[k] = String(v); }, getAttribute: k => attrs[k],
      addEventListener(type, fn) { this.listeners[type] = fn; }, focus() { this.focused = true; }};
    tabs.push(tab); panels.set(`day-panel-${i}`, {hidden: false});
  }
  const list = {querySelectorAll: () => tabs, addEventListener(type, fn) { this.listener = fn; }};
  const doc = {getElementById: id => panels.get(id)};
  return {list, tabs, panels, doc};
}

test('selectDay hides other panels and moves focus', () => {
  const {list, tabs, panels, doc} = build();
  selectDay(list, 2, doc);
  assert.equal(tabs[2].attrs['aria-selected'], 'true');
  assert.equal(tabs[0].attrs['aria-selected'], 'false');
  assert.equal(tabs[2].attrs.tabindex, '0');
  assert.equal(tabs[0].attrs.tabindex, '-1');
  assert.equal(panels.get('day-panel-0').hidden, true);
  assert.equal(panels.get('day-panel-1').hidden, true);
  assert.equal(panels.get('day-panel-2').hidden, false);
});

test('arrow keys wrap, Home/End jump, click selects', () => {
  const {list, tabs, doc} = build();
  initWeekTabs(list, doc);
  selectDay(list, 2, doc);
  list.listener({key: 'ArrowRight', target: tabs[2], preventDefault() {}});
  assert.equal(tabs[0].attrs['aria-selected'], 'true'); assert.ok(tabs[0].focused);
  list.listener({key: 'ArrowLeft', target: tabs[0], preventDefault() {}});
  assert.equal(tabs[2].attrs['aria-selected'], 'true');
  list.listener({key: 'Home', target: tabs[2], preventDefault() {}});
  assert.equal(tabs[0].attrs['aria-selected'], 'true');
  list.listener({key: 'End', target: tabs[0], preventDefault() {}});
  assert.equal(tabs[2].attrs['aria-selected'], 'true');
  tabs[1].listeners.click();
  assert.equal(tabs[1].attrs['aria-selected'], 'true');
});
