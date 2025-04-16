export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

export const setToken = (token) => {
    if(typeof window !== 'undefined'){
        return localStorage.setItem('token', token)
    }
    return null;
}

export const removeToken = () => {
    if(typeof window !== 'uindefined'){
        return localStorage.removeItem('token');
    }
}