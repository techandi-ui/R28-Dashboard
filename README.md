# Dashboard de Reclamos R28

<div align="center">

Un dashboard moderno y elegante para la gestión de reclamos, desarrollado con React, TypeScript y diseño premium estilo shadcn/Apple/OpenAI.

**[Ver Demo](#) | [Reportar Bug](#) | [Solicitar Feature](#)**

</div>

---

## ✨ Características

- 🎨 **Diseño Premium**: Interfaz moderna inspirada en Apple, OpenAI, Perplexity y Anthropic
- 📊 **Visualización de Datos**: Gráficos interactivos con Recharts
- 🔄 **Integración con Google Sheets**: Carga de datos en tiempo real desde Google Sheets API
- 🎭 **Animaciones Suaves**: Transiciones y microinteracciones fluidas
- 📱 **Totalmente Responsive**: Optimizado para desktop, tablet y móvil
- 🔍 **Filtros Avanzados**: Búsqueda y filtrado por múltiples criterios
- 📋 **Tabla Interactiva**: Ordenamiento, paginación y vista detallada de reclamos
- 🎯 **KPIs en Tiempo Real**: Indicadores clave de rendimiento con animaciones
- 🌐 **Internacionalización**: Configurado para español de Argentina

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** (v16 o superior)
- **npm** o **yarn**
- Una cuenta de Google Cloud con API de Google Sheets habilitada
- Un documento de Google Sheets con los datos de reclamos

### Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd R28-Dashboard
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# Google Sheets API Configuration
VITE_GOOGLE_SHEETS_API_KEY=tu-api-key-aqui
VITE_GOOGLE_SHEET_ID=tu-sheet-id-aqui
VITE_GOOGLE_SHEET_RANGE=REGISTRO DE RECLAMOS R28!A2:O
```

**¿Dónde obtener estos valores?**

- **API Key**: 
  1. Ve a [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
  2. Crea un proyecto nuevo o selecciona uno existente
  3. Habilita la API de Google Sheets
  4. Crea credenciales (API Key)
  5. Copia la API Key generada

- **Sheet ID**: 
  - Se encuentra en la URL de tu planilla
  - Ejemplo: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

- **Range**: 
  - Especifica el rango de celdas a leer
  - Formato: `NombreHoja!CeldaInicio:CeldaFin`
  - Ejemplo: `REGISTRO DE RECLAMOS R28!A2:O`

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Compilar para producción**
```bash
npm run build
npm run preview
```

---

## 📊 Estructura de Datos de Google Sheets

Tu planilla de Google Sheets debe tener la siguiente estructura (las columnas deben estar en este orden):

| Columna | Nombre | Tipo | Descripción |
|---------|--------|------|-------------|
| A | Nro. de Reclamo | Número | Identificador único del reclamo |
| B | ESTADO | Texto | EN COLA, EN PROCESO, o FINALIZADO |
| C | Marca temporal | Fecha/Hora | Fecha y hora de creación |
| D | Email | Texto | Email del cliente |
| E | Fecha del reclamo | Fecha | Fecha del reclamo |
| F | Número de CC | Texto | Número de centro de costo |
| G | Servicio | Texto | Tipo de servicio |
| H | Empresa | Texto | Nombre de la empresa |
| I | ¿Necesita reposición? | Texto | SÍ o NO |
| J | Fecha de entrega | Fecha | Fecha de entrega estimada |
| K | Origen del reclamo | Texto | Origen del reclamo |
| L | Nombre del proveedor | Texto | Proveedor de entrega |
| M | Depósito | Texto | Ubicación del depósito |
| N | Descripción | Texto | Descripción detallada del reclamo |
| O | Motivo | Texto | Motivo del reclamo |

**Importante**: La primera fila debe contener los encabezados y los datos deben comenzar desde la fila 2.

---

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Recharts** - Librería de gráficos
- **Tailwind CSS** - Framework CSS (vía CDN)
- **Phosphor Icons** - Iconografía
- **Google Sheets API** - Fuente de datos

---

## 📁 Estructura del Proyecto

```
R28-Dashboard/
├── components/
│   ├── charts/              # Componentes de gráficos
│   │   ├── StatusPieChart.tsx
│   │   ├── ClaimsTimelineChart.tsx
│   │   ├── ClaimsByCompanyBarChart.tsx
│   │   └── ClaimsByReasonBarChart.tsx
│   ├── ui/                  # Componentes UI base
│   │   ├── Badge.tsx
│   │   ├── Icon.tsx
│   │   ├── Modal.tsx
│   │   └── SkeletonLoader.tsx
│   ├── Header.tsx           # Cabecera del dashboard
│   ├── KPICard.tsx          # Tarjetas de indicadores
│   ├── Filters.tsx          # Filtros de búsqueda
│   ├── ClaimsTable.tsx      # Tabla de reclamos
│   └── ClaimDetailModal.tsx # Modal de detalle
├── services/
│   └── googleSheetsService.ts # Servicio de Google Sheets API
├── hooks/
│   └── useClaimsData.ts     # Hook personalizado de datos
├── config.ts                # Configuración de variables de entorno
├── constants.ts             # Constantes y colores
├── types.ts                 # Definiciones de TypeScript
├── App.tsx                  # Componente principal
├── index.html               # HTML base
├── index.tsx                # Punto de entrada
├── .env                     # Variables de entorno (no versionado)
├── .env.example             # Plantilla de variables de entorno
└── README.md                # Esta documentación
```

---

## 🎨 Sistema de Diseño

El dashboard utiliza un sistema de diseño premium con:

- **Paleta de colores**: Tonos slate/zinc con acentos blue, amber, y emerald
- **Tipografía**: Inter con pesos 400, 500, y 600
- **Radios**: De 0.5rem a 1rem para diferentes elementos
- **Sombras**: Sistema de sombras sutiles en 5 niveles
- **Animaciones**: Transiciones suaves con cubic-bezier timing
- **Espaciado**: Sistema consistente basado en múltiplos de 4px

---

## 🔧 Configuración Avanzada

### Personalizar colores de gráficos

Edita `constants.ts`:

```typescript
export const CHART_COLORS = {
    pie: ['#f59e0b', '#3b82f6', '#10b981'],
    // Agrega más colores aquí
};
```

### Ajustar paginación de tabla

En `components/ClaimsTable.tsx`:

```typescript
const ROWS_PER_PAGE = 15; // Cambia este valor
```

### Modificar animaciones

En `index.html`, ajusta las variables CSS:

```css
:root {
    --radius: 0.5rem;
    /* Personaliza otras variables */
}
```

---

## 🐛 Solución de Problemas

### Error: "Configuración incompleta de Google Sheets"

**Causa**: Las variables de entorno no están configuradas correctamente.

**Solución**: 
1. Verifica que existe el archivo `.env` en la raíz
2. Confirma que las variables tienen el prefijo `VITE_`
3. Reinicia el servidor de desarrollo después de modificar el `.env`

### Error 403: "Acceso denegado"

**Causa**: La planilla no es pública o la API Key no tiene permisos.

**Solución**:
1. Haz que la planilla sea pública o compártela con "Cualquiera con el enlace"
2. Verifica que la API de Google Sheets esté habilitada en tu proyecto
3. Confirma que la API Key tiene permisos para la Google Sheets API

### Error 404: "No se encontró la planilla"

**Causa**: El `SHEET_ID` o `RANGE` son incorrectos.

**Solución**:
1. Verifica que el SHEET_ID sea correcto (cópialo de la URL)
2. Confirma que el RANGE incluya el nombre correcto de la hoja
3. Asegúrate de que el rango especificado existe en la planilla

### Los datos no se cargan

**Causa**: Problema con la estructura de datos o red.

**Solución**:
1. Abre la consola del navegador (F12) y revisa los errores
2. Verifica que la estructura de la planilla coincida con lo esperado
3. Confirma que la primera fila contiene encabezados
4. Verifica tu conexión a internet

---

## 📝 Próximas Mejoras

- [ ] Exportación de datos a PDF/Excel
- [ ] Notificaciones en tiempo real
- [ ] Modo oscuro
- [ ] Gestión de usuarios y permisos
- [ ] Historial de cambios de estado
- [ ] Comentarios en reclamos
- [ ] Integración con email
- [ ] PWA (Progressive Web App)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y está bajo la propiedad de R28.

---

## 👥 Contacto

**R28** - Dashboard de Reclamos

Desarrollado con ❤️ usando React y TypeScript

---

## 🙏 Agradecimientos

- Diseño inspirado en [shadcn/ui](https://ui.shadcn.com/)
- Iconos por [Phosphor Icons](https://phosphoricons.com/)
- Gráficos por [Recharts](https://recharts.org/)
- Tipografía [Inter](https://rsms.me/inter/) por Rasmus Andersson
