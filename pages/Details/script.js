document.addEventListener("DOMContentLoaded", () => {
  const noticia = JSON.parse(localStorage.getItem("noticiaSelecionada"));

  if (!noticia) {
    document.body.innerHTML = "<h1>Notícia não encontrada</h1>";
    return;
  }

  document.getElementById("new-category").innerText = noticia.categoria;
  document.getElementById("new-date").innerText = noticia.data;
  document.getElementById("new-title").innerText = noticia.titulo;
  document.getElementById("new-image").src = noticia.foto;

  const textoContainer = document.getElementById("new-description-container");

 if (Array.isArray(noticia.texto)) {
  let highlightIndex = 0;

  noticia.texto.forEach(paragrafo => {
    if (paragrafo === "__HIGHLIGHT__") {
      if (noticia.highlight && noticia.highlight[highlightIndex]) {
        const highlightDiv = document.createElement("div");
        highlightDiv.classList.add("highlight-container");
        highlightDiv.innerHTML = `
          <div class="highlight">
            <div class="highlight-text">${noticia.highlight[highlightIndex]}</div>
          </div>
        `;
        textoContainer.appendChild(highlightDiv);
        highlightIndex++;
      }
    } else {
      const div = document.createElement("div");
      div.classList.add("new-text");

      const p = document.createElement("p");
      p.classList.add("new-paragraph");
      p.innerText = paragrafo;

      div.appendChild(p);
      textoContainer.appendChild(div);
    }
  });
}
});

document.addEventListener("DOMContentLoaded", () => {
  const noticiaAtual = JSON.parse(localStorage.getItem("noticiaSelecionada"));

  fetch("../../data/noticias.json")
    .then(response => response.json())
    .then(todasNoticias => {
      const outrasNoticias = todasNoticias.filter(noticia =>
        noticia.titulo !== noticiaAtual.titulo
      ).slice(0, 6);

      const container = document.querySelectorAll(".cards-row");

      outrasNoticias.forEach((noticia, index) => {
        const card = document.createElement("div");
        card.classList.add("small-card");

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
                <button class="new-button">Leia Mais</button>
              </div>
            </div>
          </div>
        `;

        card.querySelector(".new-button").addEventListener("click", () => {
          localStorage.setItem("noticiaSelecionada", JSON.stringify(noticia));
          window.location.href = "./index.html";
        });

        container[Math.floor(index / 3)].appendChild(card);
      });
    })
    .catch(err => console.error("Erro ao carregar notícias: ", err));
});

