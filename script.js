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
// window.load гарантирует что и шрифты, и layout уже готовы
window.addEventListener('load', fitLogoText);
window.addEventListener('resize', fitLogoText);

function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  btn.textContent = 'Заявка отправлена!';
  btn.disabled = true;
  btn.style.opacity = '0.7';
}

// Phone mask: +7 (___) ___-__-__
document.getElementById('f-phone').addEventListener('input', function () {
  let v = this.value.replace(/\D/g, '');
  if (v.startsWith('8')) v = '7' + v.slice(1);
  let out = '';
  if (v.length > 0) out = '+' + v[0];
  if (v.length > 1) out += ' (' + v.slice(1, 4);
  if (v.length > 4) out += ') ' + v.slice(4, 7);
  if (v.length > 7) out += '-' + v.slice(7, 9);
  if (v.length > 9) out += '-' + v.slice(9, 11);
  this.value = out;
});
