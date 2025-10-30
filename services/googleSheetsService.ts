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
    if (!API_KEY || !SHEET_ID || !RANGE || API_KEY === 'TU_CLAVE_API_AQUI' || SHEET_ID === 'TU_ID_DE_PLANILLA_AQUI') {
        throw new Error('Por favor, configure sus credenciales de Google Sheets en el archivo `config.ts`.');
    }

    try {
        console.log("Fetching real data from Google Sheets...");
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error from Google Sheets API:', errorData);
            throw new Error(`Error al conectar con la API de Google Sheets (${response.status}). Verifique su API Key y Sheet ID.`);
        }
        
        const data = await response.json();
        return parseSheetData(data.values);

    } catch (error) {
        console.error("Error fetching from Google Sheets:", error);
        if (error instanceof Error) {
           throw new Error(error.message);
        }
        throw new Error('Ocurrió un error de red o de configuración. Revise la consola para más detalles.');
    }
};