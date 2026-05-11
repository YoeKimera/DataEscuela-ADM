(function () {
  var MODULES = {
    inicio: {
      tag: 'Resumen general',
      title: 'Panel de gestion distrital',
      subtitle: 'Vista central para acceder a modulos, verificar estado de API y gestionar informacion escolar con una experiencia consistente.',
      render: renderInicio
    },
    'ficha-escuelas': {
      tag: 'Modulo activo',
      title: 'Ficha de Escuelas',
      subtitle: 'Consulta y edicion de datos institucionales por establecimiento.',
      render: renderFichaEscuelas
    }
  };

  var schoolsData = [
    { cue: '060123400', name: 'EP N 15 Jose de San Martin', level: 'Primaria', district: 'La Matanza', address: 'Av. Libertad 1200', director: 'Maria Gomez', tel: '(011) 4455-1122' },
    { cue: '060123401', name: 'Jardin N 902 Rayito de Sol', level: 'Inicial', district: 'La Matanza', address: 'Calle 8 N 540', director: 'Carla Rios', tel: '(011) 4455-1133' },
    { cue: '060123402', name: 'EES N 47 Hipolito Yrigoyen', level: 'Secundaria', district: 'La Matanza', address: 'Ruta 3 Km 29', director: 'Pablo Diaz', tel: '(011) 4455-1144' },
    { cue: '060123403', name: 'ISFD N 56', level: 'Superior', district: 'La Matanza', address: 'Belgrano 180', director: 'Laura Sosa', tel: '(011) 4455-1155' }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var userStr = localStorage.getItem('user');
    var user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
      window.location.href = 'index.html';
      return;
    }

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
              '<h4 class="font-semibold">Ficha de Escuelas</h4>',
            '</div>',
            '<p class="text-sm text-[#8b949e] mb-4">Consulta y edicion de datos institucionales por establecimiento.</p>',
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

  function renderFichaEscuelas() {
    var root = document.getElementById('moduleContent');
    root.innerHTML = [
      '<section class="module-content-card p-4 md:p-5">',
        '<div class="grid grid-cols-1 lg:grid-cols-[1fr_260px_220px] gap-3">',
          '<div class="relative">',
            '<i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e] text-xs"></i>',
            '<input id="searchInput" type="text" placeholder="Buscar por CUE, nombre o distrito..." class="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#58a6ff]">',
          '</div>',
          '<select id="levelFilter" class="bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#58a6ff]">',
            '<option value="">Todos los niveles</option>',
            '<option>Inicial</option>',
            '<option>Primaria</option>',
            '<option>Secundaria</option>',
            '<option>Superior</option>',
          '</select>',
          '<button id="refreshBtn" class="bg-[#238636] hover:bg-[#2ea043] rounded-md px-3 py-2 text-sm font-medium transition">',
            '<i class="fa-solid fa-rotate mr-1"></i>Actualizar',
          '</button>',
        '</div>',
      '</section>',
      '<div class="grid grid-cols-1 xl:grid-cols-[1.25fr_1fr] gap-4">',
        '<section class="module-content-card overflow-hidden">',
          '<div class="px-4 py-3 border-b border-[#30363d] flex items-center justify-between">',
            '<h3 class="text-sm font-semibold">Establecimientos</h3>',
            '<span id="countLabel" class="text-xs text-[#8b949e]">0 resultados</span>',
          '</div>',
          '<div class="overflow-x-auto">',
            '<table class="min-w-full text-sm">',
              '<thead class="bg-[#0d1117] text-[#8b949e]">',
                '<tr>',
                  '<th class="text-left px-4 py-2 font-medium">CUE</th>',
                  '<th class="text-left px-4 py-2 font-medium">Escuela</th>',
                  '<th class="text-left px-4 py-2 font-medium">Nivel</th>',
                  '<th class="text-left px-4 py-2 font-medium">Distrito</th>',
                '</tr>',
              '</thead>',
              '<tbody id="schoolsBody"></tbody>',
            '</table>',
          '</div>',
        '</section>',
        '<aside class="module-content-card p-4 md:p-5">',
          '<h3 class="text-sm font-semibold mb-3">Detalle de escuela</h3>',
          '<div id="schoolDetail" class="text-sm text-[#8b949e] space-y-2">',
            '<p>Selecciona una escuela para ver su ficha.</p>',
          '</div>',
        '</aside>',
      '</div>'
    ].join('');

    var state = {
      filteredSchools: schoolsData.slice()
    };

    function showSchoolDetail(school) {
      var detail = document.getElementById('schoolDetail');
      detail.innerHTML = [
        '<div class="space-y-2">',
          '<p><span class="text-[#8b949e]">CUE:</span> <span class="text-[#e6edf3]">' + school.cue + '</span></p>',
          '<p><span class="text-[#8b949e]">Nombre:</span> <span class="text-[#e6edf3]">' + school.name + '</span></p>',
          '<p><span class="text-[#8b949e]">Nivel:</span> <span class="text-[#e6edf3]">' + school.level + '</span></p>',
          '<p><span class="text-[#8b949e]">Distrito:</span> <span class="text-[#e6edf3]">' + school.district + '</span></p>',
          '<p><span class="text-[#8b949e]">Direccion:</span> <span class="text-[#e6edf3]">' + school.address + '</span></p>',
          '<p><span class="text-[#8b949e]">Directora/or:</span> <span class="text-[#e6edf3]">' + school.director + '</span></p>',
          '<p><span class="text-[#8b949e]">Telefono:</span> <span class="text-[#e6edf3]">' + school.tel + '</span></p>',
        '</div>'
      ].join('');
    }

    function renderRows() {
      var tbody = document.getElementById('schoolsBody');
      var countLabel = document.getElementById('countLabel');
      tbody.innerHTML = '';

      state.filteredSchools.forEach(function (school) {
        var tr = document.createElement('tr');
        tr.className = 'border-b border-[#30363d] cursor-pointer hover:bg-[#58a6ff14]';
        tr.innerHTML =
          '<td class="px-4 py-3">' + school.cue + '</td>' +
          '<td class="px-4 py-3">' + school.name + '</td>' +
          '<td class="px-4 py-3">' + school.level + '</td>' +
          '<td class="px-4 py-3">' + school.district + '</td>';

        tr.addEventListener('click', function () {
          showSchoolDetail(school);
        });

        tbody.appendChild(tr);
      });

      countLabel.textContent = state.filteredSchools.length + ' resultados';
    }

    function applyFilters() {
      var search = document.getElementById('searchInput').value.trim().toLowerCase();
      var level = document.getElementById('levelFilter').value;

      state.filteredSchools = schoolsData.filter(function (school) {
        var matchesSearch = !search ||
          school.cue.toLowerCase().indexOf(search) !== -1 ||
          school.name.toLowerCase().indexOf(search) !== -1 ||
          school.district.toLowerCase().indexOf(search) !== -1;
        var matchesLevel = !level || school.level === level;
        return matchesSearch && matchesLevel;
      });

      renderRows();
    }

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('levelFilter').addEventListener('change', applyFilters);
    document.getElementById('refreshBtn').addEventListener('click', applyFilters);

    renderRows();
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
