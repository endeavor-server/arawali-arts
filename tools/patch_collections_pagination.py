import re

with open('/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts/website/collections.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the lookbook section of applyFilter with paginated version
old_code = '''        if (currentView === "lookbook") {
          const cards = curatedGrid.querySelectorAll(".lux-col-card");
          let visibleCount = 0;
          let visibleSkus = 0;
          cards.forEach(card => {
            const cardDept = card.dataset.dept;
            const text = card.textContent.toLowerCase();

            const matchesDept = (facets.depts.length === 0 || facets.depts.includes(cardDept));
            const matchesMat = (facets.mats.length === 0 || facets.mats.some(m => text.includes(m)));
            const matchesQuery = (!q || text.includes(q));

            if (matchesDept && matchesMat && matchesQuery) {
              card.style.display = "flex";
              visibleCount++;
              visibleSkus += parseInt(card.dataset.count, 10) || 0;
            } else {
              card.style.display = "none";
            }
          });
          if (lblActiveView) lblActiveView.textContent = `${visibleCount} Product Lines`;
          if (lblActiveSkus) lblActiveSkus.textContent = `${visibleSkus} Total SKUs`;
        }'''

new_code = '''        if (currentView === "lookbook") {
          const cards = Array.from(curatedGrid.querySelectorAll(".lux-col-card"));
          const matchingCards = [];
          let visibleSkus = 0;

          cards.forEach(card => {
            const cardDept = card.dataset.dept;
            const text = card.textContent.toLowerCase();

            const matchesDept = (facets.depts.length === 0 || facets.depts.includes(cardDept));
            const matchesMat = (facets.mats.length === 0 || facets.mats.some(m => text.includes(m)));
            const matchesQuery = (!q || text.includes(q));

            if (matchesDept && matchesMat && matchesQuery) {
              matchingCards.push(card);
              visibleSkus += parseInt(card.dataset.count, 10) || 10;
            } else {
              card.style.display = "none";
            }
          });

          // 10 categories per page
          const pageSize = 10;
          const totalPages = Math.max(1, Math.ceil(matchingCards.length / pageSize));
          if (window.__collectionsPage > totalPages) window.__collectionsPage = 1;
          const page = window.__collectionsPage || 1;

          cards.forEach(c => c.style.display = "none");
          const startIdx = (page - 1) * pageSize;
          const endIdx = startIdx + pageSize;
          matchingCards.slice(startIdx, endIdx).forEach(c => c.style.display = "flex");

          if (lblActiveView) {
            const rangeEnd = Math.min(endIdx, matchingCards.length);
            lblActiveView.textContent = matchingCards.length > 0 ? `Showing ${startIdx + 1}–${rangeEnd} of ${matchingCards.length} Categories` : "0 Categories";
          }
          if (lblActiveSkus) lblActiveSkus.textContent = `${visibleSkus} Total SKUs`;

          // Render Pagination
          const pagEl = document.getElementById("directoryPagination");
          if (pagEl) {
            if (totalPages <= 1) {
              pagEl.innerHTML = "";
            } else {
              let pagHtml = `<div class="myntra-pagination">`;
              if (page > 1) {
                pagHtml += `<button type="button" class="myntra-page-btn" onclick="window.__goToCollectionsPage(1)">&laquo; Page 1</button>`;
                pagHtml += `<button type="button" class="myntra-page-btn" onclick="window.__goToCollectionsPage(${page - 1})">&lsaquo; Previous</button>`;
              }
              pagHtml += `<span class="myntra-page-info">Page <strong>${page}</strong> of <strong>${totalPages}</strong></span>`;
              if (page < totalPages) {
                pagHtml += `<button type="button" class="myntra-page-btn" onclick="window.__goToCollectionsPage(${page + 1})">Next &rsaquo;</button>`;
                pagHtml += `<button type="button" class="myntra-page-btn" onclick="window.__goToCollectionsPage(${totalPages})">Page ${totalPages} &raquo;</button>`;
              }
              pagHtml += `</div>`;
              pagEl.innerHTML = pagHtml;
            }
          }
        }'''

if old_code in text:
    text = text.replace(old_code, new_code)
    # Add window.__goToCollectionsPage helper
    helper = '''
    window.__collectionsPage = 1;
    window.__goToCollectionsPage = function(p) {
      window.__collectionsPage = p;
      if (typeof applyFilter === 'function') {
        applyFilter();
        const topEl = document.getElementById("catalogTop") || document.getElementById("curatedCollectionsGrid");
        if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    '''
    text = text.replace('function initCollectionsPage() {', 'function initCollectionsPage() {' + helper)
    with open('/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts/website/collections.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Pagination successfully injected into collections.html applyFilter!")
else:
    print("Could not find old_code in collections.html")
