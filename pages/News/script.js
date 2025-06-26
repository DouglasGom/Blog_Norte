// FETCH DE NOTÍCIAS
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoriaSelecionada = params.get("categoria");

  fetch("../../data/noticias.json")
    .then((response) => response.json())
    .then((noticias) => {
      const container = document.getElementById("news-container");
      if (!container) return;

      const params = new URLSearchParams(window.location.search);
      const categoriaSelecionada = params.get("categoria");
      const termoBusca = params.get("busca");
      let noticiasFiltradas = noticias;

      if (categoriaSelecionada) {
        noticiasFiltradas = noticias.filter(
          (n) =>
            n.categoria.toLowerCase() === categoriaSelecionada.toLowerCase()
        );
      }

      if (termoBusca) {
        const termos = termoBusca.toLowerCase().split(" ");
        noticiasFiltradas = noticiasFiltradas.filter((n) =>
          termos.some((termo) => n.titulo.toLowerCase().includes(termo))
        );
      }

      if (noticiasFiltradas.length === 0) {
        container.innerHTML = `
      <div class="sem-noticia">
        <p style="padding-left: 5rem; padding-bottom: 7rem;">Nenhum resultado encontrado</p>
        <h3 style="margin-top: 2rem;padding-left: 5rem;">Veja também</h3>
        <div id="veja-tambem" class="cards-row"></div>
      </div>
    `;

        const embaralhadas = noticias
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);
        const vejaTambemContainer = document.getElementById("veja-tambem");

        embaralhadas.forEach((noticia) => {
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
              <button class="new-button" onclick='abrirDetalhes(${JSON.stringify(
                noticia
              )})'>Leia Mais</button>
            </div>
          </div>
        </div>
      `;
          vejaTambemContainer.appendChild(card);
        });

        return;
      }

      noticiasFiltradas.forEach((noticia) => {
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
            <button class="new-button" onclick='abrirDetalhes(${JSON.stringify(
              noticia
            )})'>Leia Mais</button>
          </div>
        </div>
      </div>
    `;
        container.appendChild(card);
      });
    })

    .catch((error) => console.error("Erro ao buscar notícias", error));
});
