(() => {
  const PICK_COUNT = 3;

  const randomizeBtn = document.getElementById("randomizeBtn");
  const cardsEl = document.getElementById("cards");
  const statusEl = document.getElementById("status");

  let questions = [];

  function setStatus(message, isError = false) {
    statusEl.textContent = message;
    statusEl.classList.toggle("status--error", isError);
  }

  function shuffle(items) {
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickQuestions() {
    if (questions.length < PICK_COUNT) {
      throw new Error("Nema dovoljno pitanja u bazi.");
    }
    return shuffle(questions).slice(0, PICK_COUNT);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderCards(picked) {
    cardsEl.hidden = false;
    cardsEl.innerHTML = picked
      .map(
        (q, index) => `
      <article class="card" data-index="${index}">
        <div class="card__meta">
          <span class="card__index">${index + 1} / ${PICK_COUNT}</span>
          <span class="card__category">${escapeHtml(q.category)}</span>
        </div>
        <p class="card__question">${escapeHtml(q.question)}</p>
        <button type="button" class="card__reveal" aria-expanded="false">
          Prikaži odgovor
        </button>
        <p class="card__answer">${escapeHtml(q.answer)}</p>
        <button type="button" class="card__hide">Sakrij odgovor</button>
      </article>`
      )
      .join("");
  }

  function toggleCard(card, open) {
    card.classList.toggle("is-open", open);
    const revealBtn = card.querySelector(".card__reveal");
    if (revealBtn) {
      revealBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }
  }

  function onRandomize() {
    randomizeBtn.classList.add("is-spinning");
    window.setTimeout(() => randomizeBtn.classList.remove("is-spinning"), 450);

    try {
      const picked = pickQuestions();
      renderCards(picked);
      setStatus("Pitaj igrača — odgovor otvori tapom.");
    } catch (err) {
      setStatus(err.message || "Greška pri izvlaku.", true);
    }
  }

  cardsEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const card = target.closest(".card");
    if (!card) return;

    if (target.closest(".card__reveal")) {
      toggleCard(card, true);
      return;
    }

    if (target.closest(".card__hide")) {
      toggleCard(card, false);
    }
  });

  randomizeBtn.addEventListener("click", onRandomize);

  async function init() {
    try {
      const response = await fetch("questions.json");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      questions = Array.isArray(data.questions) ? data.questions : [];
      if (questions.length < PICK_COUNT) {
        throw new Error("Baza pitanja je prazna ili nepotpuna.");
      }
      randomizeBtn.disabled = false;
      setStatus(`${questions.length} pitanja spremno. Klikni Randomize.`);
    } catch (err) {
      console.error(err);
      setStatus("Neuspjelo učitavanje pitanja. Osvježi stranicu.", true);
      randomizeBtn.disabled = true;
    }
  }

  init();
})();
