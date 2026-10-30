const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");

// Menu para telas menores
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

// Saudação conforme o horário local
const saudacao = document.querySelector("#saudacao");
const hora = new Date().getHours();

if (hora >= 5 && hora < 12) {
  saudacao.textContent = "Bom dia! Que bom ter você aqui. ☀";
} else if (hora >= 12 && hora < 18) {
  saudacao.textContent = "Boa tarde! Que bom ter você aqui. ☀";
} else {
  saudacao.textContent = "Boa noite! Que bom ter você aqui. ☾";
}

// Alternância entre tema claro e escuro
themeToggle.addEventListener("click", () => {
  const darkMode = document.body.classList.toggle("dark");
  themeToggle.textContent = darkMode ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", darkMode ? "Ativar modo claro" : "Ativar modo escuro");
});

// Ano automático no rodapé
document.querySelector("#ano").textContent = new Date().getFullYear();

// Validação do formulário (demonstração local, sem envio de dados)
const form = document.querySelector("#form-contato");
const feedback = document.querySelector("#form-feedback");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.querySelector("#nome");
  const email = document.querySelector("#email");
  const mensagem = document.querySelector("#mensagem");
  const consentimento = document.querySelector("#consentimento");

  const fields = [
    { input: nome, error: document.querySelector("#erro-nome"), message: "Informe seu nome." },
    { input: email, error: document.querySelector("#erro-email"), message: "Informe um e-mail válido." },
    { input: mensagem, error: document.querySelector("#erro-mensagem"), message: "Escreva uma mensagem." }
  ];

  let valid = true;
  feedback.textContent = "";

  fields.forEach(({ input, error, message }) => {
    error.textContent = "";
    input.removeAttribute("aria-invalid");
    if (!input.checkValidity() || !input.value.trim()) {
      error.textContent = input === email && input.value.trim() ? message : message;
      input.setAttribute("aria-invalid", "true");
      valid = false;
    }
  });

  const consentError = document.querySelector("#erro-consentimento");
  consentError.textContent = "";
  if (!consentimento.checked) {
    consentError.textContent = "Marque o consentimento para continuar.";
    valid = false;
  }

  if (!valid) {
    feedback.textContent = "Confira os campos destacados e tente novamente.";
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  feedback.textContent = `Obrigada, ${nome.value.trim()}! A validação deu certo. Este formulário é apenas uma demonstração e não enviou seus dados.`;
  form.reset();
});
