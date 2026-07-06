import axios from "axios";

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {

    // Axios automatically stringifies the body and sets the 'Content-Type': 'application/json' header
    const response = await axios.post(`${import.meta.env.VITE_API_UPL}/code/execute`, {
      language: language,
      code: code,
    });

    // Axios automatically parses the JSON response into the 'data' property
    return response.data;
    
  } catch (error) {
    // Axios handles errors differently than fetch. 
    // If the server responded with a bad status (4xx or 5xx), it's stored in error.response
    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || `Server responded with status: ${error.response.status}`,
      };
    }

    // If the server never responded (network error, CORS, or server is down)
    return {
      success: false,
      error: `Failed to reach execution server: ${error.message}`,
    };
  }
}