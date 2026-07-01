document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  const searchInput = document.querySelector("#recipe-search");
  const cards = document.querySelectorAll(".recipe-card");
  const noResults = document.querySelector(".no-results");
  if (searchInput && cards.length) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;
      cards.forEach((card) => {
        const haystack = card.dataset.search || card.textContent.toLowerCase();
        const matches = haystack.toLowerCase().includes(query);
        card.style.display = matches ? "" : "none";
        if (matches) visibleCount++;
      });
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? "block" : "none";
      }
    });
  }
});
