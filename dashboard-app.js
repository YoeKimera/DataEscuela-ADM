(function () {
  var MODULES = {
    inicio: {
      tag: 'Resumen general',
      title: 'Panel de gestion distrital',
      subtitle: 'Vista central para acceder a modulos, verificar estado de API y gestionar informacion escolar con una experiencia consistente.',
      render: renderInicio
    },
    'ficha-escuelas': {
      tag: 'Modulo JD3',
      title: 'Ficha de Escuela',
      subtitle: 'Copia integrada del modulo JD3 dentro del shell unico del sistema.',
      render: renderFichaEscuelasJD3
    }
  };

  var ui = {
    busyEl: null
  };

  document.addEventListener('DOMContentLoaded', function () {
    var userStr = localStorage.getItem('user');
    var user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
      window.location.href = 'index.html';
      return;
    }

    window.JD3ModuleRegistry = window.JD3ModuleRegistry || [];
    setupBusyOverlay();

    document.getElementById('userName').textContent = user.name || 'Usuario';
    document.getElementById('userRole').textContent = user.role || 'user';

    document.getElementById('logoutBtn').addEventListener('click', function () {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });

    var nav = document.getElementById('moduleNav');
    nav.addEventListener('click', function (event) {
      var item = event.target.closest('[data-module]');
      if (!item) {
        return;
      }

      var moduleName = item.getAttribute('data-module');
      navigateTo(moduleName);
    });

    window.addEventListener('hashchange', handleRoute);
    checkApiStatus();
    handleRoute();
  });

  function setupBusyOverlay() {
    var el = document.createElement('div');
    el.id = 'jd3BusyOverlay';
    el.className = 'fixed inset-0 z-[120] hidden items-center justify-center bg-slate-950/55 p-6';
    el.innerHTML = '<div class="rounded-2xl border border-[#30363d] bg-[#161b22] px-5 py-4 text-sm text-[#e6edf3] shadow-2xl">Procesando...</div>';
    document.body.appendChild(el);
    ui.busyEl = el;
  }

  function setBusy(isBusy, message) {
    if (!ui.busyEl) {
      return;
    }
    var msgEl = ui.busyEl.querySelector('div');
    msgEl.textContent = message || 'Procesando...';
    ui.busyEl.classList.toggle('hidden', !isBusy);
    ui.busyEl.classList.toggle('flex', isBusy);
  }

  function navigateTo(moduleName) {
    window.location.hash = '#/' + moduleName;
  }

  function handleRoute() {
    var moduleName = getModuleFromHash();
    var moduleDef = MODULES[moduleName] || MODULES.inicio;

    renderHeader(moduleDef);
    setActiveNav(moduleName);
    moduleDef.render();
  }

  function getModuleFromHash() {
    var hash = window.location.hash || '#/inicio';
    if (hash.indexOf('#/') !== 0) {
      return 'inicio';
    }

    var route = hash.slice(2).trim();
    return route || 'inicio';
  }

  function renderHeader(moduleDef) {
    document.getElementById('moduleTag').textContent = moduleDef.tag;
    document.getElementById('moduleTitle').textContent = moduleDef.title;
    document.getElementById('moduleSubtitle').textContent = moduleDef.subtitle;
  }

  function setActiveNav(moduleName) {
    var navItems = document.querySelectorAll('.module-nav-item');
    navItems.forEach(function (item) {
      var itemModule = item.getAttribute('data-module');
      if (itemModule === moduleName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function renderInicio() {
    var root = document.getElementById('moduleContent');
    root.innerHTML = [
      '<section class="module-content-card p-5">',
        '<div class="flex items-center justify-between mb-3">',
          '<h3 class="text-lg font-semibold">Modulos</h3>',
          '<span class="text-xs text-[#8b949e]">1 activo, 2 en preparacion</span>',
        '</div>',
        '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">',
          '<button data-go="ficha-escuelas" class="text-left module-content-card p-5 hover:border-[#58a6ff] transition">',
            '<div class="flex items-center gap-3 mb-3">',
              '<i class="fa-solid fa-building-columns text-[#58a6ff] text-xl"></i>',
              '<h4 class="font-semibold">Ficha de Escuelas (JD3)</h4>',
            '</div>',
            '<p class="text-sm text-[#8b949e] mb-4">Modulo copiado de JD3 con tabla, modal, edicion y exportaciones.</p>',
            '<span class="inline-block px-2 py-1 rounded text-xs border border-[#2ea043] text-[#2ea043] bg-[#2ea0431a]">Activo</span>',
          '</button>',
          '<div class="module-content-card p-5">',
            '<div class="flex items-center gap-3 mb-3">',
              '<i class="fa-solid fa-user-tie text-[#f2cc60] text-xl"></i>',
              '<h4 class="font-semibold">Inspectores</h4>',
            '</div>',
            '<p class="text-sm text-[#8b949e] mb-4">Agenda y seguimiento de tareas inspectivas.</p>',
            '<span class="inline-block px-2 py-1 rounded text-xs border border-[#f2cc60] text-[#f2cc60] bg-[#f2cc601a]">Proximamente</span>',
          '</div>',
          '<div class="module-content-card p-5">',
            '<div class="flex items-center gap-3 mb-3">',
              '<i class="fa-solid fa-chart-line text-[#d2a8ff] text-xl"></i>',
              '<h4 class="font-semibold">Reportes</h4>',
            '</div>',
            '<p class="text-sm text-[#8b949e] mb-4">Indicadores estrategicos para decision distrital.</p>',
            '<span class="inline-block px-2 py-1 rounded text-xs border border-[#d2a8ff] text-[#d2a8ff] bg-[#d2a8ff1a]">Proximamente</span>',
          '</div>',
        '</div>',
      '</section>'
    ].join('');

    var openFichaBtn = root.querySelector('[data-go="ficha-escuelas"]');
    openFichaBtn.addEventListener('click', function () {
      navigateTo('ficha-escuelas');
    });
  }

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-src="' + src + '"]');
      if (existing) {
        if (existing.getAttribute('data-loaded') === '1') {
          resolve();
          return;
        }
        existing.addEventListener('load', function () { resolve(); }, { once: true });
        existing.addEventListener('error', function () { reject(new Error('No se pudo cargar el modulo JD3.')); }, { once: true });
        return;
      }

      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-src', src);
      script.addEventListener('load', function () {
        script.setAttribute('data-loaded', '1');
        resolve();
      }, { once: true });
      script.addEventListener('error', function () {
        reject(new Error('No se pudo cargar el modulo JD3.'));
      }, { once: true });
      document.head.appendChild(script);
    });
  }

  function callServer(functionName, args, loaderText) {
    setBusy(true, loaderText || 'Procesando...');

    var params = new URLSearchParams();
    params.append('action', functionName);
    params.append('args', JSON.stringify(args || []));

    return fetch(window.APP_CONFIG.API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })
      .then(function (response) { return response.json(); })
      .then(function (result) {
        if (!result || result.success !== true) {
          throw new Error((result && result.error && result.error.message) || 'Error de servidor.');
        }
        return result.data;
      })
      .finally(function () {
        setBusy(false);
      });
  }

  function showMessageModal(title, message) {
    window.alert((title || 'Mensaje') + '\n\n' + (message || ''));
  }

  function renderFichaEscuelasJD3() {
    var root = document.getElementById('moduleContent');
    root.innerHTML = '<section class="module-content-card p-5 text-sm text-[#8b949e]">Cargando modulo JD3...</section>';

    ensureFichaEscuelaJD3Module()
      .then(function (moduleDef) {
        return callServer(moduleDef.bootstrapFunction || 'getFichaEscuelaBootstrapData', [], moduleDef.loaderText || 'Cargando modulo Ficha de Escuela...')
          .then(function (bootstrap) {
            var context = {
              bootstrap: bootstrap || { data: {} },
              app: {
                callServer: callServer,
                showMessageModal: showMessageModal
              }
            };

            root.innerHTML = moduleDef.render(context);
            if (typeof moduleDef.afterRender === 'function') {
              moduleDef.afterRender(context);
            }
          });
      })
      .catch(function (error) {
        root.innerHTML = '<section class="module-content-card p-5 text-sm text-[#fda4af]">No se pudo cargar Ficha de Escuela JD3: ' + escapeHtml(error.message || 'Error desconocido') + '</section>';
      });
  }

  function ensureFichaEscuelaJD3Module() {
    var already = (window.JD3ModuleRegistry || []).find(function (m) { return m.id === 'ficha-escuela'; });
    if (already) {
      return Promise.resolve(already);
    }

    return loadScriptOnce('modules/ficha-escuela-jd3.js')
      .then(function () {
        var loaded = (window.JD3ModuleRegistry || []).find(function (m) { return m.id === 'ficha-escuela'; });
        if (!loaded) {
          throw new Error('El modulo JD3 no se registro correctamente.');
        }
        return loaded;
      });
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function checkApiStatus() {
    var statusEl = document.getElementById('apiStatus');
    var timeEl = document.getElementById('statusTime');
    var now = new Date();
    timeEl.textContent = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

    try {
      var response = await fetch(window.APP_CONFIG.API_BASE_URL + '?action=health');
      var data = await response.json();
      if (response.ok && data && data.success === true) {
        statusEl.className = 'inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border border-[#2ea043] text-[#2ea043] bg-[#2ea0431a]';
        statusEl.innerHTML = '<span class="w-2 h-2 rounded-full bg-[#2ea043]"></span>Conectada';
      } else {
        throw new Error('Respuesta invalida de API');
      }
    } catch (error) {
      statusEl.className = 'inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border border-[#f85149] text-[#f85149] bg-[#f851491a]';
      statusEl.innerHTML = '<span class="w-2 h-2 rounded-full bg-[#f85149]"></span>Sin conexion';
    }
  }
})();
