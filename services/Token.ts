class Token {
  static getToken() {
    return localStorage.getItem('accessToken');
  }

  static setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  static removeToken() {
    localStorage.removeItem('accessToken');
  }
}

export default Token