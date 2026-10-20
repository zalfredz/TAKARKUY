// Week calendar tabs. Without JS every day panel stays visible; JS hides all but one.
export function selectDay(tablist, index, doc = document) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab, i) => {
    const on = i === index;
    tab.setAttribute('aria-selected', on);
    tab.setAttribute('tabindex', on ? '0' : '-1');
    const panel = doc.getElementById(tab.getAttribute('aria-controls'));
    if (panel) panel.hidden = !on;
  });
}

export function initWeekTabs(tablist, doc = document) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab, i) => tab.addEventListener('click', () => selectDay(tablist, i, doc)));
  tablist.addEventListener('keydown', event => {
    const at = tabs.indexOf(event.target);
    const next = {ArrowRight: (at + 1) % tabs.length, ArrowLeft: (at - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1}[event.key];
    if (at < 0 || next === undefined) return;
    event.preventDefault(); selectDay(tablist, next, doc); tabs[next].focus();
  });
  selectDay(tablist, 0, doc);
}

if (typeof document !== 'undefined') {
  const tablist = document.querySelector('.week-tabs');
  if (tablist) initWeekTabs(tablist);
}
