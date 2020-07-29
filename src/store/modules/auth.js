export default (cli) => {
    return {
      login (username, password) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        return cli.post('/api-token-auth/', params)
      },
      verify (token) {
        return cli.post('/api-token-verify/', {token})
      },
    }
  }
  