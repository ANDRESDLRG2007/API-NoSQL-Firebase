import { db } from '../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

export default function mostrarOriginal() {

  let app = {
    nombreapp: "Mi Calculadora Neon",
    descripcion: "App móvil hecha con Vite y Capacitor, interfaz neon, animaciones y funciones básicas.",
    icono: "https://cdn-icons-png.flaticon.com/512/2909/2909765.png",
    integrantes: ["andres"],
    actividad: "Capacitor Firebase",
    url: "https://drive.google.com/"
  };

  // Contenedor principal
  const contenedor = document.getElementById("app");
  contenedor.innerHTML = "<h2>Proyecto con API + Firebase</h2>";

  const form = document.createElement("div");
  const resultado = document.createElement("pre");
  resultado.textContent = JSON.stringify(app, null, 2);

  contenedor.appendChild(form);
  contenedor.appendChild(resultado);

  // AUX: crear input
  function crearCampo(key, label) {
    const p = document.createElement("p");
    p.textContent = label;

    const input = document.createElement("input");
    input.value = app[key];
    input.placeholder = label;

    input.oninput = () => {
      app[key] = input.value;
      resultado.textContent = JSON.stringify(app, null, 2);
    };

    form.appendChild(p);
    form.appendChild(input);
  }

  // Inputs básicos
  crearCampo("nombreapp", "Nombre de la app");
  crearCampo("descripcion", "Descripción");
  crearCampo("icono", "URL Icono");
  crearCampo("actividad", "Actividad");
  crearCampo("url", "URL del proyecto");

  // Campo especial: Integrantes
  const pIntegrantes = document.createElement("p");
  pIntegrantes.textContent = "Integrantes (separados por coma):";
  const integrantesInput = document.createElement("input");

  integrantesInput.value = app.integrantes.join(", ");
  integrantesInput.oninput = () => {
    app.integrantes = integrantesInput.value.split(",").map(i => i.trim());
    resultado.textContent = JSON.stringify(app, null, 2);
  };

  form.appendChild(pIntegrantes);
  form.appendChild(integrantesInput);

  // 🔥 Botón para obtener personaje de Rick and Morty
  const botonAPI = document.createElement("button");
  botonAPI.textContent = "Obtener personaje aleatorio (API Rick & Morty)";
  botonAPI.onclick = async () => {
    try {
      let randomId = Math.floor(Math.random() * 826) + 1;
      const res = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
      const data = await res.json();

      // Mezclamos los datos de la API con el objeto
      app.personaje = {
        nombre: data.name,
        especie: data.species,
        estado: data.status,
        imagen: data.image
      };

      resultado.textContent = JSON.stringify(app, null, 2);
      alert("Personaje agregado al objeto 👌");
    } catch (error) {
      alert("Error consultando la API");
    }
  };
  form.appendChild(botonAPI);

  // 🔘 Botón para guardar en Firebase
  const botonGuardar = document.createElement("button");
  botonGuardar.textContent = "Guardar en Firebase";

  botonGuardar.onclick = async () => {
    try {
      await addDoc(collection(db, "proyectos"), app);
      alert("✅ Datos guardados correctamente en Firebase!");
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar");
    }
  };

  form.appendChild(botonGuardar);
}
