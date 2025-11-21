import './style.css'
import mostrarRegistro from './componentes/registro';
import mostrarLogin from './componentes/login.js';
import mostrarOriginal from "./componentes/original.js";
import mostrarHome from './componentes/home.js';
import mostrarLogout from './componentes/logout.js';

import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    const menu = document.getElementById("menu");
    const app = document.getElementById("app");

    if (!menu || !app) {
      console.error("❌ ERROR: Falta <div id='menu'> o <div id='app'>");
      return;
    }

    if (user) {
      menu.innerHTML = `
        <nav>
          <button id="menuHome">Home</button>
          <button id="menuOriginal">Original</button>
          <button id="menuLogout">Logout</button>
        </nav>
      `;

      document.getElementById("menuHome").addEventListener("click", mostrarHome);
      document.getElementById("menuOriginal").addEventListener("click", mostrarOriginal);
      document.getElementById("menuLogout").addEventListener("click", mostrarLogout);

      mostrarHome();
    } else {
      menu.innerHTML = `
        <nav>
          <button id="menuLogin">Login</button>
          <button id="menuRegistro">Registro</button>
        </nav>
      `;

      document.getElementById("menuLogin").addEventListener("click", mostrarLogin);
      document.getElementById("menuRegistro").addEventListener("click", mostrarRegistro);

      mostrarLogin();
    }
  });
});
