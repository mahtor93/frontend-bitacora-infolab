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
          // Para debug/log: muestra la URL completa con query string
          const queryString = objectToQueryString(query);
          fullUrl += queryString;
          // Puedes descomentar la siguiente línea para ver la URL final en consola
          // console.log("GET URL:", fullUrl);
      }
      const response = await axios.get(`${URL}${endpoint}`, config);
      return response;
  } catch (error) {
      throw error.response?.data || { message: 'Error de Conexión' };
  }
};

export { apiPost, apiGet }