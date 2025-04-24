import Cookies from 'js-cookie';

export const getToken = () => {
    if (typeof window !== 'undefined') {
      return Cookies.get('token');
    }
    return null;
  };

export const setToken = (token) => {
    if(typeof window !== 'undefined'){
        const expiresIn = new Date();
        expiresIn.setHours(expiresIn.getHours() + 5); // Sumar 5 horas a la hora actual
        return Cookies.set('token', token, { expires: expiresIn, secure: true });

    }
    return null;
}

export const removeToken = () => {
    if(typeof window !== 'undefined'){
        return Cookies.remove('token');
    }
}