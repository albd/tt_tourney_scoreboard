import { Accounts } from 'meteor/accounts-base';
 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.config({
  forbidClientAccountCreation: 1,
});
