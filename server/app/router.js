'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 用户
  router.post('/api/login', controller.user.login);
  router.post('/api/register', controller.user.register);
  router.post('/api/users', controller.user.users);
  
  router.get('/api/accounts', controller.user.accounts);
  router.get('/api/account_types', controller.user.account_types);
  
  router.get('/api/types', controller.user.types);
  router.get('/api/dashboard', controller.user.dashboard);

  router.get('/api/occurrences', controller.user.occurrences);
  router.post('/api/occurrences/transfer', controller.user.transfer);
  router.delete('/api/occurrence/:id', controller.user.occurrence);
  
  router.get('/api/categories', controller.user.categories);

};
