//import mailjet from 'node-mailjet';
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
  'c7c0a91d98d3515f71e62b4cbfbb14a0', 
  '5780a3baa425e2797aabf2e9f06b070c'
);

console.log(mailjet); // Vérifiez si mailjetClient est correctement initialisé
