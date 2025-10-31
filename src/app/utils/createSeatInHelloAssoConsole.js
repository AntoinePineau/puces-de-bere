const url = 'https://admin.helloasso.com/ha-api/organizations/rotary-club-chateaubriant/forms/Event/puces-de-bere/tiers';
const token = '';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function createSeat(letter, numero) {
  const payload = {
    terms: null,
    picture: null,
    tierType: 'Registration',
    paymentFrequencyType: 'Single',
    label: letter+i,
    description: null,
    vatRate: 0,
    maxEntries: '1',
    showMaxEntries: true,
    maxPerUser: null,
    isEligibleTaxReceipt: false
  };
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add the Bearer token
    },
    body: JSON.stringify(payload) // Send the payload as JSON
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(letter+i+' a été créé');
    return response.json(); // Parse the JSON response
  });
  await delay(1000);
}
for(i=1;i<=22;i++){await createSeat('A',i)}
for(i=1;i<=20;i++){await createSeat('B',i)}
for(i=1;i<=20;i++){await createSeat('C',i)}
for(i=1;i<=20;i++){await createSeat('D',i)}
for(i=1;i<=20;i++){await createSeat('E',i)}
for(i=1;i<=20;i++){await createSeat('F',i)}
for(i=1;i<=20;i++){await createSeat('G',i)}
for(i=1;i<=20;i++){await createSeat('H',i)}
for(i=1;i<=20;i++){await createSeat('I',i)}
for(i=1;i<=22;i++){await createSeat('J',i)}
for(i=1;i<=42;i++){await createSeat('N',i)}
for(i=1;i<=39;i++){await createSeat('S',i)}
for(i=1;i<=51;i++){await createSeat('R',i)}
for(i=1;i<=33;i++){await createSeat('X',i)}
for(i=1;i<=28;i++){await createSeat('Y',i)}
for(i=1;i<=30;i++){await createSeat('Z',i)}