const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
export const LOCATION_LABELS = {chiller: "Kulkas", kulkas: "Kulkas", freezer: "Freezer", suhu_ruang: "Suhu Ruang"};

function daysUntil(expiresOn, today) {
  return Math.round((Date.parse(`${expiresOn}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000);
}

const isUnknown = (expiresOn, source) => !expiresOn || source === "unknown";

export function stockGroup(expiresOn, source, today) {
  if (isUnknown(expiresOn, source)) return "unknown";
  const days = daysUntil(expiresOn, today);
  return days < 0 ? "expired" : days <= 2 ? "soon" : "ok";
}

export function expiryLabel(expiresOn, source, today) {
  if (isUnknown(expiresOn, source)) return "Tgl ?";
  const days = daysUntil(expiresOn, today);
  if (days < 0) return "Lewat";
  if (days === 0) return "Hari ini";
  if (days <= 30) return `${days} hari`;
  return `${Number(expiresOn.slice(8, 10))} ${MONTHS[Number(expiresOn.slice(5, 7)) - 1]}`;
}

export function matchesFilter(row, filter) {
  if (filter === "all") return true;
  if (filter === "soon") return row.group === "soon" || row.group === "expired";
  if (filter === "unknown") return row.group === "unknown";
  return LOCATION_LABELS[row.location] === LOCATION_LABELS[filter];
}
