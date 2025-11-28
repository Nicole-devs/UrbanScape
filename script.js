// DOM Elements Initialization
const modal = document.getElementById('thankYouModal');
const closeBtn = document.getElementById('closeModalBtn');
const form = document.querySelector('form');
const nameField = document.getElementById('name-field');


// Set hidden website field value dynamically for Netlify Forms
const websiteField = document.querySelector('input[name="website"]');
if (websiteField) {
  websiteField.value = window.location.origin;
}


// Modal functions
function showModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Name capitalization
function capitalizeName(value) {
  return value.replace(/\b\w/g, char => char.toUpperCase())
              .replace(/\B\w/g, char => char.toLowerCase());
}

// Event listeners
closeBtn.addEventListener('click', hideModal);

nameField.addEventListener('input', () => {
  nameField.value = capitalizeName(nameField.value);
});

nameField.addEventListener('change', () => {
  nameField.value = capitalizeName(nameField.value);
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Netlify handles the actual form submission; this is UI feedback
  setTimeout(() => {
    form.reset();
    showModal();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Reach Out';
  }, 1500);
});
