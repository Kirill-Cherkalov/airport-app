const UserRouteGuard = {
  shouldRoute: () => {
    const token = localStorage.getItem('token');
    if (!token) return Promise.resolve(false);
    return fetch('http://localhost:3001/user/check-auth', {
      method: 'POST',
      headers: {
        Authorization: token,
      },
    })
      .then(response => response.json())
      .then((result) => {
        if (result) return Promise.resolve(true);
        return Promise.resolve(false);
      })
      .catch(error => localStorage.setItem('error', JSON.stringify(error)));
  }
};

export default UserRouteGuard;
