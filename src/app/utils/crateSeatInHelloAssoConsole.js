const url = 'https://admin.helloasso.com/ha-api/organizations/rotary-club-chateaubriant/forms/Event/puces-de-bere/tiers';
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YjczNTZhOTVjMTA0OTkzNGM3MDA4ZGNmMThkNjk1YiIsInVpZCI6IjE0MjU3OTM3IiwidXJzIjoiT3JnYW5pemF0aW9uQWRtaW4iLCJjcHMiOlsiQWNjZXNzRnVsbERhdGEiLCJBY2Nlc3NQdWJsaWNEYXRhIiwiQWNjZXNzVHJhbnNhY3Rpb25zIiwiQ2FydE1hbmFnZW1lbnQiLCJGb3JtQWRtaW5pc3RyYXRpb24iLCJGb3JtRGlyZWN0b3J5IiwiR3JhbnRQYXNzd29yZENyZWRlbnRpYWxzIiwiR3JhbnRTaWduVXAiLCJPcmdhbml6YXRpb25BZG1pbmlzdHJhdGlvbiIsIk9yZ2FuaXphdGlvbk9wZW5EaXJlY3RvcnkiLCJQZXJmb3JtUGF5bWVudCIsIlJlZnVuZE1hbmFnZW1lbnQiXSwibmJmIjoxNzI5NTQwNDc5LCJleHAiOjE3Mjk1NDIyNzksImlzcyI6Imh0dHBzOi8vYXBpLmhlbGxvYXNzby5jb20iLCJhdWQiOiI3MDJjMjM3MmRjZGY0NDYzYmQ5ZGRlMmNkNTQ2MmRmNiJ9.ofrcgr-fkANhOUMRhQouiC-qohK0phbNJMxEhXijISw5LMSPXylkTwRhv2p0LwNokwiRHLSjU8a-mQZ3nD9u-W_fsB4BA38SnLwD8QTyjT6i3iJ8A_lXdGgtMzeKgkUyAO0NVrbtthvIOUC3lcseP7ZSqKoq4Ad4IQCRtf0lBJyLu_-hLl1qMYg8ZeFeRBtEObMof8F81unGRLfEWTz7cIbTFT6uNlxYR0nmploa3wnMsoERlggO_3D5NFBERAqfv8pfgDI4AcxCNS9A88CLmQ61RPXRFBKErmBwtUa35xhQTbdQJcXpcn14yDp4CEVxa49KY5WfyrmbPcAwK92IEA';
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
//for(i=1;i<=22;i++){await createSeat('A',i)}
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