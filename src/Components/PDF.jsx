const fs = require('fs');
const axios = require('axios');

axios({
  method: 'post',
  url: 'http://localhost:8081/add_imp',
  data: {
    Montant: 500,
    DateP: '2024-11-01',
    TypeImpots: 'Revenu',
    ModePaiement: 'Carte Bancaire',
    ReferencePaiement: 'REF12345',
    NumCompte: 'ACC56789'
  },
  responseType: 'stream',
}).then((response) => {
  response.data.pipe(fs.createWriteStream('output.pdf'));
  console.log('PDF downloaded as output.pdf');
}).catch((error) => {
  console.error('Error:', error.message);
});
