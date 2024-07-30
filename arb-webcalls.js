var serverURL='https://us-central1-prudens---dev.cloudfunctions.net';

responseJSON = '{ "context": [], "inferences" : [], "facts" : [], "graph" : {}, "dilemmas" : [], "defeatedRules" : [], logs : [] }';



const prudens_ping = async () => {

	responseJSON = '{ "context": [], "inferences" : [], "facts" : [], "graph" : {}, "dilemmas" : [], "defeatedRules" : [], logs : [] }';

    try {

		let serviceURL = serverURL + '/app/deduce';
		console.log(serviceURL);

		const response = await fetch(serviceURL, {
			method: 'POST',
			body: JSON.stringify({policyString: "@KnowledgeBase C001 :: ping implies echo;", contextString: "ping;"}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			console.log(response);
			throw new Error(`Error! Status: ${response.status}`);
		}

		responseJSON = await response.json();
		console.log(responseJSON);
	}

	catch (err) {
		responseJSON = '{ "type": "", "name" : "", "message" : "" }';
		responseJSON.type =  'error';
		responseJSON.name = "Web call error";
		responseJSON.message =  err;
		console.log(err);
	}

	return responseJSON;

}



const prudens_deduce = async (policy, context) => {

	responseJSON = '{ "context": [], "inferences" : [], "facts" : [], "graph" : {}, "dilemmas" : [], "defeatedRules" : [], logs : [] }';

	try {

		if (policy != '')
			policy = policy + '\n';

		if (context != '')
			context = context + '\n';

		let serviceURL = serverURL + '/app/deduce';
		console.log(serviceURL);

		const response = await fetch(serviceURL, {
			method: 'POST',
			body: JSON.stringify({policyString: policy, contextString: context}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			console.log(response);
			throw new Error(`Error! Status: ${response.status}`);
		}

		responseJSON = await response.json();
		console.log(responseJSON);
	}

	catch (err) {
		responseJSON = '{ "type": "", "name" : "", "message" : "" }';
		responseJSON.type =  'error';
		responseJSON.name = "Web call error";
		responseJSON.message =  err;
		console.log(err);
	}

	return responseJSON;

}




const makeApiCallToChatGPT = async (argumentText, passKey, retries = 3) => {

    try {

		// Define the API endpoint and your API key
		const apiUrl = 'https://api.openai.com/v1/chat/completions';
		const encryptedAPIKey = "U2FsdGVkX1/rv4enwIwlbIXi8GWVVADmyl9Lwut5k0E0Pvcm16HkqfMCO6ShJf1kGruc0jqMqyP0SzyJ0+f1z8P7ZEevPw0LHCfpls0UMyY=";

		// Define the message payload
		const payload = {
			model: "gpt-4o-mini",  // or the appropriate model you are using
			messages: [
				{ "role": "system", "content": JSON.stringify(contestDialogue) + "\nThe above JSON object contains a 2D table which represents a map between natural language arguments and their formal representation In Prudens. The first column of the table contains the natural language text and the second column contains the Prudens expressions. You should act as a translator of natural language text to Prudens expressions by using the table provided and return the index of the formal expressions mapped to the input natural language text. The index is the number in the last column of each row. If the input natural language text is paraphrased or expressed in a different way, you should match it with the natural language text closer to the meaning of the input text and then return the index of the mapped row. The input natural language text will be given in the prompt and you should return only the index. Do not return any explanations or any other output, just the index. If you cannot match the input text with the natural language text in the table, not matter how hard you try, return -1. Do not be strict: match natural language text with the closest suitable meaning.", },
				{ "role": "user", "content": argumentText}
			]
		};

		// Define the fetch options
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${decryptString(encryptedAPIKey, passKey)}`,
			},
			body: JSON.stringify(payload)
		};


        const response = await fetch(apiUrl, fetchOptions);

        if (response.status === 404) {
            throw new Error('Endpoint or resource not found (404).');
        }

        if (response.status === 429) {
            if (retries > 0) {
                const retryAfter = response.headers.get('Retry-After') || 1;
                console.warn(`Rate limited. Retrying after ${retryAfter} seconds...`);
                await new Promise(res => setTimeout(res, retryAfter * 1000));
                return makeApiCallToChatGPT(apiUrl, options, retries - 1);
            } else {
                throw new Error('Rate limit exceeded and retries exhausted (429).');
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);

		return data.choices[0].message.content;

    } catch (error) {
        console.error('Error:', error.message);
		return -101;
    }
};
