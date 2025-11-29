// DOM Elements
const modal = document.getElementById('thankYouModal');
const closeBtn = document.getElementById('closeModalBtn');
const form = document.querySelector('form');
const nameField = document.getElementById('name-field');

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
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';


  try {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.website = window.location.origin;

    const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/send-email'
    : 'https://architecture-portfolio-6bxb.onrender.com/send-email';

    const response = await fetch(API_URL, {

      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      form.reset();
      showModal();
    } else {
      console.error('Server error:', response.status, response.statusText);
      alert('Error sending message. Please try again.');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    alert('Network error. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
