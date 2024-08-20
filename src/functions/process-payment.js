const emplacements = {
    'emplacement1': 10,
    'emplacement2': 20,
    'emplacement3': 30
};

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { emplacements: selectedEmplacements } = JSON.parse(event.body);
        let total = 0;

        selectedEmplacements.forEach(emplacement => {
            if (emplacements[emplacement]) {
                total += emplacements[emplacement];
            }
        });

        if (total > 0) {
            const helloAssoUrl = `https://www.helloasso.com/associations/votre-association/evenements/votre-evenement/paiement?amount=${total}`;
            return {
                statusCode: 200,
                body: JSON.stringify({ url: helloAssoUrl }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Aucun emplacement sélectionné.' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
