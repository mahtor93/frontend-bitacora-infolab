import axios from "axios";
const URL = process.env.NEXT_PUBLIC_SERVER_URL 


/**
 * Envía una solicitud POST autenticada al endpoint especificado de la API.
 *
 * @param {string} endpoint - El endpoint de la API al que se enviará la solicitud POST (se añade a la URL base).
 * @param {Object} payload - El cuerpo de la solicitud que se enviará en formato JSON.
 * @param {string} token - El token Bearer utilizado para la autorización en la cabecera de la solicitud.
 * @returns {Promise<Object>} El objeto de respuesta de la API.
 * @throws {Object} Si la solicitud falla, lanza los datos de la respuesta de error o un mensaje de error de conexión por defecto.
 */
const apiPost = async (endpoint, payload, token) => {
    try {
        const response = await axios.post(`${URL}${endpoint}`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        throw error?.response?.data || { message:'Error de Conexión' } 
    }
}

/**
 * Realiza una solicitud GET autenticada al endpoint especificado de la API.
 *
 * @param {string} endpoint - El endpoint de la API al que se enviará la solicitud GET (se añade a la URL base).
 * @param {string} token - El token Bearer utilizado para la autorización en la cabecera de la solicitud.
 * @param {Object} [query={}] - [OPCIONAL] Parámetros de consulta que se enviarán en la URL.
 * @returns {Promise<Object>} El objeto de respuesta de la API.
 * @throws {Object} Si la solicitud falla, lanza los datos de la respuesta de error o un mensaje de error de conexión por defecto.
 */
const apiPostFiles = async (endpoint, payload, token) => {
    try {
        const response = await axios.post(`${URL}${endpoint}`,
            payload,
            {
                headers: {
                    "Content-Type": "multipart/forms-data",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        throw error?.response?.data || { message:'Error de Conexión' } 
    }
}

/**
 * Realiza una solicitud GET autenticada al endpoint especificado de la API.
 *
 * @param {string} endpoint - El endpoint de la API al que se enviará la solicitud GET (se añade a la URL base).
 * @param {string} token - El token Bearer utilizado para la autorización en la cabecera de la solicitud.
 * @param {Object} [query={}] - [OPCIONAL] Parámetros de consulta que se enviarán en la URL.
 * @returns {Promise<Object>} El objeto de respuesta de la API.
 * @throws {Object} Si la solicitud falla, lanza los datos de la respuesta de error o un mensaje de error de conexión por defecto.
 */
const apiGet = async (endpoint, token, query = {}) => {
  // Función interna para convertir objeto a query string
  function objectToQueryString(params) {
      if (!params || typeof params !== 'object') return '';
      const esc = encodeURIComponent;
      const queryString = Object.keys(params)
          .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
          .map(key => `${esc(key)}=${esc(params[key])}`)
          .join('&');
      return queryString ? `?${queryString}` : '';
  }

  try {
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      };
      let fullUrl = `${URL}${endpoint}`;
      if (Object.keys(query).length > 0) {
          config.params = query;
          const queryString = objectToQueryString(query);
          fullUrl += queryString;
      }
      const response = await axios.get(`${URL}${endpoint}`, config);
      return response;
  } catch (error) {
      throw error.response?.data || { message: 'Error de Conexión' };
  }
};

/**
 * Realiza una petición GET a la API para obtener una imagen como Blob.
 * @param {string} url - Ruta relativa del recurso (ej: /post/uuid/filename.png)
 * @param {string} [token] - Token de autenticación opcional
 * @returns {Promise<Blob>} - Imagen como Blob
 * @throws {Error} - Si la petición falla
 */
export async function apiGetFiles(url, token) {
    // Si la url ya es absoluta, úsala tal cual; si no, prepende el host base
    const baseUrl = "http://152.74.180.135:3000/api";
    const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

    const headers = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(fullUrl, {
        method: "GET",
        headers,
    });

    if (!res.ok) {
        throw new Error(`No se pudo obtener la imagen (${res.status})`);
    }

    // Devuelve el blob directamente
    return await res.blob();
}


export { apiPost, apiPostFiles, apiGet, apiGetFiles }