  (function registerFichaEscuelaModule() {
    function escHtml(value) {
      return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function escXml(value) {
      return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function normalizeText(value) {
      return String(value || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
    }

    function loadScriptOnce(src) {
      return new Promise(function(resolve, reject) {
        var existing = document.querySelector('script[data-src="' + src + '"]');
        if (existing) {
          if (existing.getAttribute('data-loaded') === '1') {
            resolve();
            return;
          }
          existing.addEventListener('load', function() { resolve(); }, { once: true });
          existing.addEventListener('error', function() { reject(new Error('No se pudo cargar script externo.')); }, { once: true });
          return;
        }

        var script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-src', src);
        script.addEventListener('load', function() {
          script.setAttribute('data-loaded', '1');
          resolve();
        }, { once: true });
        script.addEventListener('error', function() {
          reject(new Error('No se pudo cargar script externo.'));
        }, { once: true });
        document.head.appendChild(script);
      });
    }

    function triggerExcelDownload(html, fileName) {
      var blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    }

    function buildFichaEscuelaExcelHtml(payload) {
      var rows = (payload && payload.rows) ? payload.rows : [];
      var updatedAt = payload && payload.updatedAt ? payload.updatedAt : '-';

      var bodyRows = rows.map(function(row) {
        return '<tr>' +
          '<td>' + escXml(row.codigoProvincial) + '</td>' +
          '<td>' + escXml(row.region) + '</td>' +
          '<td>' + escXml(row.distrital) + '</td>' +
          '<td>' + escXml(row.modalidad) + '</td>' +
          '<td>' + escXml(row.nivel) + '</td>' +
          '<td>' + escXml(row.cue) + '</td>' +
          '<td>' + escXml(row.codigoOrganizacion) + '</td>' +
          '<td>' + escXml(row.numeroEscuela) + '</td>' +
          '<td>' + escXml(row.tipoEscuela) + '</td>' +
          '<td>' + escXml(row.nombreEscuela) + '</td>' +
          '<td>' + escXml(row.localidad) + '</td>' +
          '<td>' + escXml(row.calle) + '</td>' +
          '<td>' + escXml(row.altura) + '</td>' +
          '<td>' + escXml(row.esquina1) + '</td>' +
          '<td>' + escXml(row.esquina2) + '</td>' +
          '<td>' + escXml(row.codigoPostal) + '</td>' +
          '<td>' + escXml(row.noUsar) + '</td>' +
          '<td>' + escXml(row.telefono) + '</td>' +
          '<td>' + escXml(row.email) + '</td>' +
          '<td>' + escXml(row.gestion) + '</td>' +
          '<td>' + escXml(row.dependencia) + '</td>' +
          '<td>' + escXml(row.ambito) + '</td>' +
          '<td>' + escXml(row.desfavorabilidad) + '</td>' +
          '<td>' + escXml(row.sede) + '</td>' +
          '<td>' + escXml(row.cueSede) + '</td>' +
          '<td>' + escXml(row.categoria) + '</td>' +
          '<td>' + escXml(row.fechaActualizacion) + '</td>' +
          '<td>' + escXml(row.cuentaUsuario) + '</td>' +
        '</tr>';
      }).join('');

      return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' +
        '<table border="1">' +
          '<tr><td colspan="28" style="background:#1e3a5f;color:#fff;font-weight:bold;">Ficha de Escuela - Actualizacion: ' + escXml(updatedAt) + '</td></tr>' +
          '<tr style="background:#dbeafe;font-weight:bold;">' +
            '<td>Codigo Provincial</td><td>Region</td><td>Distrital</td><td>Modalidad</td><td>Nivel</td><td>CUE</td><td>Codigo Organizacion</td><td>Numero Escuela</td><td>Tipo Escuela</td><td>Nombre Escuela</td><td>Localidad</td><td>Calle</td><td>Altura</td><td>Esquina 1</td><td>Esquina 2</td><td>Codigo Postal</td><td>No Usar</td><td>Telefono</td><td>Email</td><td>Gestion</td><td>Dependencia</td><td>Ambito</td><td>Desfavorabilidad</td><td>Sede</td><td>CUE Sede</td><td>Categoria</td><td>Fecha Actualizacion</td><td>Cuenta Usuario</td>' +
          '</tr>' +
          bodyRows +
        '</table>' +
      '</body></html>';
    }

    function buildFichaDirectivosExcelHtml(payload) {
      var rows = (payload && payload.rows) ? payload.rows : [];
      var updatedAt = payload && payload.updatedAt ? payload.updatedAt : '-';

      var bodyRows = rows.map(function(row) {
        return '<tr>' +
          '<td>' + escXml(row.codigoProvincial) + '</td>' +
          '<td>' + escXml(row.cue) + '</td>' +
          '<td>' + escXml(row.numeroEscuela) + '</td>' +
          '<td>' + escXml(row.tipoEscuela) + '</td>' +
          '<td>' + escXml(row.nombreEscuela) + '</td>' +
          '<td>' + escXml(row.localidad) + '</td>' +
          '<td>' + escXml(row.nivel) + '</td>' +
          '<td>' + escXml(row.modalidad) + '</td>' +
          '<td>' + escXml(row.fechaActualizacionEscuela) + '</td>' +
          '<td>' + escXml(row.estadoCarga) + '</td>' +
          '<td>' + escXml(row.nombreCompleto) + '</td>' +
          '<td>' + escXml(row.cargo) + '</td>' +
          '<td>' + escXml(row.revista) + '</td>' +
          '<td>' + escXml(row.tomaPosesion) + '</td>' +
          '<td>' + escXml(row.cuil) + '</td>' +
          '<td>' + escXml(row.fechaNacimiento) + '</td>' +
          '<td>' + escXml(row.emailOficial) + '</td>' +
          '<td>' + escXml(row.telefonoDirectivo) + '</td>' +
          '<td>' + escXml(row.cargoBase) + '</td>' +
          '<td>' + escXml(row.fechaActualizacionDirectivo) + '</td>' +
          '<td>' + escXml(row.usuario) + '</td>' +
        '</tr>';
      }).join('');

      return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' +
        '<table border="1">' +
          '<tr><td colspan="21" style="background:#0f766e;color:#fff;font-weight:bold;">Ficha Equipos Directivos - Actualizacion: ' + escXml(updatedAt) + '</td></tr>' +
          '<tr style="background:#99f6e4;font-weight:bold;">' +
            '<td>Codigo Provincial</td><td>CUE</td><td>Numero Escuela</td><td>Tipo Escuela</td><td>Nombre Escuela</td><td>Localidad</td><td>Nivel</td><td>Modalidad</td><td>Fecha Actualizacion Escuela</td><td>Estado Carga</td><td>Nombre Completo</td><td>Cargo</td><td>Revista</td><td>Toma de Posesion</td><td>CUIL</td><td>Fecha Nacimiento</td><td>Email Oficial</td><td>Telefono</td><td>Cargo Base</td><td>Fecha Actualizacion Directivo</td><td>Usuario</td>' +
          '</tr>' +
          bodyRows +
        '</table>' +
      '</body></html>';
    }

    function buildInfoCard(label, value) {
      return '<div class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">' +
        '<p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">' + escHtml(label) + '</p>' +
        '<p class="mt-1 text-sm text-slate-700">' + escHtml(value || '-') + '</p>' +
      '</div>';
    }

    function buildDirectivoCard(item) {
      return '<article class="rounded-xl border border-slate-200 bg-white p-3">' +
        '<div class="flex items-center justify-between gap-3">' +
          '<p class="text-sm font-semibold text-jd3-ink">' + escHtml(item.nombreCompleto || '-') + '</p>' +
          '<span class="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">' + escHtml(item.cargo || '-') + '</span>' +
        '</div>' +
        '<div class="mt-2 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">' +
          '<p><span class="font-semibold">CUIL:</span> ' + escHtml(item.cuil || '-') + '</p>' +
          '<p><span class="font-semibold">Revista:</span> ' + escHtml(item.revista || '-') + '</p>' +
          '<p><span class="font-semibold">Email:</span> ' + escHtml(item.emailOficial || '-') + '</p>' +
          '<p><span class="font-semibold">Telefono:</span> ' + escHtml(item.telefono || '-') + '</p>' +
          '<p><span class="font-semibold">Cargo Base:</span> ' + escHtml(item.cargoBase || '-') + '</p>' +
          '<p><span class="font-semibold">Actualizacion:</span> ' + escHtml(item.actualizacionFecha || '-') + '</p>' +
        '</div>' +
      '</article>';
    }

    window.JD3ModuleRegistry.push({
      id: 'ficha-escuela',
      label: 'Ficha de Escuela',
      icon: 'fa-solid fa-school-flag',
      iconColor: 'text-blue-700',
      bootstrapFunction: 'getFichaEscuelaBootstrapData',
      loaderText: 'Cargando modulo Ficha de Escuela...',
      render: function renderFichaEscuela(context) {
        var data = context.bootstrap.data || {};
        var schools = Array.isArray(data.schools) ? data.schools : [];
        var tipos = {};
        var emailValidos = 0;

        schools.forEach(function(school) {
          tipos[school.tipoEscuela || 'Sin Tipo'] = true;
          if (school.emailValido) {
            emailValidos += 1;
          }
        });

        var tiposEscuela = Object.keys(tipos).sort(function(a, b) {
          return normalizeText(a).localeCompare(normalizeText(b));
        });

        return '\n          <section class="rounded-[2rem] bg-gradient-to-r from-jd3-ink via-indigo-700 to-cyan-600 p-5 text-white shadow-panel sm:p-6">\n            <div class="grid gap-4 sm:grid-cols-4">\n              <div class="rounded-[1.25rem] bg-white/10 p-4">\n                <p class="text-[11px] uppercase tracking-[0.28em] text-indigo-100">Modulo</p>\n                <p class="mt-2 text-lg font-semibold">Ficha de Escuela</p>\n              </div>\n              <div class="rounded-[1.25rem] bg-white/10 p-4">\n                <p class="text-[11px] uppercase tracking-[0.28em] text-indigo-100">Escuelas</p>\n                <p class="mt-2 text-lg font-semibold">' + escHtml(data.summary ? data.summary.total : 0) + '</p>\n              </div>\n              <div class="rounded-[1.25rem] bg-white/10 p-4">\n                <p class="text-[11px] uppercase tracking-[0.28em] text-indigo-100">Email valido</p>\n                <p class="mt-2 text-lg font-semibold">' + escHtml(emailValidos) + '</p>\n              </div>\n              <div class="rounded-[1.25rem] bg-white/10 p-4">\n                <p class="text-[11px] uppercase tracking-[0.28em] text-indigo-100">Consulta</p>\n                <p class="mt-2 text-lg font-semibold">' + escHtml(data.updatedAt || '-') + '</p>\n              </div>\n            </div>\n            <div class="mt-4 flex flex-wrap items-center justify-end gap-3">\n              <button id="fichaEscuelaExcelBtn" class="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-95">\n                <i class="fa-solid fa-file-excel"></i>Ficha de Escuela\n              </button>\n              <button id="fichaEscuelaPdfBtn" class="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 active:scale-95">\n                <i class="fa-solid fa-file-pdf"></i>Descargar PDF\n              </button>\n            </div>\n          </section>\n\n          <section class="mt-6 rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-panel backdrop-blur-xl sm:p-6">\n            <div class="grid gap-3 lg:grid-cols-[1.2fr_0.8fr_auto]">\n              <div>\n                <label for="fichaSearchInput" class="block text-sm font-semibold text-slate-700">Busqueda</label>\n                <input id="fichaSearchInput" type="text" class="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-jd3-blue focus:ring-2 focus:ring-blue-100" placeholder="Codigo provincial, codigo, numero, escuela..." />\n              </div>\n              <div>\n                <label for="fichaTipoFilter" class="block text-sm font-semibold text-slate-700">Tipo de escuela</label>\n                <select id="fichaTipoFilter" class="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-jd3-blue focus:ring-2 focus:ring-blue-100">\n                  <option value="">Todos</option>\n                  ' + tiposEscuela.map(function(tipo) { return '<option value="' + escHtml(tipo) + '">' + escHtml(tipo) + '</option>'; }).join('') + '\n                </select>\n              </div>\n              <div>\n                <label for="fichaPageSize" class="block text-sm font-semibold text-slate-700">Por pagina</label>\n                <select id="fichaPageSize" class="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-jd3-blue focus:ring-2 focus:ring-blue-100">\n                  <option value="10">10</option>\n                  <option value="20" selected>20</option>\n                  <option value="50">50</option>\n                </select>\n              </div>\n            </div>\n\n            <div class="mt-5 overflow-x-auto">\n              <table class="min-w-full border-separate border-spacing-y-2">\n                <thead>\n                  <tr class="text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">\n                    <th class="px-4 py-2">Codigo Provincial</th>\n                    <th class="px-4 py-2">Codigo</th>\n                    <th class="px-4 py-2">Nro Escuela</th>\n                    <th class="px-4 py-2">Fecha Actualizacion</th>\n                    <th class="px-4 py-2">Email</th>\n                    <th class="px-4 py-2">Ficha</th>\n                  </tr>\n                </thead>\n                <tbody id="fichaTableBody"></tbody>\n              </table>\n            </div>\n\n            <div class="mt-4 flex flex-wrap items-center justify-between gap-3">\n              <p id="fichaPagingInfo" class="text-sm text-slate-600"></p>\n              <div class="flex items-center gap-2">\n                <button id="fichaPrevPage" type="button" class="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Anterior</button>\n                <button id="fichaNextPage" type="button" class="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Siguiente</button>\n              </div>\n            </div>\n          </section>\n\n          <div id="fichaSchoolModal" class="fixed inset-0 z-[70] hidden items-center justify-center bg-slate-900/65 p-4">\n            <div class="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">\n              <div class="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">\n                <div>\n                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-jd3-blue">Ficha de Escuela</p>\n                  <h3 id="fichaModalTitle" class="mt-2 text-2xl font-semibold text-jd3-ink">-</h3>\n                  <p id="fichaModalSubtitle" class="mt-1 text-sm text-slate-500">-</p>\n                </div>\n                <button id="fichaModalClose" type="button" class="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cerrar</button>\n              </div>\n\n              <div id="fichaModalEmailStatus" class="mt-4"></div>\n\n              <div class="mt-4 grid gap-4 lg:grid-cols-2">\n                <div>\n                  <h5 class="text-sm font-semibold text-slate-700">Datos generales</h5>\n                  <div id="fichaGeneralReadonly" class="mt-3 grid gap-2"></div>\n                </div>\n                <div>\n                  <h5 class="text-sm font-semibold text-slate-700">Datos de gestion</h5>\n                  <div id="fichaGestionReadonly" class="mt-3 grid gap-2"></div>\n                </div>\n              </div>\n\n              <div class="mt-6">\n                <h5 class="text-sm font-semibold text-slate-700">Campos editables</h5>\n                <div class="mt-3 grid gap-3 sm:grid-cols-2">\n                  <label class="text-sm text-slate-700">Nombre de la Escuela<input id="editNombreEscuela" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                  <label class="text-sm text-slate-700">Localidad<input id="editLocalidad" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                  <label class="text-sm text-slate-700">Calle<input id="editCalle" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                  <label class="text-sm text-slate-700">Altura<input id="editAltura" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                  <label class="text-sm text-slate-700">Esquina 1<input id="editEsquina1" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                  <label class="text-sm text-slate-700">Esquina 2<input id="editEsquina2" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                  <label class="text-sm text-slate-700">Codigo Postal<input id="editCodigoPostal" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                  <label class="text-sm text-slate-700">No usar<input id="editNoUsar" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                  <label class="text-sm text-slate-700">Telefono<input id="editTelefono" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                  <label class="text-sm text-slate-700">Email<input id="editEmail" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>\n                </div>\n              </div>\n\n              <div class="mt-6">\n                <h5 class="text-sm font-semibold text-slate-700">Equipo Directivo</h5>\n                <div id="fichaDirectivoContainer" class="mt-3 grid gap-3"></div>\n              </div>\n\n              <div class="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-4">\n                <button id="fichaResetPinBtn" type="button" class="rounded-2xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-700">Restablecer PIN (1234)</button>\n                <button id="fichaSaveBtn" type="button" class="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Guardar cambios</button>\n              </div>\n            </div>\n          </div>\n        ';
      },
      afterRender: function afterRenderFichaEscuela(context) {
        var app = context.app;
        var schools = (context.bootstrap.data && context.bootstrap.data.schools) ? context.bootstrap.data.schools.slice() : [];
        var filtered = schools.slice();
        var currentPage = 1;
        var current = null;
        var directivoCache = {};
        var createCatalog = null;

        var fichaEscuelaExcelBtn = document.getElementById('fichaEscuelaExcelBtn');
        var fichaEscuelaPdfBtn = document.getElementById('fichaEscuelaPdfBtn');
        var searchInput = document.getElementById('fichaSearchInput');
        var tipoFilter = document.getElementById('fichaTipoFilter');
        var pageSizeSelect = document.getElementById('fichaPageSize');
        var tableBody = document.getElementById('fichaTableBody');
        var pagingInfo = document.getElementById('fichaPagingInfo');
        var prevBtn = document.getElementById('fichaPrevPage');
        var nextBtn = document.getElementById('fichaNextPage');

        var modal = document.getElementById('fichaSchoolModal');
        var modalClose = document.getElementById('fichaModalClose');
        var modalTitle = document.getElementById('fichaModalTitle');
        var modalSubtitle = document.getElementById('fichaModalSubtitle');
        var emailStatus = document.getElementById('fichaModalEmailStatus');
        var readonlyGeneral = document.getElementById('fichaGeneralReadonly');
        var readonlyGestion = document.getElementById('fichaGestionReadonly');
        var directivoContainer = document.getElementById('fichaDirectivoContainer');
        var saveBtn = document.getElementById('fichaSaveBtn');
        var resetPinBtn = document.getElementById('fichaResetPinBtn');

        var fichaEscuelaCreateBtn = document.createElement('button');
        fichaEscuelaCreateBtn.type = 'button';
        fichaEscuelaCreateBtn.id = 'fichaEscuelaCreateBtn';
        fichaEscuelaCreateBtn.className = 'inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95';
        fichaEscuelaCreateBtn.innerHTML = '<i class="fa-solid fa-plus"></i>Crear Nueva Escuela';
        if (fichaEscuelaExcelBtn && fichaEscuelaExcelBtn.parentElement) {
          fichaEscuelaExcelBtn.parentElement.insertBefore(fichaEscuelaCreateBtn, fichaEscuelaExcelBtn);
        }

        var previousCreateModal = document.getElementById('fichaCreateModal');
        if (previousCreateModal && previousCreateModal.parentNode) {
          previousCreateModal.parentNode.removeChild(previousCreateModal);
        }

        var createModalContainer = document.createElement('div');
        createModalContainer.id = 'fichaCreateModal';
        createModalContainer.className = 'fixed inset-0 z-[72] hidden items-center justify-center bg-slate-900/65 p-4';
        createModalContainer.innerHTML =
          '<div class="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">' +
            '<div class="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">' +
              '<div>' +
                '<p class="text-xs font-semibold uppercase tracking-[0.3em] text-jd3-blue">Ficha de Escuela</p>' +
                '<h3 class="mt-2 text-2xl font-semibold text-jd3-ink">Crear Nueva Escuela</h3>' +
                '<p class="mt-1 text-sm text-slate-500">Campos obligatorios: Region, Distrital, Modalidad, Nivel, Codigo de Escuela, Codigo Provincial, CUE y Numero de Escuela.</p>' +
              '</div>' +
              '<button id="fichaCreateClose" type="button" class="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cerrar</button>' +
            '</div>' +
            '<div class="mt-4 grid gap-3 sm:grid-cols-2">' +
              '<label class="text-sm font-semibold text-slate-700">Region *<select id="createRegion" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"></select></label>' +
              '<label class="text-sm font-semibold text-slate-700">Distrital *<select id="createDistrital" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"></select></label>' +
              '<label class="text-sm font-semibold text-slate-700">Modalidad *<select id="createModalidad" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"></select></label>' +
              '<label class="text-sm font-semibold text-slate-700">Nivel *<select id="createNivel" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"></select></label>' +
              '<label class="text-sm font-semibold text-slate-700">Codigo de Escuela *<select id="createCodigoEscuela" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"></select></label>' +
              '<label class="text-sm font-semibold text-slate-700">Codigo Provincial *<input id="createCodigoProvincial" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm uppercase" placeholder="0069AB1234" maxlength="10" /></label>' +
              '<label class="text-sm font-semibold text-slate-700">CUE *<input id="createCue" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>' +
              '<label class="text-sm font-semibold text-slate-700">Numero de Escuela *<input id="createNumeroEscuela" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>' +
              '<label class="text-sm font-semibold text-slate-700">Tipo de Escuela<input id="createTipoEscuela" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>' +
              '<label class="text-sm font-semibold text-slate-700">Nombre de Escuela<input id="createNombreEscuela" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" /></label>' +
            '</div>' +
            '<p class="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">El PIN inicial se asigna automaticamente en 1234.</p>' +
            '<div class="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-4">' +
              '<button id="fichaCreateSave" type="button" class="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Guardar nueva escuela</button>' +
            '</div>' +
          '</div>';
        document.body.appendChild(createModalContainer);

        var createModal = createModalContainer;
        var createCloseBtn = document.getElementById('fichaCreateClose');
        var createSaveBtn = document.getElementById('fichaCreateSave');
        var createRegion = document.getElementById('createRegion');
        var createDistrital = document.getElementById('createDistrital');
        var createModalidad = document.getElementById('createModalidad');
        var createNivel = document.getElementById('createNivel');
        var createCodigoEscuela = document.getElementById('createCodigoEscuela');
        var createCodigoProvincial = document.getElementById('createCodigoProvincial');
        var createCue = document.getElementById('createCue');
        var createNumeroEscuela = document.getElementById('createNumeroEscuela');
        var createTipoEscuela = document.getElementById('createTipoEscuela');
        var createNombreEscuela = document.getElementById('createNombreEscuela');

        function getPageSize() {
          return Number(pageSizeSelect.value || 20) || 20;
        }

        function findByRow(rowNumber) {
          return schools.find(function(item) { return String(item.rowNumber) === String(rowNumber); });
        }

        function renderSelectOptions(selectEl, items) {
          selectEl.innerHTML = '<option value="">Seleccionar</option>' +
            (items || []).map(function(item) {
              return '<option value="' + escHtml(item) + '">' + escHtml(item) + '</option>';
            }).join('');
        }

        function closeCreateModal() {
          createModal.classList.add('hidden');
          createModal.classList.remove('flex');
        }

        function loadCreateCatalog() {
          if (createCatalog) {
            return Promise.resolve(createCatalog);
          }
          return app.callServer('getFichaEscuelaCreationCatalog', [], 'Cargando catalogos para nueva escuela...')
            .then(function(result) {
              createCatalog = result || {};
              renderSelectOptions(createRegion, createCatalog.regiones || []);
              renderSelectOptions(createDistrital, createCatalog.distritales || []);
              renderSelectOptions(createModalidad, createCatalog.modalidades || []);
              renderSelectOptions(createNivel, createCatalog.niveles || []);
              renderSelectOptions(createCodigoEscuela, createCatalog.codigosEscuela || []);
              return createCatalog;
            });
        }

        function openCreateModal() {
          loadCreateCatalog()
            .then(function() {
              createRegion.value = '';
              createDistrital.value = '';
              createModalidad.value = '';
              createNivel.value = '';
              createCodigoEscuela.value = '';
              createCodigoProvincial.value = '';
              createCue.value = '';
              createNumeroEscuela.value = '';
              createTipoEscuela.value = '';
              createNombreEscuela.value = '';
              createModal.classList.remove('hidden');
              createModal.classList.add('flex');
            })
            .catch(function(error) {
              app.showMessageModal('No se pudo abrir el alta', error && error.message ? error.message : 'Se produjo un error inesperado.');
            });
        }

        function applyFilters() {
          var query = normalizeText(searchInput.value);
          var tipo = String(tipoFilter.value || '').trim();

          filtered = schools.filter(function(s) {
            if (tipo && String(s.tipoEscuela || '') !== tipo) {
              return false;
            }
            if (!query) {
              return true;
            }
            var haystack = [
              s.codigoProvincial,
              s.codigoOrganizacion,
              s.numeroEscuela,
              s.nombreEscuela,
              s.cue,
              s.tipoEscuela
            ].join(' ');
            return normalizeText(haystack).indexOf(query) !== -1;
          });

          currentPage = 1;
          renderPage();
        }

        function renderPage() {
          var pageSize = getPageSize();
          var total = filtered.length;
          var totalPages = Math.max(1, Math.ceil(total / pageSize));
          if (currentPage > totalPages) {
            currentPage = totalPages;
          }

          var start = (currentPage - 1) * pageSize;
          var end = Math.min(start + pageSize, total);
          var pageRows = filtered.slice(start, end);

          if (!pageRows.length) {
            tableBody.innerHTML = '<tr><td colspan="6" class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">No se encontraron escuelas con esos filtros.</td></tr>';
          } else {
            tableBody.innerHTML = pageRows.map(function(s) {
              var emailClass = s.emailValido ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';
              var emailLabel = s.emailValido ? 'Valido' : 'Invalido';
              return '<tr class="rounded-[1.25rem] bg-slate-50 text-sm text-slate-700">' +
                '<td class="rounded-l-[1.25rem] px-4 py-3 font-semibold text-jd3-ink">' + escHtml(s.codigoProvincial || '-') + '</td>' +
                '<td class="px-4 py-3">' + escHtml(s.codigoOrganizacion || '-') + '</td>' +
                '<td class="px-4 py-3">' + escHtml(s.numeroEscuela || '-') + '</td>' +
                '<td class="px-4 py-3">' + escHtml(s.fechaActualizacion || '-') + '</td>' +
                '<td class="px-4 py-3"><span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold ' + emailClass + '">' + emailLabel + '</span></td>' +
                '<td class="rounded-r-[1.25rem] px-4 py-3"><button type="button" class="ficha-view-btn inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700" data-row="' + escHtml(s.rowNumber) + '"><i class="fa-solid fa-eye"></i>Ver ficha</button></td>' +
              '</tr>';
            }).join('');
          }

          pagingInfo.textContent = total
            ? ('Mostrando ' + (start + 1) + ' - ' + end + ' de ' + total + ' escuelas')
            : 'Mostrando 0 resultados';

          prevBtn.disabled = currentPage <= 1;
          nextBtn.disabled = currentPage >= totalPages;
          prevBtn.classList.toggle('opacity-40', prevBtn.disabled);
          nextBtn.classList.toggle('opacity-40', nextBtn.disabled);

          bindViewButtons();
        }

        function bindViewButtons() {
          document.querySelectorAll('.ficha-view-btn').forEach(function(button) {
            button.addEventListener('click', function() {
              var rowNumber = button.getAttribute('data-row');
              var school = findByRow(rowNumber);
              if (school) {
                showModal(school);
              }
            });
          });
        }

        function showModal(school) {
          current = school;
          modalTitle.textContent = school.nombreEscuela || 'Escuela';
          modalSubtitle.textContent = 'Tipo: ' + (school.tipoEscuela || '-') + ' | Numero: ' + (school.numeroEscuela || '-') + ' | Codigo Provincial: ' + (school.codigoProvincial || '-');

          emailStatus.innerHTML = school.emailValido
            ? '<span class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Email valido (@abc.gob.ar)</span>'
            : '<span class="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">Email invalido (debe terminar en @abc.gob.ar)</span>';

          readonlyGeneral.innerHTML = [
            buildInfoCard('Region', school.region),
            buildInfoCard('Distrital', school.distrital),
            buildInfoCard('Modalidad', school.modalidad),
            buildInfoCard('Nivel', school.nivel),
            buildInfoCard('Codigo Provincial', school.codigoProvincial),
            buildInfoCard('CUE', school.cue),
            buildInfoCard('Codigo de Organizacion', school.codigoOrganizacion),
            buildInfoCard('Numero de Escuela', school.numeroEscuela),
            buildInfoCard('Tipo de Escuela', school.tipoEscuela),
            buildInfoCard('PIN', school.pin)
          ].join('');

          readonlyGestion.innerHTML = [
            buildInfoCard('Gestion', school.gestion),
            buildInfoCard('Dependencia', school.dependencia),
            buildInfoCard('Ambito', school.ambito),
            buildInfoCard('Desfavorabilidad', school.desfavorabilidad),
            buildInfoCard('Sede', school.sede),
            buildInfoCard('Cue Sede', school.cueSede),
            buildInfoCard('Categoria', school.categoria),
            buildInfoCard('Fecha de Actualizacion', school.fechaActualizacion),
            buildInfoCard('Cuenta de Usuario', school.cuentaUsuario)
          ].join('');

          document.getElementById('editNombreEscuela').value = school.nombreEscuela || '';
          document.getElementById('editLocalidad').value = school.localidad || '';
          document.getElementById('editCalle').value = school.calle || '';
          document.getElementById('editAltura').value = school.altura || '';
          document.getElementById('editEsquina1').value = school.esquina1 || '';
          document.getElementById('editEsquina2').value = school.esquina2 || '';
          document.getElementById('editCodigoPostal').value = school.codigoPostal || '';
          document.getElementById('editNoUsar').value = school.noUsar || '';
          document.getElementById('editTelefono').value = school.telefono || '';
          document.getElementById('editEmail').value = school.email || '';

          directivoContainer.innerHTML = '<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">Cargando equipo directivo...</div>';
          modal.classList.remove('hidden');
          modal.classList.add('flex');

          var code = school.codigoProvincial || '';
          if (!code) {
            directivoContainer.innerHTML = '<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">Esta escuela no tiene codigo provincial cargado.</div>';
            return;
          }

          if (directivoCache[code]) {
            renderDirectivos(directivoCache[code]);
            return;
          }

          app.callServer('getFichaEscuelaEquipoDirectivo', [code], 'Cargando equipo directivo...')
            .then(function(items) {
              var safeItems = Array.isArray(items) ? items : [];
              directivoCache[code] = safeItems;
              if (!current || String(current.rowNumber) !== String(school.rowNumber)) {
                return;
              }
              renderDirectivos(safeItems);
            })
            .catch(function(error) {
              if (!current || String(current.rowNumber) !== String(school.rowNumber)) {
                return;
              }
              directivoContainer.innerHTML = '<div class="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">No se pudo cargar el equipo directivo: ' +
                escHtml(error && error.message ? error.message : 'error inesperado.') + '</div>';
            });
        }

        function renderDirectivos(items) {
          directivoContainer.innerHTML = items.length
            ? items.map(buildDirectivoCard).join('')
            : '<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">No se encontraron registros de equipo directivo.</div>';
        }

        function hideModal() {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          current = null;
        }

        function downloadFichaEscuelaPdf() {
          if (!window.jspdf || !window.jspdf.jsPDF) {
            app.showMessageModal('PDF no disponible', 'No se pudo cargar la libreria para exportar PDF.');
            return;
          }

          var jsPDF = window.jspdf.jsPDF;
          var doc = new jsPDF('l', 'mm', 'a4');
          var pageW = doc.internal.pageSize.getWidth();
          var pageH = doc.internal.pageSize.getHeight();
          var marginX = 8;
          var contentW = pageW - (marginX * 2);
          var y = 10;
          var lineH = 3.6;
          var colGap = 4;
          var colW = (contentW - colGap) / 2;

          function ensureSpace(heightNeeded) {
            if (y + heightNeeded <= pageH - 8) {
              return;
            }
            doc.addPage();
            y = 10;
          }

          function drawMainHeader() {
            var h = 12;
            ensureSpace(h + 2);
            doc.setFillColor(30, 58, 138);
            doc.roundedRect(marginX, y, contentW, h, 2, 2, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text('Ficha de Escuela - Listado Completo (Apaisado)', marginX + 3, y + 4.9);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.text('Actualizacion: ' + ((context.bootstrap.data && context.bootstrap.data.updatedAt) || '-'), marginX + 3, y + 9.1);
            doc.setTextColor(0, 0, 0);
            y += h + 4;
          }

          function drawSectionTitle(text) {
            var h = 6.5;
            ensureSpace(h + 2);
            doc.setFillColor(219, 234, 254);
            doc.roundedRect(marginX, y, contentW, h, 1.5, 1.5, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9.5);
            doc.setTextColor(30, 64, 175);
            doc.text(String(text || ''), marginX + 3, y + 4.5);
            doc.setTextColor(0, 0, 0);
            y += h + 2;
          }

          function buildFieldPairs(school) {
            var fields = [
              { label: 'Codigo Provincial', value: school.codigoProvincial },
              { label: 'Region', value: school.region },
              { label: 'Distrital', value: school.distrital },
              { label: 'Modalidad', value: school.modalidad },
              { label: 'Nivel', value: school.nivel },
              { label: 'CUE', value: school.cue },
              { label: 'Codigo Organizacion', value: school.codigoOrganizacion },
              { label: 'Numero Escuela', value: school.numeroEscuela },
              { label: 'Tipo Escuela', value: school.tipoEscuela },
              { label: 'Nombre Escuela', value: school.nombreEscuela },
              { label: 'Localidad', value: school.localidad },
              { label: 'Calle', value: school.calle },
              { label: 'Altura', value: school.altura },
              { label: 'Esquina 1', value: school.esquina1 },
              { label: 'Esquina 2', value: school.esquina2 },
              { label: 'Codigo Postal', value: school.codigoPostal },
              { label: 'No Usar', value: school.noUsar },
              { label: 'Telefono', value: school.telefono },
              { label: 'Email', value: school.email },
              { label: 'Gestion', value: school.gestion },
              { label: 'Dependencia', value: school.dependencia },
              { label: 'Ambito', value: school.ambito },
              { label: 'Desfavorabilidad', value: school.desfavorabilidad },
              { label: 'Sede', value: school.sede },
              { label: 'CUE Sede', value: school.cueSede },
              { label: 'Categoria', value: school.categoria },
              { label: 'Fecha Actualizacion', value: school.fechaActualizacion },
              { label: 'Cuenta Usuario', value: school.cuentaUsuario }
            ];

            var pairs = [];
            for (var i = 0; i < fields.length; i += 2) {
              pairs.push({
                left: fields[i],
                right: fields[i + 1] || null
              });
            }
            return pairs;
          }

          function buildSchoolCardModel(school, cardWidth) {
            var innerPadX = 2;
            var pairGap = 2;
            var pairWidth = (cardWidth - (innerPadX * 2) - pairGap) / 2;
            var title = (school.numeroEscuela || '-') + ' - ' + (school.nombreEscuela || '-');
            var titleLines = doc.splitTextToSize(title, cardWidth - 4);
            var pairs = buildFieldPairs(school);
            var rows = [];
            var totalRowsHeight = 0;

            pairs.forEach(function(pair) {
              var leftText = pair.left.label + ': ' + (pair.left.value || '-');
              var leftLines = doc.splitTextToSize(leftText, pairWidth);
              var rightLines = [];
              if (pair.right) {
                var rightText = pair.right.label + ': ' + (pair.right.value || '-');
                rightLines = doc.splitTextToSize(rightText, pairWidth);
              }

              var rowLineCount = Math.max(leftLines.length, rightLines.length || 1);
              var rowHeight = rowLineCount * lineH;
              totalRowsHeight += rowHeight;
              rows.push({
                leftLines: leftLines,
                rightLines: rightLines,
                rowHeight: rowHeight
              });
            });

            return {
              titleLines: titleLines,
              rows: rows,
              totalHeight: 3 + (titleLines.length * lineH) + 1.5 + totalRowsHeight + 3
            };
          }

          function drawSchoolCard(model, x, baseY, cardWidth, cardHeight) {
            var innerPadX = 2;
            var pairGap = 2;
            var pairWidth = (cardWidth - (innerPadX * 2) - pairGap) / 2;
            var rightX = x + innerPadX + pairWidth + pairGap;

            doc.setFillColor(248, 250, 252);
            doc.roundedRect(x, baseY, cardWidth, cardHeight, 1.2, 1.2, 'F');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.8);
            doc.text(model.titleLines, x + 2, baseY + 4.2);

            var cursorY = baseY + 4.2 + (model.titleLines.length * lineH) + 0.6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.6);

            model.rows.forEach(function(row) {
              doc.text(row.leftLines, x + innerPadX, cursorY + 3.1);
              if (row.rightLines && row.rightLines.length) {
                doc.text(row.rightLines, rightX, cursorY + 3.1);
              }
              cursorY += row.rowHeight;
            });
          }

          var sectionMap = {};
          schools.forEach(function(school) {
            var tipo = String(school.tipoEscuela || 'Sin Tipo').trim() || 'Sin Tipo';
            if (!sectionMap[tipo]) {
              sectionMap[tipo] = [];
            }
            sectionMap[tipo].push(school);
          });

          var sectionNames = Object.keys(sectionMap).sort(function(a, b) {
            return normalizeText(a).localeCompare(normalizeText(b));
          });

          drawMainHeader();

          sectionNames.forEach(function(sectionName) {
            drawSectionTitle('Tipo de Escuela: ' + sectionName);
            var sectionSchools = sectionMap[sectionName];
            sectionSchools.sort(function(a, b) {
              var aNum = Number(String(a.numeroEscuela || '').replace(/[^0-9]/g, ''));
              var bNum = Number(String(b.numeroEscuela || '').replace(/[^0-9]/g, ''));
              if (!isNaN(aNum) && !isNaN(bNum) && aNum !== bNum) {
                return aNum - bNum;
              }
              return normalizeText(a.nombreEscuela).localeCompare(normalizeText(b.nombreEscuela));
            });
            for (var i = 0; i < sectionSchools.length; i += 2) {
              var leftSchool = sectionSchools[i];
              var rightSchool = sectionSchools[i + 1] || null;

              var leftModel = buildSchoolCardModel(leftSchool, colW);
              var rightModel = rightSchool ? buildSchoolCardModel(rightSchool, colW) : null;
              var rowHeight = Math.max(leftModel.totalHeight, rightModel ? rightModel.totalHeight : 0);

              ensureSpace(rowHeight + 2);
              drawSchoolCard(leftModel, marginX, y, colW, rowHeight);
              if (rightModel) {
                drawSchoolCard(rightModel, marginX + colW + colGap, y, colW, rowHeight);
              }
              y += rowHeight + 2;
            }

            y += 1;
          });

          doc.save('Ficha de Escuela - Completo.pdf');
        }

        if (searchInput) {
          searchInput.addEventListener('input', applyFilters);
        }

        if (tipoFilter) {
          tipoFilter.addEventListener('change', applyFilters);
        }

        if (pageSizeSelect) {
          pageSizeSelect.addEventListener('change', function() {
            currentPage = 1;
            renderPage();
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
              currentPage -= 1;
              renderPage();
            }
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function() {
            var totalPages = Math.max(1, Math.ceil(filtered.length / getPageSize()));
            if (currentPage < totalPages) {
              currentPage += 1;
              renderPage();
            }
          });
        }

        if (modalClose) {
          modalClose.addEventListener('click', hideModal);
        }

        if (modal) {
          modal.addEventListener('click', function(event) {
            if (event.target === modal) {
              hideModal();
            }
          });
        }

        if (fichaEscuelaCreateBtn) {
          fichaEscuelaCreateBtn.addEventListener('click', openCreateModal);
        }

        if (createCloseBtn) {
          createCloseBtn.addEventListener('click', closeCreateModal);
        }

        if (createModal) {
          createModal.addEventListener('click', function(event) {
            if (event.target === createModal) {
              closeCreateModal();
            }
          });
        }

        if (createCodigoProvincial) {
          createCodigoProvincial.addEventListener('input', function() {
            createCodigoProvincial.value = String(createCodigoProvincial.value || '').toUpperCase();
          });
        }

        if (fichaEscuelaExcelBtn) {
          fichaEscuelaExcelBtn.addEventListener('click', function() {
            app.callServer('getFichaEscuelaExcelData', [], 'Generando Excel de Ficha de Escuela...')
              .then(function(payload) {
                triggerExcelDownload(buildFichaEscuelaExcelHtml(payload || {}), 'Ficha de Escuela - General.xls');
              })
              .catch(function(error) {
                app.showMessageModal('Error al generar Excel', error && error.message ? error.message : 'Se produjo un error inesperado.');
              });
          });
        }

        if (fichaEscuelaPdfBtn) {
          fichaEscuelaPdfBtn.addEventListener('click', function() {
            downloadFichaEscuelaPdf();
          });
        }

        if (saveBtn) {
          saveBtn.addEventListener('click', function() {
            if (!current) {
              return;
            }

            var payload = {
              nombreEscuela: document.getElementById('editNombreEscuela').value,
              localidad: document.getElementById('editLocalidad').value,
              calle: document.getElementById('editCalle').value,
              altura: document.getElementById('editAltura').value,
              esquina1: document.getElementById('editEsquina1').value,
              esquina2: document.getElementById('editEsquina2').value,
              codigoPostal: document.getElementById('editCodigoPostal').value,
              noUsar: document.getElementById('editNoUsar').value,
              telefono: document.getElementById('editTelefono').value,
              email: document.getElementById('editEmail').value
            };

            app.callServer('updateFichaEscuelaData', [current.rowNumber, payload], 'Guardando ficha de escuela...')
              .then(function(updated) {
                if (!updated) {
                  return;
                }
                schools = schools.map(function(item) {
                  return String(item.rowNumber) === String(updated.rowNumber) ? updated : item;
                });
                applyFilters();
                showModal(updated);
                app.showMessageModal('Ficha actualizada', 'Se guardaron los cambios correctamente.');
              })
              .catch(function(error) {
                app.showMessageModal('Error al guardar', error && error.message ? error.message : 'Se produjo un error inesperado.');
              });
          });
        }

        if (resetPinBtn) {
          resetPinBtn.addEventListener('click', function() {
            if (!current) {
              return;
            }

            if (!window.confirm('Confirma restablecer el PIN a 1234?')) {
              return;
            }

            app.callServer('resetFichaEscuelaPin', [current.rowNumber], 'Restableciendo PIN...')
              .then(function(updated) {
                if (!updated) {
                  return;
                }
                schools = schools.map(function(item) {
                  return String(item.rowNumber) === String(updated.rowNumber) ? updated : item;
                });
                applyFilters();
                showModal(updated);
                app.showMessageModal('PIN restablecido', 'El PIN fue actualizado a 1234.');
              })
              .catch(function(error) {
                app.showMessageModal('Error al restablecer PIN', error && error.message ? error.message : 'Se produjo un error inesperado.');
              });
          });
        }

        if (createSaveBtn) {
          createSaveBtn.addEventListener('click', function() {
            var payload = {
              region: createRegion.value,
              distrital: createDistrital.value,
              modalidad: createModalidad.value,
              nivel: createNivel.value,
              codigoEscuela: createCodigoEscuela.value,
              codigoProvincial: String(createCodigoProvincial.value || '').toUpperCase().trim(),
              cue: createCue.value,
              numeroEscuela: createNumeroEscuela.value,
              tipoEscuela: createTipoEscuela.value,
              nombreEscuela: createNombreEscuela.value
            };

            app.callServer('createFichaEscuelaRecord', [payload], 'Creando nueva escuela...')
              .then(function(created) {
                if (!created) {
                  return;
                }
                schools.push(created);
                schools.sort(function(a, b) {
                  return normalizeText(a.nombreEscuela).localeCompare(normalizeText(b.nombreEscuela));
                });
                closeCreateModal();
                applyFilters();
                showModal(created);
                app.showMessageModal('Escuela creada', 'La nueva escuela fue creada correctamente con PIN inicial 1234.');
              })
              .catch(function(error) {
                app.showMessageModal('Error al crear escuela', error && error.message ? error.message : 'Se produjo un error inesperado.');
              });
          });
        }

        Promise.all([
          loadScriptOnce('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js')
        ]).catch(function() {
          /* Se informa al intentar descargar PDF */
        });

        applyFilters();
      }
    });
  })();
</script>


