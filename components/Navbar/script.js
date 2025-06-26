class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header id="nav-menu" aria-label="navigation bar">
        <div class="container">
          <div class="nav-start">
            <a class="logo" href="/">
              <img src="/assets/logo.png" width="75" height="75" alt="Inc Logo" />
            </a>
            <nav class="menu">
              <ul class="menu-bar">
                <li>
                    <a class="nav-link" href="../../index.html">Home</a>
                 
                </li>
                <li>
                  <button class="nav-link dropdown-btn" data-dropdown="dropdown2" aria-haspopup="true" aria-expanded="false" aria-label="discover">
                    Notícias
                    <i class="bx bx-chevron-down" aria-hidden="true"></i>
                  </button>
                  <div id="dropdown2" class="dropdown">
                    <ul role="menu">
                      <li role="menuitem"><a class="dropdown-link" href="/pages/News/index.html?categoria=esportes">Esportes</a></li>
                      <li role="menuitem"><a class="dropdown-link" href="/pages/News/index.html?categoria=cultura">Cultura</a></li>
                      <li role="menuitem"><a class="dropdown-link" href="/pages/News/index.html?categoria=politica">Política</a></li>
                      <li role="menuitem"><a class="dropdown-link" href="/pages/News/index.html?categoria=entretenimento">Entretenimento</a></li>
                      <li role="menuitem"><a class="dropdown-link" href="/pages/News/index.html?categoria=economia">Economia</a></li>
                      <li role="menuitem"><a class="dropdown-link" href="/pages/News/index.html?categoria=variedades">Variedades</a></li>
                    </ul>
                  </div>
                </li>
                <li><a class="nav-link" href="/pages/North/index.html">Sobre o Norte</a></li>
                <li><a class="nav-link" href="/pages/AboutUs/index.html">Sobre Nós</a></li>
              </ul>
            </nav>
          </div>

          <div class="nav-end">
            <div class="right-container">
              <form class="search" id="search-form" role="search" method="GET" action="/pages/News/index.html">
                <input type="search" name="search" placeholder="Pesquisar" />
                <i class="bx bx-search" aria-hidden="true"></i>
              </form>
              <button class="btn btn-primary">Inscreva-se</button>
            </div>

            <button id="hamburger" aria-label="hamburger" aria-haspopup="true" aria-expanded="false">
              <i class="bx bx-menu" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>
    `;

    const dropdownBtn = this.querySelectorAll(".dropdown-btn");
    const dropdown = this.querySelectorAll(".dropdown");
    const hamburgerBtn = this.querySelector("#hamburger");
    const navMenu = this.querySelector(".menu");
    const links = this.querySelectorAll(".dropdown a");

    function setAriaExpandedFalse() {
      dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    }

    function closeDropdownMenu() {
      dropdown.forEach((drop) => {
        drop.classList.remove("active");
        drop.addEventListener("click", (e) => e.stopPropagation());
      });
    }

    function toggleHamburger() {
      navMenu.classList.toggle("show");
    }

    dropdownBtn.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const dropdownIndex = e.currentTarget.dataset.dropdown;
        const dropdownElement = navMenu.querySelector(`#${dropdownIndex}`);

        dropdownElement.classList.toggle("active");

        dropdown.forEach((drop) => {
          if (drop.id !== dropdownIndex) {
            drop.classList.remove("active");
          }
        });

        e.stopPropagation();
        btn.setAttribute(
          "aria-expanded",
          btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
        );
      });
    });

    links.forEach((link) =>
      link.addEventListener("click", () => {
        closeDropdownMenu();
        setAriaExpandedFalse();
        toggleHamburger();
      })
    );

    document.documentElement.addEventListener("click", () => {
      closeDropdownMenu();
      setAriaExpandedFalse();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDropdownMenu();
        setAriaExpandedFalse();
      }
    });

    hamburgerBtn.addEventListener("click", toggleHamburger);
  }
}

customElements.define("nav-bar", NavBar);
