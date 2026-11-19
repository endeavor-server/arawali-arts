/* First-party, cookieless pageview counter. No IP or identifier is stored. */
(function () {
  try {
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
    var payload = JSON.stringify({
      p: location.pathname + location.search,
      r: document.referrer ? document.referrer.slice(0, 300) : ''
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/pv', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/pv', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: payload }).catch(function () {});
    }
  } catch (e) { /* analytics must never break the page */ }
})();
