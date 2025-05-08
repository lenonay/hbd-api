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
const apiURL = window.location.origin + "/api";
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
  edit: (x = 40) => {
    return `<svg width="${x}px" height="${x}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.3097 5.30981L18.7274 8.72755" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
  },
  crown: (x = 40) => {
    return `<svg width="${x}px" height="${x}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 19L18 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.5585 16H7.44152C6.58066 16 5.81638 15.4491 5.54415 14.6325L3.70711 9.12132C3.44617 8.3385 4.26195 7.63098 5 8L5.71067 8.35533C6.48064 8.74032 7.41059 8.58941 8.01931 7.98069L10.5858 5.41421C11.3668 4.63317 12.6332 4.63316 13.4142 5.41421L15.9807 7.98069C16.5894 8.58941 17.5194 8.74032 18.2893 8.35533L19 8C19.7381 7.63098 20.5538 8.3385 20.2929 9.12132L18.4558 14.6325C18.1836 15.4491 17.4193 16 16.5585 16Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path> </g></svg>`;
  },
  dukeCrown: (x = 40) => {
    return `<svg class="duke" width="${x}px" height="${x}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 19L18 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.5585 16H7.44152C6.58066 16 5.81638 15.4491 5.54415 14.6325L3.70711 9.12132C3.44617 8.3385 4.26195 7.63098 5 8L5.71067 8.35533C6.48064 8.74032 7.41059 8.58941 8.01931 7.98069L10.5858 5.41421C11.3668 4.63317 12.6332 4.63316 13.4142 5.41421L15.9807 7.98069C16.5894 8.58941 17.5194 8.74032 18.2893 8.35533L19 8C19.7381 7.63098 20.5538 8.3385 20.2929 9.12132L18.4558 14.6325C18.1836 15.4491 17.4193 16 16.5585 16Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path> </g></svg>`;
  },
  delUser: (x = 40) => {
    return `<svg width="${x}px" height="${x}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 19C3.69137 16.6928 5.46998 16 9.5 16C13.53 16 15.3086 16.6928 16 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M13 9.5C13 11.433 11.433 13 9.5 13C7.567 13 6 11.433 6 9.5C6 7.567 7.567 6 9.5 6C11.433 6 13 7.567 13 9.5Z" stroke="currentColor" stroke-width="2"></path> <path d="M16 3L21 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 3L16 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
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

  // Creamos el viewer
  const viewer = document.createElement("div");
  viewer.className = "viewer";

  // Lo añadimos al cuerpo
  mainView.append(viewer);
  GenerateAccountTable(viewer);

  // Eventos
  upperMenu
    .querySelector(".add_user_btn")
    .addEventListener("click", HandleCreateUser);

  upperMenu
    .querySelector("#search_inp")
    .addEventListener("input", async (event) => {
      const filter = event.target.value;

      await GenerateAccountTable(viewer, filter);
    });
}

async function GenerateAccountTable(viewer, filter = "") {
  viewer.classList.add("loading");
  viewer.innerHTML = "<div class='loader'></div>";

  const usersData = await GetUsersData(filter);

  viewer.innerHTML = "";
  viewer.classList.remove("loading");

  for (const dept of usersData.depts) {
    // Filtramos los datos de las cuentas que tengan este departamento
    const accountData = usersData.data.filter(
      (account) => account.department === dept
    );

    // Si no hay saltamos a la siguiente
    if (accountData.length == 0) continue;

    const container = document.createElement("div");
    container.className = "dept_container";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Cabecera principal
    thead.innerHTML = `
      <tr><th colspan="7">${dept}</th></tr>
      <tr class="column_headers">
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Email</th>
        <th colspan="2">Descripción</th>
        <th actions>Acciones</th>
      </tr>
    `;

    // Filas de datos
    accountData.forEach((account) => {
      const row = document.createElement("tr");
      row.setAttribute("d_active", account.active);
      row.setAttribute("d_id", account.id);

      let result; // Inicializamos

      switch (account.rol) {
        case "duke":
          result = icons.dukeCrown(25) + `<span>${account.username}</span>`;
          break;

        case "admin":
          result = icons.crown(25) + `<span>${account.username}</span>`;
          break;

        default:
          result = `<span>${account.username}</span>`;
          break;
      }

      row.innerHTML = `
          <td><div class="user_info">${result}</div></td>
          <td>${account.surname}</td>
          <td>${account.email}</td>
          <td colspan="2">${account.description || "..."}</td>
          <td>
            <div class="action_buttons">
              <button class="edit_btn" type="button">${icons.edit(25)}</button>
              <button class="del_btn" type="button">${icons.delUser(
                25
              )}</button>
            </div>
          </td>
        `;

      tbody.appendChild(row);
    });

    // Event listeners
    thead.addEventListener("click", () => {
      tbody.classList.toggle("hidden");
      thead.querySelector(".column_headers").classList.toggle("hidden");
    });
    tbody
      .querySelectorAll(".edit_btn")
      .forEach((btn) => btn.addEventListener("click", HandleUpdateUser));

    tbody
      .querySelectorAll(".del_btn")
      .forEach((btn) => btn.addEventListener("click", HandleDeleteUser));

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
    viewer.appendChild(container);
  }
}

function HandleDeleteUser(event) {
  const id = event.target.closest("tr").getAttribute("d_id");

  const DeleteUser = async () => {
    // Transformamos la alerta en un cargador
    MutateAlertToLoader("Eliminando usuario");

    // Hacemos la peticion de borrado
    const req = await fetch(`${apiURL}/account/${id}`, { method: "DELETE" });

    // Procesamos la respuesta
    const res = req.ok ? await req.json() : null;

    // Cerramos la alerta
    CloseDisplays({ error: false, display: false, alert: true });

    // Si salio mal mostramos un error y salimos
    if (!res.success) {
      ShowError(res.error);
      return;
    }

    // Recargamos
    HandleUsers();
  };

  CreateAlert(
    "Esta acción no se puede deshacer, ¿quiere continuar?",
    DeleteUser
  );
}

async function HandleUpdateUser(event) {
  // 1. Crear el display
  const display = CreateDisplay();
  // 2. Mostrar el contenido
  display.innerHTML = "<div class='loader'></div>";

  // 3. Recuperar todos los datos del usuario
  const id = event.target.closest("tr").getAttribute("d_id");
  const userData = await GetUserData(id);

  if (!userData.success) {
    // Mostrar un error
    ShowError(userData.error);
    return;
  }

  // 4. Creamos el display
  display.innerHTML = CreateDisplayHTML("Modificar Usuarios", userData.data, {
    blockPasswd: true,
    showPasswdToggle: true,
    showAccountToggle: true,
    showAdmin: true,
  });

  // 4. Recuperamos los botones
  const submitBtn = display.querySelector(".submit_btn");
  const cancelBtn = display.querySelector(".cancel_btn");
  const passwdBlock = display.querySelector("#passwd_block_inp");

  // 5. Eventos
  submitBtn.addEventListener("click", SubmitUpdateForm);
  cancelBtn.addEventListener("click", CloseDisplays);
  // Si esta evento para bloquear la contraseña
  if (passwdBlock) passwdBlock.addEventListener("change", TogglePasswdBlock);
}

async function SubmitUpdateForm(event) {
  // 1. Recuperamos el display
  const display = event.target.closest(".display");

  // 2. Recuperamos el formulario
  const formElement = display.querySelector("form");

  // 3. Extraemos los datos del formulario
  const form = new FormData(formElement);
  const formData = Object.fromEntries(form.entries());

  formData.active = formElement.querySelector("#active_inp").checked;
  formData.rol = formElement.querySelector("#admin_inp").checked
    ? "admin"
    : "user";
  // Borramos el campo de admin y el de passwd block
  delete formData.admin;
  delete formData.passwdBlock;

  // 3.1 Recuperamos el ID
  const userId = formElement.getAttribute("d_id");

  // Si no se le pasa una fecha, la manejamos
  if (!formData.birthdate) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    formData.birthdate = `${year}-${month}-${day}`;
  }

  // 4. Enviamos al endpoint
  const req = await fetch(`${apiURL}/account/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },

    method: "PUT",
    body: JSON.stringify(formData),
  });

  // 5. Procesamos la respuesta
  const res = req.ok ? await req.json() : null;

  if (!res || !res.success) {
    // Mostramos los errores en el formulario
    ShowFormError({ error: res.error });
    return;
  }

  CloseDisplays();
  HandleUsers();
}

function TogglePasswdBlock(event) {
  // Recuperamos el formulario
  const form = event.target.closest(".display");

  // Recuperamos el input de la contraseña
  const passwdInp = form.querySelector("#passwd_inp");
  const errorDisplay = form.querySelector(".error_display");

  if (passwdInp.hasAttribute("disabled")) {
    passwdInp.removeAttribute("disabled");
  } else {
    // Reiniciamos el valor del campo y le quitamos la clase de error si la tenia
    passwdInp.value = "";
    passwdInp.classList.remove("error_inp");
    // Desactivamos la contraseña
    passwdInp.setAttribute("disabled", "");

    // Quitamos el error si lo hubiese
    errorDisplay.textContent = "";
    errorDisplay.classList.remove("active");
  }
}

async function GetUserData(id) {
  const req = await fetch(`${apiURL}/account/${id}`);

  const res = req.ok ? await req.json() : null;

  return res;
}

async function GetUsersData(filter) {
  const req = await fetch(`${apiURL}/account/all?filter=${filter}`);

  const res = req.ok ? await req.json() : null;

  // Guardamos los departamentos en la sesion
  Session.setDepts(res.depts);

  return res;
}

function HandleCreateUser() {
  // 1. Crear el display
  const display = CreateDisplay();
  // 2. Mostrar el contenido
  display.innerHTML = CreateDisplayHTML("Creacion de Usuarios");

  // 3. Recuperamos los botones
  const submitBtn = display.querySelector(".submit_btn");
  const cancelBtn = display.querySelector(".cancel_btn");

  // 4. Asignamos los eventos
  submitBtn.addEventListener("click", SubmitForm);
  cancelBtn.addEventListener("click", CloseDisplays);
}

function CreateDisplayHTML(title, data = {}, options = {}) {
  const {
    showAdmin = false,
    showAccountToggle = false,
    showPasswdToggle = false,
    blockPasswd = false,
  } = options;

  const {
    id,
    username = "",
    surname = "",
    birthdate = "",
    email = "",
    passwd = "",
    department = "",
    description = "",
    rol = "user",
    active = true,
  } = data;

  const submitText = id ? "Guardar" : "Crear";

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const isAdmin = rol === "admin";
  const isActive = Boolean(active);

  const formattedBirthdate = birthdate
    ? new Date(birthdate).toISOString().slice(0, 10)
    : "";

  const passwdBlock = blockPasswd ? "disabled" : "";

  let deptsOptions = "";
  Session.getDetps().forEach((dept) => {
    deptsOptions += `<option value="${dept}" ${
      department == dept ? "selected" : ""
    } >${capitalizeFirstLetter(dept)}</option>`;
  });

  return `
    <h2>${title}</h2>
    <p class="error_display"></p>
    <form class="create_user_form" autocomplete="off" d_id="${id}">
      <label class="username">
        <span>Nombre</span>
        <input type="text" id="username_inp" name="username" placeholder="..." value="${username}" />
      </label>
      <label class="surname">
        <span>Apellidos</span>
        <input type="text" id="surname_inp" name="surname" placeholder="..." value="${surname}" />
      </label>
      <label class="birthdate">
        <span>Fecha de nacimiento</span>
        <input type="date" id="birthdate_inp" name="birthdate" value="${formattedBirthdate}" />
      </label>
      <label class="email">
        <span>Email</span>
        <input type="email" id="email_inp" name="email" placeholder="..." value="${email}" />
      </label>
      <label class="passwd">
        <span>Contraseña</span>
        <input type="text" id="passwd_inp" name="passwd" placeholder="..." value="${passwd}" ${passwdBlock} />
      </label>
      <label class="department">
        <span>Departamento</span>
        <select id="department_inp" name="department">
          ${deptsOptions}
        </select>
      </label>
      <label class="description">
        <span>Descripción</span>
        <textarea name="description" id="description_inp" placeholder="Opcional">${description.trim()}</textarea>
      </label>
      <div class="buttons">
        ${
          showAccountToggle
            ? `
            <label class="account_status">
              <span>Usuario activo</span>
              <input id="active_inp" type="checkbox" name="active" ${
                isActive ? "checked" : ""
              }/>
            </label>
          `
            : ""
        }

        ${
          showAdmin
            ? `
              <label class="user_admin">
                <span>Administrador</span>
                <input id="admin_inp" type="checkbox" name="admin" ${
                  isAdmin ? "checked" : ""
                }/>
              </label>
            `
            : ""
        }

        ${
          showPasswdToggle
            ? `
              <label class="passwd_block">
                <span>Cambiar contraseña</span>
                <input id="passwd_block_inp" type="checkbox" name="passwdBlock"/>
              </label>
            `
            : ""
        }
        <button type="button" class="submit_btn">
          <span>${submitText}</span>
        </button>
        <button type="button" class="cancel_btn">
          <span>Cancelar</span>
        </button>
      </div>
    </form>
  `;
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
    return;
  }

  // Cerramos el display
  CloseDisplays();
  HandleUsers();
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

// Manejo de información de la sesion
class Session {
  static setDepts(depts) {
    // 1. Metemos el array de los departamentos en memoria
    window.sessionStorage.setItem("depts", JSON.stringify({ depts }));
  }

  static getDetps() {
    // 2. Recuperamos el
    const { depts } = JSON.parse(window.sessionStorage.getItem("depts"));

    return depts;
  }
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
function CreateBack(callback = CloseDisplays()) {
  // Creamos el back
  const back = document.createElement("div");
  back.className = "back";

  mainView.append(back);
  // Añadimos el evento para cerrar
  back.addEventListener("click", callback);
}

function CreateDisplay(customClass) {
  // Antes de crearlo hay que eliminar el anterior
  CloseDisplays({ error: false, alert: false, display: true });

  // Creamos el fondo
  CreateBack(CloseDisplays);

  // Creamos el display
  const display = document.createElement("div");
  display.className = "display";

  // Si hay una clase extra la añadimos
  if (customClass) display.classList.add(customClass);

  // Añadimos el display
  mainView.append(display);

  return display;
}

function CreateAlert(text, confirmEvent, options = {}) {
  const { disableConfirm = false } = options;

  // Creamos una abreviación
  const CloseDisplaysFn = () => {
    CloseDisplays({ error: false, alert: true, display: false });
  };

  // Cerramos las alertas previas
  CloseDisplaysFn();
  // Creamos el fondo para que solo cierre la alerta
  CreateBack(CloseDisplaysFn);

  // Creamos la alerta
  const alert = document.createElement("div");
  alert.className = "alert";

  alert.innerHTML = `
    <h3>¡Atención!</h3>
    <p>${text}</p>
    <div class="buttons">
      ${
        // Si esta desactivado no se muestra el boton
        disableConfirm
          ? ""
          : '<button class="confirm_btn" type="button">Confirmar</button>'
      }
      <button class="cancel_btn" type="button">Cancelar</button>
    </div>
  `;

  mainView.append(alert);

  // Eventos
  if (confirmEvent) {
    alert.querySelector(".confirm_btn").addEventListener("click", confirmEvent);
  }

  alert.querySelector(".cancel_btn").addEventListener("click", CloseDisplaysFn);
}

function MutateAlertToLoader(title = "Cargando") {
  const alert = document.querySelector(".alert");

  // Cambiamos el contenido a un loader
  alert.innerHTML = `
    <h3 class="loading">${title}</h3>
    <p>Por favor, espere.</p>
    <div class="loader"></div>
  `;

  return alert;
}

function ShowError(error) {
  // 1. Eliminar las alertas, display y errores anteriores
  CloseDisplays({ alert: false, display: false, error: true });
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
  const CloseError = () =>
    CloseDisplays({ alert: false, display: false, error: true });
  // Cerrar con el back
  back.addEventListener("click", CloseError);
  // Cerrar con el boton
  errorD.querySelector(".confirm_btn").addEventListener("click", CloseError);
}

function CloseDisplays({ error = true, alert = true, display = true } = {}) {
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
