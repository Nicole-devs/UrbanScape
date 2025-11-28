const modal = document.getElementById('thankYouModal');
const closeBtn = document.getElementById('closeModalBtn');

function showModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function hideModal() {
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking "Thank You" button
closeBtn.addEventListener('click', hideModal);

// Close modal if clicking outside modal content
modal.addEventListener('click', (e) => {
  if (e.target === modal) hideModal();
});

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const formData = new FormData(form);
    const response = await fetch('/send-email', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      form.reset();
      showModal(); // Show modal on success
    } else {
      // Handle non-ok response if needed here
      alert('Error sending message. Please try again.');
    }
  } catch (error) {
    alert('Network error. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// Auto-capitalize name input as user types
const nameField = document.getElementById('name-field');

function capitalizeName(value) {
  // Capitalize first letter of each word and make rest lowercase
  return value.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase());
}

// Handle typing input
nameField.addEventListener('input', () => {
  nameField.value = capitalizeName(nameField.value);
});

// Handle autofill/select events
nameField.addEventListener('change', () => {
  nameField.value = capitalizeName(nameField.value);
});
