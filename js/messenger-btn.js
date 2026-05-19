(function () {
  const btn = document.createElement('a');
  btn.href = 'https://m.me/100076380514835';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Facebook Messenger-ээр холбогдох');
  btn.style.cssText = [
    'position:fixed',
    'bottom:90px',
    'right:20px',
    'width:52px',
    'height:52px',
    'border-radius:50%',
    'background:linear-gradient(135deg,#0084ff 0%,#a334fa 100%)',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'box-shadow:0 4px 16px rgba(0,132,255,.35)',
    'z-index:9998',
    'transition:transform .2s ease,box-shadow .2s ease',
    'text-decoration:none',
    'cursor:pointer',
  ].join(';');
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 48 48" fill="white"><path d="M24 4C12.95 4 4 12.47 4 23c0 5.67 2.44 10.77 6.35 14.35L10 42l4.94-2.59A20.6 20.6 0 0 0 24 42c11.05 0 20-8.47 20-19S35.05 4 24 4zm2.12 25.58L22 25.4l-7.9 4.18 8.65-9.18 4.12 4.18 7.9-4.18-8.65 9.18z"/></svg>';
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.1)';
    btn.style.boxShadow = '0 6px 24px rgba(0,132,255,.5)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.boxShadow = '0 4px 16px rgba(0,132,255,.35)';
  });
  document.body.appendChild(btn);
})();
