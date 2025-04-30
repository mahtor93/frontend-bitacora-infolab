export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

export const setToken = (token) => {
    if(typeof window !== 'undefined'){
        const expires = new Date();
        expires.setHours(expires.getHours() + 5); // Expira en 5 horas
        
        // Guarda el token en la cookie
        document.cookie = `token=${encodeURIComponent(token)};` +
                          `expires=${expires.toUTCString()};` +
                          `path=/;` +
                          `SameSite=None; Secure`;
        return localStorage.setItem('token',token)
    }
    return null;
}

export const removeToken = () => {
    if(typeof window !== 'undefined'){
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure';
        return localStorage.removeItem('token');
    }
}