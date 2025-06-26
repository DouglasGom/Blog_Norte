//FETCH DE NOTICIAS
document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/noticias.json")
    .then((response) => response.json())
    .then((noticias) => {
      const container = document.getElementById("news-container");

      noticias.forEach((noticia) => {
        const card = document.createElement("div");
        card.className = "small-card";

        card.innerHTML = `
          <img src="${noticia.foto}" alt="Imagem da notícia" />
          <div class="small-card-description">
            <div class="new-text">
              <div class="badge-recent">
                <h5 class="type-recent">${noticia.categoria}</h5>
                <p class="-recent">${noticia.data}</p>
              </div>
              <div class="card-text-recent">
                <div class="card-title-container-recent">
                  <h2 class="card-title-recent">${noticia.titulo}</h2>
                </div>
                <div class="description-container-recent">
                  <p class="main-description-recent">${noticia.resumo}</p>
                </div>
              </div>
              <div class="button-container">
                <a href="${noticia.link}">
                  <button id="new-button">Leia Mais</button>
                </a>
              </div>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    })

    .catch((error) => console.error("Erro ao buscar notícias", error));
});

//FETCH DE NOTICIAS
document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/noticias.json")
    .then((response) => response.json())
    .then((noticias) => {
      const destaque = noticias.filter((n) => n.secao === "destaque");
      const recentes = noticias.filter((n) => n.secao === "recentes");
      const maisVistas = noticias.filter((n) => n.secao === "mais-vistos");

      renderSecao(destaque, "destaque-container");
      renderSecao(recentes, "recentes-container");
      renderSecao(maisVistas, "mais-vistos-container");
    })
    .catch((error) => console.error("Erro ao buscar notícias", error));
});

function renderSecao(noticias, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

   noticias.forEach((noticia) => {
        const card = document.createElement("div");
        card.className = noticia.card === 'large' ? 'large-card': 'small-card';

        card.innerHTML = `
          <img src="${noticia.foto}" alt="Imagem da notícia" />
          <div class="small-card-description">
            <div class="new-text">
              <div class="badge-recent">
                <h5 class="type-recent">${noticia.categoria}</h5>
                <p class="-recent">${noticia.data}</p>
              </div>
              <div class="card-text-recent">
                <div class="card-title-container-recent">
                  <h2 class="card-title-recent">${noticia.titulo}</h2>
                </div>
                <div class="description-container-recent">
                  <p class="main-description-recent">${noticia.resumo}</p>
                </div>
              </div>
              <div class="button-container">
                  <button class="new-button" id="new-button" onclick='abrirDetalhes(${JSON.stringify(noticia)})'>Leia Mais</button>
              </div>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
}

function abrirDetalhes(noticia) {
  localStorage.setItem('noticiaSelecionada', JSON.stringify(noticia));
  window.location.href = './pages/Details/index.html';
}

// === LÓGICA DE PESQUISA ===
const searchForm = document.querySelector("form.search");
const searchInput = document.querySelector("input[name='search']");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const termo = searchInput.value.trim();
  if (!termo) return;
  window.location.href = `./pages/News/index.html?busca=${encodeURIComponent(termo)}`;
});
