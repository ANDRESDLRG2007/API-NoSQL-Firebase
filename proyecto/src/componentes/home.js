export default async function mostrarHome() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = "<h2>Cargando personajes...</h2>";

  try {
    // Llamada a la API de Rick & Morty
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    const personajes = data.results;

    appContainer.innerHTML = "";

    personajes.forEach((personaje) => {
      const card = document.createElement("div");
      card.classList.add("app-card");

      card.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}">
        <div class="info">
          <h2>${personaje.name}</h2>
          <p><strong>Especie:</strong> ${personaje.species}</p>
          <p><strong>Estado:</strong> ${personaje.status}</p>
        </div>
      `;

      appContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar la API:", error);
    appContainer.innerHTML = "<p>Error al cargar los datos 😢</p>";
  }
}
