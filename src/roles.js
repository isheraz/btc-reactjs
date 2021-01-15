const roles = {
  admin: {
    key: 'admin',
    label: 'Admin',
    can: { 'setup-car': true, 'can-user': true },
  },
  user: {
    key: 'user',
    label: 'User',
    can: { 'book-car': true },
  },
};

export default roles;
