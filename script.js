const form = document.querySelector('#trip-form');
const interest = document.querySelector('#interest');
document.querySelectorAll('[data-choice]').forEach(link => link.addEventListener('click', () => { interest.value = link.dataset.choice; }));
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const lines = ['שלום! אשמח לתכנן טיול בתאילנד.', `שם: ${data.get('name')}`, `מעניין אותי: ${data.get('interest')}`];
  if (data.get('dates')) lines.push(`תאריכים: ${data.get('dates')}`);
  if (data.get('people')) lines.push(`מספר מטיילים: ${data.get('people')}`);
  if (data.get('details')) lines.push(`פרטים נוספים: ${data.get('details')}`);
  window.open(`https://wa.me/66929894495?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
});
