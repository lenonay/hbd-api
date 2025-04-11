const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);
//// ELEMENTOS
const mainView = $("main");
// Botones
const usersBtn = $(".users_btn");
const logsBtn = $(".logs_btn");
const accountSettingsBtn = $(".account_settings_btn");
const logoutBtn = $(".logout_btn");
// Dominio
const apiURL = "https://tmp.virtucan.es/api";

//// EVENTOS
logoutBtn.addEventListener("click", HandleLogout);

//// FUNCIONES
async function HandleLogout() {
  // 1. Hacer la petición al servidor para que nos cierre sesión
  const req = await fetch(`${apiURL}/account/logout`, { method: "DELETE" });
  // 2. Procesar respuesta en caso de errores
  const res = req.ok ? true : null;

  if (!res) {
    ShowError("No se pudo cerrar sesión, recargue la página");
    return;
  }
  // 3. Enviar al login
  window.location = "/admin";
}

// ERRORES Y DISPLAYS
function ShowError(error) {
  // 1. Eliminar las alertas, display y errores anteriores
  CloseDisplays({ alert: false, display: false });
  // 2. Crear un nuevo back y error con el mensaje
  const back = document.createElement("div");
  back.className = "back";
  const errorD = document.createElement("div");
  errorD.className = "error";

  errorD.innerHTML = `
    <h4>Error</h4>
    <p>${error}</p>
    <button type="button" class="confirm_btn">
      <span>Aceptar</span>
    </button>
  `;

  // 3. Añadirlos a la pagina
  mainView.append(back);
  mainView.append(errorD);

  // 4. Añadir eventos
  const CloseError = () => CloseDisplays({ alert: false, display: false });
  // Cerrar con el back
  back.addEventListener("click", CloseError);
  // Cerrar con el boton
  errorD.querySelector(".confirm_btn").addEventListener("click", CloseError);
}

function CloseDisplays({ error = true, alert = true, display = true }) {
  // Funcion nombrada para eliminar
  const checkAndRemove = (Class) => {
    // Buscamos el elemento
    const element = $(Class);

    // Si está lo eliminamos
    if (element) {
      element.remove();
    }
  };
  // Indicamos que queremos cerrar para poder manejarlo mejor
  switch (true) {
    case error:
      checkAndRemove(".error");
      break;
    case alert:
      checkAndRemove(".alert");
      break;
    case display:
      checkAndRemove(".display");
      break;
  }

  // Borramos el back si está
  if ($(".back")) $(".back").remove();
}
