import { db } from '../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

export default function mostrarOriginal() {
    // Objeto base del proyecto
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
    contenedor.innerHTML = "";

    // Crear formulario y vista previa
    const form = document.createElement("div");
    form.style.gridColumn = "1 / -1";
    form.style.maxWidth = "800px";
    form.style.margin = "0 auto";
    form.className = "form-original";

    const titulo = document.createElement("h2");
    titulo.textContent = "Guardar Proyecto en Firebase";
    form.appendChild(titulo);

    const resultado = document.createElement("pre");
    resultado.className = "json-preview";
    resultado.textContent = JSON.stringify(app, null, 2);

    // Función auxiliar para crear campos de input
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

    // Crear campos básicos
    crearCampo("nombreapp", "Nombre de la app");
    crearCampo("descripcion", "Descripción (30 palabras)");
    crearCampo("icono", "URL del Ícono");
    crearCampo("actividad", "Actividad");
    crearCampo("url", "URL del proyecto (Google Drive/GitHub)");

    // Campo especial: Integrantes
    const pIntegrantes = document.createElement("p");
    pIntegrantes.textContent = "Integrantes (separados por coma):";

    const integrantesInput = document.createElement("input");
    integrantesInput.value = app.integrantes.join(", ");
    integrantesInput.placeholder = "Ej: Juan, María, Pedro";

    integrantesInput.oninput = () => {
        app.integrantes = integrantesInput.value
            .split(",")
            .map(i => i.trim())
            .filter(i => i !== "");
        resultado.textContent = JSON.stringify(app, null, 2);
    };

    form.appendChild(pIntegrantes);
    form.appendChild(integrantesInput);

    // Botón para guardar en Firebase
    const botonGuardar = document.createElement("button");
    botonGuardar.textContent = "💾 Guardar en Firebase";

    botonGuardar.onclick = async () => {
        // Validaciones básicas
        if (!app.nombreapp || app.nombreapp.trim() === "") {
            alert("❌ El nombre de la app es obligatorio");
            return;
        }

        if (!app.descripcion || app.descripcion.trim() === "") {
            alert("❌ La descripción es obligatoria");
            return;
        }

        if (!app.integrantes || app.integrantes.length === 0) {
            alert("❌ Debes agregar al menos un integrante");
            return;
        }

        try {
            // Guardar en Firebase con timestamp
            const proyectoData = {
                ...app,
                fechaCreacion: new Date().toISOString()
            };

            await addDoc(collection(db, "proyectos"), proyectoData);
            alert("✅ Proyecto guardado correctamente en Firebase!");

            // Limpiar formulario
            app = {
                nombreapp: "",
                descripcion: "",
                icono: "https://cdn-icons-png.flaticon.com/512/2909/2909765.png",
                integrantes: [],
                actividad: "Capacitor Firebase",
                url: ""
            };

            // Recargar la vista
            mostrarOriginal();

        } catch (error) {
            console.error("Error al guardar:", error);
            alert("❌ Error al guardar en Firebase: " + error.message);
        }
    };

    form.appendChild(botonGuardar);

    // Vista previa del JSON
    const tituloPreview = document.createElement("h3");
    tituloPreview.textContent = "Vista Previa (JSON):";
    tituloPreview.style.marginTop = "2rem";
    form.appendChild(tituloPreview);

    // Container para JSON y botón copiar
    const jsonContainer = document.createElement("div");
    jsonContainer.className = "json-container";

    // Botón copiar
    const botonCopiar = document.createElement("button");
    botonCopiar.textContent = "📋 Copiar JSON";
    botonCopiar.className = "btn-copiar";
    botonCopiar.onclick = async () => {
        try {
            await navigator.clipboard.writeText(JSON.stringify(app, null, 2));
            botonCopiar.textContent = "✅ ¡Copiado!";
            botonCopiar.style.background = "linear-gradient(135deg, #10b981, #059669)";
            setTimeout(() => {
                botonCopiar.textContent = "📋 Copiar JSON";
                botonCopiar.style.background = "";
            }, 2000);
        } catch (error) {
            alert("❌ Error al copiar: " + error.message);
        }
    };

    jsonContainer.appendChild(botonCopiar);
    jsonContainer.appendChild(resultado);
    form.appendChild(jsonContainer);

    // Agregar todo al contenedor
    contenedor.appendChild(form);
}