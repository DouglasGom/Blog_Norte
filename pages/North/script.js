const API_KEY = 'f5ff8d65f3ae3b66009cd1f2d8921cdc';

const elIconWeather = document.getElementById('icon-weather');
const elTemperature = document.getElementById('temperature');
const elLocal = document.getElementById('local');
const elHumidity = document.getElementById('humidity');
const elSpeedWind = document.getElementById('speed-wind');
const elCard = document.querySelector('card');


function getData(local) {
  const route = `https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&units=metric&appid=${API_KEY}`
  return fetch(route).then(response => response.json())
}
function handleSubmit(event) {
  event.preventDefault()
  const value = document.querySelector('[name="local"]').value

  getData(value).then(data => {
    console.log(data)
    elTemperature.innerHTML = Math.floor(data.main.temp) + '°C'
    elLocal.innerHTML = data.name;
    elHumidity.innerHTML = Math.floor(data.main.humidity) + '%'
    elSpeedWind.innerHTML = Math.floor(data.wind.speed) + 'km/h'

    const icon = data.weather[0].main.toLocaleLowerCase()
    const src = `../../assets/icons/${icon}.png`
    elIconWeather.setAttribute('src', src)
  })
}

  async function getCotacao() {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
      const data = await response.json();
      const cotacao = data.USDBRL;

      const valorAtual = parseFloat(cotacao.bid);
      const valorAnterior = parseFloat(cotacao.ask); 

      const diferenca = valorAtual - valorAnterior;
      const subiu = diferenca > 0;

      const card = document.querySelector('.card-money');
      card.innerHTML = `
        <div style="font-family: sans-serif;">
          <h3 style="padding-bottom: 1rem">Cotação Dólar Comercial (USD/BRL)</h3>
          <p style="padding-bottom: 1rem">R$ ${valorAtual.toFixed(2)} 
            <span style="color: ${subiu ? 'green' : 'red'}; font-weight: bold;">
              ${subiu ? '▲' : '▼'} ${Math.abs(diferenca).toFixed(3)}
            </span>
          </p>
          <small>Atualizado: ${new Date().toLocaleString()}</small>
        </div>
      `;
    } catch (error) {
      document.querySelector('.card-money').innerHTML = `<p>Erro ao carregar cotação.</p>`;
      console.error('Erro na API de câmbio:', error);
    }
  }

  getCotacao();

  setInterval(getCotacao, 5 * 60 * 1000);



document.querySelector('form').addEventListener('submit',handleSubmit )

 const dadosEstados = {
    AC: { nome: "Acre", conteudo: "Rico em história da borracha e floresta densa." },
    AP: { nome: "Amapá", conteudo: "Influência afro-indígena e biodiversidade do Oiapoque." },
    AM: { nome: "Amazonas", conteudo: "Maior estado do Brasil, conhecido pelo Teatro Amazonas e a cultura indígena." },
    PA: { nome: "Pará", conteudo: "Forte tradição no Círio de Nazaré e culinária com tucupi e açaí." },
    RO: { nome: "Rondônia", conteudo: "História ligada à Estrada de Ferro Madeira-Mamoré." },
    RR: { nome: "Roraima", conteudo: "Terra indígena, com o Monte Roraima como ícone geográfico e espiritual." },
    TO: { nome: "Tocantins", conteudo: "Jovem estado com forte cultura sertaneja e o Jalapão." }
  };

  document.querySelectorAll("svg path").forEach((estado) => {
    const id = estado.id;
    if (dadosEstados[id]) {
      estado.addEventListener("click", (e) => {
        e.stopPropagation();

        document.querySelectorAll("svg path").forEach((el) => {
          el.classList.remove("active-state");
        });

        estado.classList.add("active-state");

        const dados = dadosEstados[id];
        document.getElementById("estado-titulo").textContent = dados.nome;
        document.getElementById("estado-conteudo").textContent = dados.conteudo;
        document.getElementById("popup").style.display = "block";
      });
    }
  });

  document.addEventListener("click", (e) => {
    const popup = document.getElementById("popup");
    const mapContainer = document.querySelector(".map-container");

    if (!popup.contains(e.target) && !mapContainer.contains(e.target)) {
      popup.style.display = "none";
      document.querySelectorAll("svg path").forEach((el) =>
        el.classList.remove("active-state")
      );
    }
  });


  const ctx = document.getElementById('desmatamentoAnoChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Área desmatada (km²)',
        data: [9700, 10500, 13000, 11200, 11800, 9800],
        borderColor: 'green',
        fill: false
      }]
    }
  });

