import { Claim, Status } from '../types';
import { GOOGLE_SHEETS_API_KEY, GOOGLE_SHEET_ID, GOOGLE_SHEET_RANGE } from '../config';

// Lee las credenciales desde el archivo de configuración
const API_KEY = GOOGLE_SHEETS_API_KEY;
const SHEET_ID = GOOGLE_SHEET_ID;
const RANGE = GOOGLE_SHEET_RANGE;

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

// Parsea los datos recibidos de la API de Google Sheets
const parseSheetData = (values: string[][]): Claim[] => {
    if (!values || values.length === 0) return [];
    
    // Column mapping based on user request:
    // 0: Nro. de Reclamo, 1: ESTADO, 2: Marca temporal, 3: Email, 4: Fecha del reclamo, 
    // 5: Número de CC, 6: Servicio, 7: Empresa, 8: ¿Necesita reposición?, 9: Fecha de entrega, 
    // 10: Origen del reclamo, 11: Nombre del proveedor, 12: Depósito, 13: Descripción, 14: Motivo
    return values.map((row, index) => {
        // Skip empty rows
        if (row.every(cell => !cell)) return null;

        try {
            return {
                nroReclamo: parseInt(row[0], 10),
                estado: row[1]?.toUpperCase() as Status || Status.EnCola,
                marcaTemporal: row[2] || new Date().toISOString(),
                email: row[3] || 'N/A',
                fechaReclamo: row[4] || new Date().toISOString().split('T')[0],
                numeroCC: row[5] || 'N/A',
                servicio: row[6] || 'N/A',
                empresa: row[7] || 'N/A',
                necesitaReposicion: row[8]?.toUpperCase() === 'SÍ' || row[8]?.toUpperCase() === 'SI',
                fechaEntrega: row[9] || null,
                origenReclamo: row[10] || 'N/A',
                nombreProveedor: row[11] || 'N/A',
                deposito: row[12] || 'N/A',
                descripcionReclamo: row[13] || 'Sin descripción.',
                motivo: row[14] || 'Sin motivo especificado',
            };
        } catch (e) {
            console.error(`Error parsing row ${index + 2}:`, row, e);
            return null; // Return null for rows that fail parsing
        }
    }).filter((claim): claim is Claim => claim !== null); // Filter out null values
};


export const fetchClaimsData = async (): Promise<Claim[]> => {
    // Validación de credenciales
    if (!API_KEY || !SHEET_ID || !RANGE) {
        throw new Error(
            '⚠️ Configuración incompleta de Google Sheets.\n\n' +
            'Por favor, crea un archivo .env en la raíz del proyecto con:\n' +
            'VITE_GOOGLE_SHEETS_API_KEY=tu-api-key-aqui\n' +
            'VITE_GOOGLE_SHEET_ID=tu-sheet-id-aqui\n' +
            'VITE_GOOGLE_SHEET_RANGE=REGISTRO DE RECLAMOS R28!A2:O\n\n' +
            'Consulta el archivo .env.example para más detalles.'
        );
    }

    try {
        console.log("📊 Obteniendo datos desde Google Sheets...");
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            let errorMessage = `Error ${response.status} al conectar con Google Sheets.`;
            
            try {
                const errorData = await response.json();
                console.error('Error detallado de Google Sheets API:', errorData);
                
                if (response.status === 400) {
                    errorMessage = '⚠️ API Key inválida o configuración incorrecta.';
                } else if (response.status === 403) {
                    errorMessage = '🔒 Acceso denegado. Verifica que la API Key tenga permisos y que la planilla sea pública o esté compartida.';
                } else if (response.status === 404) {
                    errorMessage = '📄 No se encontró la planilla. Verifica el SHEET_ID y el RANGE.';
                }
            } catch (e) {
                // Si no se puede parsear el error, usar el mensaje genérico
            }
            
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        if (!data.values || data.values.length === 0) {
            console.warn('⚠️ La planilla no contiene datos en el rango especificado.');
            return [];
        }
        
        const claims = parseSheetData(data.values);
        console.log(`✅ ${claims.length} reclamos cargados exitosamente.`);
        return claims;

    } catch (error) {
        console.error("❌ Error al obtener datos de Google Sheets:", error);
        if (error instanceof Error) {
           throw error;
        }
        throw new Error('Error de red o configuración. Revisa la consola para más detalles.');
    }
};