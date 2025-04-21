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
// SVG
const icons = {
  addUser: (x = 40) => {
    return `<svg width="${x}px" height="${x}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 19C3.69137 16.6928 5.46998 16 9.5 16C13.53 16 15.3086 16.6928 16 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M13 9.5C13 11.433 11.433 13 9.5 13C7.567 13 6 11.433 6 9.5C6 7.567 7.567 6 9.5 6C11.433 6 13 7.567 13 9.5Z" stroke="currentColor" stroke-width="2"></path> <path d="M15 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18 3L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
  },
  filter: (x = 40) => {
    return `<svg width="${x}px" height="${x}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 3H5C3.89543 3 3 3.89543 3 5V6.17157C3 6.70201 3.21071 7.21071 3.58579 7.58579L9.41421 13.4142C9.78929 13.7893 10 14.298 10 14.8284V20V20.2857C10 20.9183 10.7649 21.2351 11.2122 20.7878L12 20L13.4142 18.5858C13.7893 18.2107 14 17.702 14 17.1716V14.8284C14 14.298 14.2107 13.7893 14.5858 13.4142L20.4142 7.58579C20.7893 7.21071 21 6.70201 21 6.17157V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
  },
  search: (x = 40) => {
    return `<svg width="${x}px" height="${x}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 15L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2"></path> </g></svg>`;
  },
};

//// EVENTOS
usersBtn.addEventListener("click", HandleUsers);
//
logoutBtn.addEventListener("click", HandleLogout);

//// FUNCIONES
async function HandleUsers() {
  // 1. Preparamos la vista
  PrepareView(usersBtn, "users");

  // 2. Crear el menu superior
  const upperMenu = document.createElement("div");
  upperMenu.className = "upper_menu";

  upperMenu.innerHTML = `
    <button type="button" class="add_user_btn">
      ${icons.addUser()}
    </button>
    <div class="search_bar">
      ${icons.search(25)}
      <input type="text" id="search_inp" placeholder="Escriba para buscar..." />
    </div>
  `;

  mainView.append(upperMenu);

  // Eventos
  upperMenu
    .querySelector(".add_user_btn")
    .addEventListener("click", HandleCreateUser);
}

function HandleCreateUser() {
  // 1. Crear el display
  const display = CreateDisplay();
  // 2. Mostrar el contenido
  display.innerHTML = `
    <h2>Creación de Usuarios</h2>
    <p class="error_display"></p>
    <form class="create_user_form" autocomplete="off">
      <label class="username">
        <span>Nombre</span>
        <input type="text" id="username_inp" name="username" placeholder="..." />
      </label>
      <label class="surname">
        <span>Apellidos</span>
        <input type="text" id="surname_inp" name="surname" placeholder="..." />
      </label>
      <label class="birthdate">
        <span>Fecha de nacimiento</span>
        <input type="date" id="birthdate_inp" name="birthdate" />
      </label>
      <label class="email">
        <span>Email</span>
        <input type="email" id="email_inp" name="email" placeholder="..." />
      </label>
      <label class="passwd">
        <span>Contraseña</span>
        <input type="text" id="passwd_inp" name="passwd" placeholder="..." />
      </label>
      <label class="department">
        <span>Departamento</span>
        <input type="text" id="department_inp" name="department" placeholder="..." />
      </label>
      <label class="description">
        <span>Descripción</span>
        <textarea name="description" id="description_inp" placeholder="Opcional"></textarea>
      </label>
      <div class="buttons">
        <button type="button" class="submit_btn">
          <span>Crear</span>
        </button>
        <button type="button" class="cancel_btn">
          <span>Cancelar</span>
        </button>
      </div>
    </form>
  `;

  // 3. Recuperamos los botones
  const submitBtn = display.querySelector(".submit_btn");
  const cancelBtn = display.querySelector(".cancel_btn");

  // 4. Asignamos los eventos
  submitBtn.addEventListener("click", SubmitForm);
  cancelBtn.addEventListener("click", CloseDisplays);
}

async function SubmitForm(event) {
  // 1. Recuperamos el display
  const display = event.target.closest(".display");

  // 2. Recuperamos el formulario
  const formElement = display.querySelector("form");

  // 3. Extraemos los datos del formulario
  const form = new FormData(formElement);
  const formData = Object.fromEntries(form.entries());

  // Si no se le pasa una fecha, la manejamos
  if (!formData.birthdate) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    formData.birthdate = `${year}-${month}-${day}`;
  }

  // 4. Enviamos al endpoint
  const req = await fetch(`${apiURL}/account`, {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",
    body: JSON.stringify(formData),
  });

  // 5. Procesamos la respuesta
  const res = req.ok ? await req.json() : null;

  console.log(res);

  if (!res || !res.success) {
    // Mostramos los errores en el formulario
    ShowFormError(res.error);
  }

  return;
}

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

// LIMPIAR Y PRERPARAR VISTA
function PrepareView(button, view) {
  // 1. Marcamos el boton
  MarkAsSelected(button);
  // 2. Limpiamos la vista
  mainView.innerHTML = "";
  // 3. Cambiamos la clase de la vista
  mainView.className = view;
}

function MarkAsSelected(button) {
  // 1. Desmarcamos todos los que esten seleccionados
  for (const button of $$(".selected")) {
    button.classList.remove("selected");
  }

  // 2. Marcamos como seleccionado el que queremos
  button.classList.add("selected");
}

// ERRORES Y DISPLAYS
function CreateDisplay(customClass) {
  // Antes de crearlo hay que eliminar el anterior
  CloseDisplays({ error: false, alert: false });

  // Creamos el display
  const display = document.createElement("div");
  display.className = "display";

  // Creamos el back
  const back = document.createElement("div");
  back.className = "back";

  // Si hay una clase extra la añadimos
  if (customClass) display.classList.add(customClass);

  // Añadimos el display
  mainView.append(display);
  mainView.append(back);

  // Añadimos el evento para cerrar
  back.addEventListener("click", CloseDisplays);

  return display;
}

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
  if (error) checkAndRemove(".error");

  if (alert) checkAndRemove(".alert");

  if (display) checkAndRemove(".display");

  // Borramos el back si está
  if ($(".back")) $(".back").remove();
}

function ShowFormError(error) {
  // Recuperamos el campo para señalarlo
  const field = document.querySelector(`#${error.field}_inp`);

  // Si hay campo lo procesamos
  if (field) {
    // Añadimos la clase de error
    field.classList.add("error_inp");
    // Y un evento que se ejecuta una sola vez
    field.addEventListener(
      "input",
      (e) => {
        e.target.classList.remove("error_inp");
      },
      { once: true }
    );
  }

  // Manejamos el error
  // Recuperamos el display
  const errorDisplay = document.querySelector(".error_display");

  // Activamos y mostramos el texto
  errorDisplay.classList.add("active");
  errorDisplay.textContent = error.error;
}
///////////// CUERPO
HandleUsers();
