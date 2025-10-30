/**
 * Configuración de Google Sheets
 * Las credenciales se leen desde las variables de entorno (.env)
 * 
 * IMPORTANTE: Crea un archivo .env en la raíz del proyecto con:
 * VITE_GOOGLE_SHEETS_API_KEY=tu-api-key-aqui
 * VITE_GOOGLE_SHEET_ID=tu-sheet-id-aqui
 * VITE_GOOGLE_SHEET_RANGE=REGISTRO DE RECLAMOS R28!A2:O
 */

/**
 * Tu clave de API de Google Sheets.
 * Se obtiene desde: https://console.cloud.google.com/apis/credentials
 */
export const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';

/**
 * El ID de tu planilla de cálculo de Google Sheets.
 * Lo encuentras en la URL: https://docs.google.com/spreadsheets/d/ID_DE_LA_PLANILLA/edit
 */
export const GOOGLE_SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || '';

/**
 * El rango de celdas que quieres leer. Debe incluir el nombre de la hoja.
 * @example 'Hoja1!A2:O' o 'REGISTRO DE RECLAMOS R28!A2:O'
 */
export const GOOGLE_SHEET_RANGE = import.meta.env.VITE_GOOGLE_SHEET_RANGE || 'REGISTRO DE RECLAMOS R28!A2:O';
