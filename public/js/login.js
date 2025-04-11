const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);
//// ELEMENTOS
const inpEmail = $("#inp_email");
const inpPasswd = $("#inp_passwd");
const loginButton = $(".login_button");
const errorDisplay = $(".error_display");
// Dominio
const apiURL = "https://tmp.virtucan.es/api";

//// Eventos
loginButton.addEventListener("click", HandleLogin);

inpPasswd.addEventListener("keydown", (e) => {
  // Si se presiona enter, enviamos el formulario
  if (e.key == "Enter") loginButton.click();
});

//// Funciones
async function HandleLogin() {
  // 1. Validar los campos
  const validation = ValidateFields();

  if (!validation.success) {
    ShowError(validation.error, validation.fields);
    return;
  }
  // 2. Formar el JSON
  const data = {
    email: inpEmail.value,
    passwd: inpPasswd.value,
  };
  // 3. Enviar la petición
  const res = await SendLoginRequest(data);

  // 4. Procesar la respuesta
  if (!res.success) {
    ShowError(res.error);
    return;
  }

  // 4.2 Guardamos la información en el session storage
  sessionStorage.setItem("userdata", res.data);

  // 5. Reenviar al panel o mostrar error
  if (res.data.rol !== "admin") {
    ShowError("No tienes permiso para acceder al panel de administración");
    return;
  }

  // Si somos admins podemos entrar
  window.location = "./admin/panel";
}

async function SendLoginRequest(data) {
  const req = await fetch(`${apiURL}/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return req.ok ? await req.json() : null;
}

function ValidateFields() {
  const reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  switch (true) {
    case !inpEmail.value || !inpPasswd.value:
      return {
        success: false,
        error: "Ambos campos son requeridos",
        fields: [inpEmail, inpPasswd],
      };

    case !reEmail.test(inpEmail.value):
      return {
        success: false,
        error: "El email no es válido",
        fields: [inpEmail],
      };

    default:
      HideError();
  }

  return { success: true };
}

function ShowError(error, fields) {
  // Colocamos el texto y activamos el mensaje de error
  errorDisplay.textContent = error;
  errorDisplay.classList.add("active");

  // Si no hay campos salimos
  if (!fields) return;

  // Iteramos por los campos para añadir la clase de error
  for (const field of fields) {
    // Añadimos la clase de error
    field.classList.add("error");
    // Y un evento que se ejecuta una sola vez
    field.addEventListener(
      "input",
      (e) => {
        e.target.classList.remove("error");
      },
      { once: true }
    );
  }
}

function HideError() {
  errorDisplay.textContent = "";
  errorDisplay.classList.remove("active");
}
