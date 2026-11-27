const form = document.querySelector('#trip-form');
const interest = document.querySelector('#interest');
const dates = document.querySelector('#dates');
const people = document.querySelector('#people');
const datesRequiredHint = document.querySelector('#dates-required-hint');
const peopleRequiredHint = document.querySelector('#people-required-hint');

function syncPaiRequirements() {
  const isPaiInquiry = interest.value.startsWith('רכב פרטי לפאי');
  dates.required = isPaiInquiry;
  people.required = isPaiInquiry;
  datesRequiredHint.textContent = isPaiInquiry ? ' · נדרש לבירור רכב לפאי' : '';
  peopleRequiredHint.textContent = isPaiInquiry ? ' · נדרש לבירור רכב לפאי' : '';
}

interest.addEventListener('change', syncPaiRequirements);
document.querySelectorAll('[data-choice]').forEach(link => link.addEventListener('click', () => {
  interest.value = link.dataset.choice;
  syncPaiRequirements();
}));
syncPaiRequirements();

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const source = interest.value.startsWith('רכב פרטי לפאי') ? 'אתר ThaiTov — רכב פרטי לפאי' : 'אתר ThaiTov';
  const lines = ['שלום! אשמח לתכנן טיול בתאילנד.', `מקור הפנייה: ${source}`, `שם: ${data.get('name')}`, `מעניין אותי: ${data.get('interest')}`];
  if (data.get('dates')) lines.push(`תאריכים: ${data.get('dates')}`);
  if (data.get('people')) lines.push(`מספר מטיילים: ${data.get('people')}`);
  if (data.get('details')) lines.push(`פרטים נוספים: ${data.get('details')}`);
  window.open(`https://wa.me/66929894495?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
});
