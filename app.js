(function () {
  var statusText = document.getElementById('statusText');
  var checkApiBtn = document.getElementById('checkApiBtn');
  var apiUrlEl = document.getElementById('apiUrl');

  var apiBaseUrl = (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) || '';
  apiUrlEl.textContent = apiBaseUrl || 'No configurada';

  async function checkHealth() {
    if (!apiBaseUrl || apiBaseUrl.indexOf('TU_DEPLOYMENT_ID') !== -1) {
      statusText.textContent = 'Configura API_BASE_URL en config.js';
      return;
    }

    statusText.textContent = 'Consultando...';

    try {
      var response = await fetch(apiBaseUrl + '?action=health', {
        method: 'GET'
      });
      var data = await response.json();

      if (!response.ok || !data || data.success !== true) {
        throw new Error('Respuesta no válida');
      }

      statusText.textContent = 'OK: ' + (data.data && data.data.service ? data.data.service : 'API activa');
    } catch (error) {
      statusText.textContent = 'Error de conexión: ' + error.message;
    }
  }

  if (checkApiBtn) {
    checkApiBtn.addEventListener('click', checkHealth);
  }
})();
