/**
 * Manejo de login en DataEscuela
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const email = document.getElementById('email');
  const pin = document.getElementById('pin');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleLogin();
  });

  // Limpiar mensaje de error al escribir
  email.addEventListener('input', hideMessages);
  pin.addEventListener('input', hideMessages);
});

async function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const pin = document.getElementById('pin').value.trim();
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');

  if (!email || !pin) {
    showError('Por favor completa todos los campos');
    return;
  }

  // Deshabilitar botón durante la solicitud
  submitBtn.disabled = true;
  submitText.textContent = 'Ingresando...';

  try {
    const response = await fetch(window.APP_CONFIG.API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'login',
        email: email,
        pin: pin
      })
    });

    const data = await response.json();

    if (data.success) {
      // Guardar token y usuario en localStorage
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      showSuccess(`¡Bienvenido, ${data.data.user.name}!`);

      // Redirigir al dashboard después de 1.5 segundos
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      showError(data.error.message || 'Error al iniciar sesión');
      submitBtn.disabled = false;
      submitText.textContent = 'Ingresar';
    }
  } catch (error) {
    console.error('Error en login:', error);
    showError('Error de conexión con el servidor');
    submitBtn.disabled = false;
    submitText.textContent = 'Ingresar';
  }
}

function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  const successDiv = document.getElementById('successMessage');

  errorText.textContent = message;
  errorDiv.classList.remove('hidden');
  successDiv.classList.add('hidden');
}

function showSuccess(message) {
  const successDiv = document.getElementById('successMessage');
  const successText = document.getElementById('successText');
  const errorDiv = document.getElementById('errorMessage');

  successText.textContent = message;
  successDiv.classList.remove('hidden');
  errorDiv.classList.add('hidden');
}

function hideMessages() {
  document.getElementById('errorMessage').classList.add('hidden');
  document.getElementById('successMessage').classList.add('hidden');
}
