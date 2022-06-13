const auth = {
  logout: (cb) => {
    localStorage.removeItem('kltn-token');
    cb();
  },
};

export default auth;
