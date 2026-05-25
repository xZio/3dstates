// Подгоняет font-size логотипа под ширину контейнера
function fitLogoText() {
  const wrap = document.querySelector('.hero__logo-wrap');
  const logo = document.querySelector('.hero__logo');
  if (!wrap || !logo) return;
  logo.style.fontSize = '';
  const available = wrap.offsetWidth;
  const natural = logo.scrollWidth;
  if (available > 0 && natural > 0) {
    const current = parseFloat(getComputedStyle(logo).fontSize);
    logo.style.fontSize = Math.floor(current * available / natural) + 'px';
  }
}
window.addEventListener('load', fitLogoText);
window.addEventListener('resize', fitLogoText);

document.getElementById('current-year').textContent = new Date().getFullYear();

// ── МОБИЛЬНОЕ МЕНЮ ──────────────────────────────────────
function toggleMobileMenu() {
  const isOpen = document.getElementById('mobileMenu').classList.contains('open');
  isOpen ? closeMobileMenu() : openMobileMenu();
}
function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.classList.add('menu-open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.classList.remove('menu-open');
}
window.addEventListener('scroll', function() {
  if (document.body.classList.contains('menu-open')) closeMobileMenu();
}, { passive: true });

// ── МАСКА ТЕЛЕФОНА ───────────────────────────────────────
const phoneInput = document.getElementById('f-phone');

phoneInput.addEventListener('focus', function() {
  if (!this.value) this.value = '+7 ';
});

phoneInput.addEventListener('input', function() {
  let digits = this.value.replace(/\D/g, '');
  if (digits.length === 0) { this.value = '+7 '; return; }
  if (digits[0] === '8') digits = '7' + digits.slice(1);
  if (digits[0] !== '7') digits = '7' + digits;
  digits = digits.slice(0, 11);

  let out = '+7';
  if (digits.length > 1) out += ' (' + digits.slice(1, 4);
  if (digits.length >= 4) out += ')';
  if (digits.length > 4) out += ' ' + digits.slice(4, 7);
  if (digits.length > 7) out += '-' + digits.slice(7, 9);
  if (digits.length > 9) out += '-' + digits.slice(9, 11);
  this.value = out;
  clearError(this);
});

phoneInput.addEventListener('keydown', function(e) {
  if ((e.key === 'Backspace' || e.key === 'Delete') && this.value.length <= 3) {
    e.preventDefault();
  }
});

phoneInput.addEventListener('blur', function() {
  if (this.value === '+7 ' || this.value === '+7') this.value = '';
});

// ── ВАЛИДАЦИЯ ФОРМЫ ──────────────────────────────────────
function showError(input, msg) {
  const field = input.closest('.contact__field') || input.closest('label') || input.parentElement;
  input.classList.add('contact__input--error');
  let err = field.querySelector('.contact__error');
  if (!err) {
    err = document.createElement('span');
    err.className = 'contact__error';
    field.appendChild(err);
  }
  err.textContent = msg;
}

function clearError(input) {
  input.classList.remove('contact__input--error');
  const field = input.closest('.contact__field') || input.parentElement;
  const err = field && field.querySelector('.contact__error');
  if (err) err.remove();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isFullPhone(value) {
  return value.replace(/\D/g, '').length === 11;
}

// Очищаем ошибки при вводе/изменении
document.querySelectorAll('.contact__input').forEach(input => {
  input.addEventListener('input', function() { clearError(this); });
});
document.querySelector('input[name="consent"]').addEventListener('change', function() {
  clearError(this);
});

function handleSubmit(e) {
  e.preventDefault();
  const form  = e.target;
  let valid = true;

  const name    = form.querySelector('#f-name');
  const surname = form.querySelector('#f-surname');
  const phone   = form.querySelector('#f-phone');
  const email   = form.querySelector('#f-email');
  const method  = form.querySelector('input[name="contact_method"]:checked');
  const consent = form.querySelector('input[name="consent"]');

  if (!name.value.trim() || name.value.trim().length < 2) {
    showError(name, 'Введите имя'); valid = false;
  }
  if (!surname.value.trim() || surname.value.trim().length < 2) {
    showError(surname, 'Введите фамилию'); valid = false;
  }
  if (!isFullPhone(phone.value)) {
    showError(phone, 'Введите полный номер телефона'); valid = false;
  }
  if (!isValidEmail(email.value.trim())) {
    showError(email, 'Введите корректный email'); valid = false;
  }
  if (!method) {
    const group = form.querySelector('.contact__radio-group');
    let err = group.querySelector('.contact__error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'contact__error';
      group.appendChild(err);
    }
    err.textContent = 'Выберите способ связи';
    valid = false;
  }
  if (!consent.checked) {
    showError(consent, 'Необходимо согласие'); valid = false;
  }

  if (!valid) return;

  const btn = form.querySelector('[type="submit"]');
  btn.textContent = 'Заявка отправлена!';
  btn.disabled = true;
  btn.style.opacity = '0.7';
}
