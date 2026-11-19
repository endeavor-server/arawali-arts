/* Shared lead capture for RFQ, trade application and sample requests.
   Posts to /api/lead (same origin). Falls back to a prefilled email draft
   if the endpoint is unreachable, so a lead is never silently lost. */
(function () {
  var PRICE_LIST = '/downloads/arawali-wholesale-price-list-2026.csv';

  function cartItems() {
    try {
      var cart = JSON.parse(localStorage.getItem('arawali_rfq_cart_v2') || '{}');
      return Object.keys(cart).map(function (sku) {
        var it = cart[sku] || {};
        return { sku: sku, title: it.title || '', qty: it.qty || 0, cbm: it.cbm || 0 };
      });
    } catch (e) { return []; }
  }

  function val(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? String(el.value || '').trim() : '';
  }

  function status(form, message, tone) {
    var box = form.querySelector('[data-lead-status]');
    if (!box) return;
    box.textContent = message;
    box.hidden = false;
    box.setAttribute('data-tone', tone || 'info');
  }

  function mailtoFallback(payload) {
    var lines = [
      'Type: ' + payload.type,
      'Name: ' + payload.name,
      'Company: ' + payload.company,
      'Email: ' + payload.email,
      'Country: ' + payload.country,
      'Phone: ' + payload.phone,
      '',
      payload.message,
      ''
    ];
    if (payload.items.length) {
      lines.push('Container line items:');
      payload.items.forEach(function (i) {
        lines.push('- ' + i.sku + ' · ' + i.title + ' · ' + i.qty + ' pcs · ' + (i.cbm * i.qty).toFixed(3) + ' CBM');
      });
    }
    return 'mailto:export@arawaliarts.com?subject=' +
      encodeURIComponent('Arawali Arts — ' + payload.type + ' — ' + (payload.company || payload.name)) +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function unlockPriceList(form) {
    var slot = form.querySelector('[data-price-list-slot]');
    if (!slot) return;
    slot.innerHTML = '<a class="lead-unlock-link" href="' + PRICE_LIST + '" download>Download the 2026 wholesale price list (CSV) →</a>' +
      '<p class="lead-unlock-note">FOB Mundra, MOQ and CBM per SKU. Prices are indicative until a signed quote.</p>';
  }

  document.addEventListener('submit', function (event) {
    var form = event.target.closest('form[data-lead-form]');
    if (!form) return;
    event.preventDefault();

    var button = form.querySelector('button[type="submit"]');
    var container = val(form, 'container');
    var payload = {
      type: form.getAttribute('data-lead-form') || 'rfq',
      name: val(form, 'name'),
      company: val(form, 'company'),
      email: val(form, 'email'),
      country: val(form, 'country'),
      phone: val(form, 'phone'),
      message: (container ? 'Container: ' + container + '\n' : '') + val(form, 'message'),
      items: cartItems(),
      page: location.pathname + location.search,
      referrer: document.referrer || ''
    };

    if (payload.name.length < 2 || payload.email.indexOf('@') < 1 || (payload.type !== 'sample' && payload.company.length < 2)) {
      status(form, 'Please add your name, company and a valid work email.', 'error');
      return;
    }

    if (button) { button.disabled = true; button.dataset.label = button.textContent; button.textContent = 'Sending…'; }
    status(form, 'Sending to the Jodhpur export desk…', 'info');

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.body.ok) throw new Error(res.body.error || 'Request failed');
        form.reset();
        status(form, 'Received — reference ' + res.body.id + '. The export desk replies within one business day.', 'success');
        if (payload.type === 'price_list' || payload.type === 'trade_account') unlockPriceList(form);
        var done = form.querySelector('[data-lead-done]');
        if (done) done.hidden = false;
      })
      .catch(function () {
        status(form, 'The form could not reach our server. Open a prefilled email instead — it carries the same details.', 'error');
        var wrap = form.querySelector('[data-mailto-slot]');
        if (wrap) {
          wrap.innerHTML = '<a class="lead-unlock-link" href="' + mailtoFallback(payload) + '">Open the prefilled email →</a>';
          wrap.hidden = false;
        }
      })
      .finally(function () {
        if (button) { button.disabled = false; button.textContent = button.dataset.label || 'Send'; }
      });
  });
})();
