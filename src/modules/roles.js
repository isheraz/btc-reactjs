module.exports = {
  admin: {
    key: 1,
    label: 'Admin',
    can: { 'setup-car': true, 'can-user': true },
  },
  user: {
    key: 2,
    label: 'User',
    can: { 'book-car': true },
  },
};
