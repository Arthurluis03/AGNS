const button_login = document.getElementById("login_button");
const user = document.getElementById("usuario");
const senha = document.getElementById("senha");

// mostrarSenha
// usuario
// senha


button_login.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href="/src/html/dashboard.html"  
});
