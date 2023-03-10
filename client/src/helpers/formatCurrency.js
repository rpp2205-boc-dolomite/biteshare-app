export default function (amt) {
  if (amt === undefined || Number.isNaN(amt)) { return 'NaN' }
  return '$' + amt.toFixed(2).toString();
}