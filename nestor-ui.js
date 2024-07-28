let contestDialogue = [
    ["Your loan application is rejected.", "S01 :: suppose implies reject_loan_application | 00;", "Bank Officer", "N01"],
    ["Why is my loan application rejected?", "S02 :: suppose implies -reject_loan_application | 00;", "Loan Applicant", "N02"],
    ["Your loan application has been rejected because your care-giving obligations are considered high and your credit score is low.", "S03 :: suppose implies caregiving_obligations(high) | 00;\nS05 :: suppose implies credit_score(low) | 00;\nA01 :: caregiving_obligations(high), credit_score(low) implies reject_loan_application | 11;", "Bank Officer", "N03"],
    ["My loan application should not have been rejected because I am a good existing customer: I own an account for a long time and I make frequent transactions.", "A03 :: good_existing_customer implies -reject_loan_application | 13;\nP01 :: perceive implies account_owner_for_long | 21;\nP02 :: perceive implies transaction_frequency(high) | 22;\nA02 :: account_owner_for_long, transaction_frequency(high) implies good_existing_customer | 12;", "Loan Applicant", "N04"],
    ["You are not qualified as a good existing customer because your account balance is low for more than one year.", "P03 :: perceive implies account_balance_low_more_than(1, year) | 23;\nA04 :: account_balance_low_more_than(1, year) implies -good_existing_customer | 24;", "Bank Officer", "N05"],
    ["Why is my credit score low?", "S06 :: suppose implies -credit_score(low) | 00;", "Loan Applicant", "N06"],
    ["Your credit score is considered low because it is 582.", "C01 :: credit_score_value(582) # credit_score_value(590);\nP07 :: perceive implies credit_score_value(582) | 27;\nA05 :: credit_score_value(582) implies credit_score(low) | 15;", "Bank Officer", "N07"],
    ["My credit score is 590.", "P08 :: perceive implies credit_score_value(590) | 28;", "Loan Applicant", "N08"],
    ["Your credit score is considered low because it is below 600.", "A06 :: credit_score_value(590) implies credit_score_less_than(600) | 16;\nA07 :: credit_score_less_than(600) implies credit_score(low) | 17;", "Bank Officer", "N09"],
    ["Why are my care-giving obligations considered high?", "S04 :: suppose implies -caregiving_obligations(high) | 00;", "Loan Applicant", "N10"],
    ["Your care-giving obligations are considered high because you are female and have two children.", "P04 :: perceive implies gender(female) | 24;\nP05 :: perceive implies have(child, 2) | 25;\nA08 :: gender(female) implies female_obligations | 18;\nA09 :: have(child, 2), female_obligations implies caregiving_obligations(high) | 19;", "Bank Officer", "N11"],
    ["Gender should not be used to determine care-giving obligations.", "P06 :: perceive implies -female_obligations | 26;", "Loan Applicant", "N12"]
];

let explanations = [
    ["Loan application should be rejected. ", "S01", "reject_loan_application", "Bank Officer"],
    ["Loan application should not be rejected. ", "S02", "-reject_loan_application", "Loan Applicant"],
    ["Applicant's care-giving obligations are considered high. ", "S03", "caregiving_obligations(high)", "Bank Officer"],
    ["Applicant's credit score is considered low. ", "S05", "credit_score(low)", "Bank Officer"],
    ["Loan application should be rejected because applicant's care-giving obligations are considered high and credit score low. ", "A01", "reject_loan_application", "Bank Officer"],
    ["Loan application should not be rejected because applicant is a good existing customer. ", "A03", "-reject_loan_application", "Loan Applicant"],
    ["Applicant owns an account for a long time. ", "P01", "account_owner_for_long", "Loan Applicant"],
    ["Applicant makes frequent transactions. ", "P02 ", "transaction_frequency(high)", "Loan Applicant"],
    ["Applicant is a good existing customer because applicant owns an account for a long time and makes frequent transactions. ", "A02", "good_existing_customer", "Loan Applicant"],
    ["Applicant's account balance is low for more than one year. ", "P03", "account_balance_low_more_than(1, year)", "Bank Officer"],
    ["Applicant is not a good existing customer because applicant's account balance is low for more than one year. ", "A04", "-good_existing_customer", "Bank Officer"],
    ["Applicant's credit score should not be considered low. ", "S06", "-credit_score(low)", "Loan Applicant"],
    ["Applicant's credit score is 582. ", "P07", "credit_score_value(582)", "Bank Officer"],
    ["Credit score of 582 is considered low. ", "A05", "credit_score(low)", "Bank Officer"],
    ["Applicant's credit score is 590. ", "P08", "credit_score_value(590)", "Loan Applicant"],
    ["Credit score of 590 is below 600. ", "A06", "credit_score_less_than(600)", "Bank Officer"],
    ["Credit score below 600 is considered low. ", "A07", "credit_score(low)", "Bank Officer"],
    ["Applicant's care-giving obligations should not be considered high. ", "S04", "-caregiving_obligations(high)", "Loan Applicant"],
    ["Applicant is a female. ", "P04", "gender(female)", "Bank Officer"],
    ["Applicant has two children. ", "P05", "have(child, 2)", "Bank Officer"],
    ["Females have female obligations (implicit claim). ", "A08", "female_obligations", "Bank Officer"],
    ["Applicant's care-giving obligations are considered high because applicant has female obligations and has two children. ", "A09", "caregiving_obligations(high)", "Bank Officer"],
    ["There is no such a thing as female obligations. ", "P06", "-female_obligations", "Loan Applicant"]
];

let currentArgument = 0;
let currentNLDialogue = '';
let currentPrudensDialogue = '@KnowledgeBase\n';

async function loadPage(showOverlay) {

	currentArgument = 0;
	currentNLDialogue = '';
	currentPrudensDialogue = '@KnowledgeBase\n';
	let lResponseJSON = '{ "context": [], "inferences" : [], "facts" : [], "graph" : {}, "dilemmas" : [], "defeatedRules" : [], logs : [] }';

	if (showOverlay) {

		overlayOn();

		try {

			lResponseJSON = await prudens_ping();
			responseJSON = lResponseJSON;

			if (responseJSON.type == 'error')
				throw new Error(`${responseJSON.name}: ${responseJSON.message}`);

			else if (responseJSON.inferences[0].name != 'echo')
				throw new Error(`Unexpected Response: ${responseJSON.inferences[0].name}`);

			showPage(showOverlay);
		}

		catch (err) {
			showErrorConnectingToWebService(err);
		}
		
		console.log(lResponseJSON);
	}

	else
		showPage(showOverlay);


}



function showPage(showOverlay) {
	document.getElementById("loader").style.display = "none";
	//document.getElementById("nlAdvice").value = "";
	nlArgumentsTextArea.setValue("");
	//document.getElementById("inferredNLConclusions").innerHTML = "";
	nlConclusionsTextArea.setValue("");
	document.getElementById("nextButton").textContent = "Start Dialogue";
	document.getElementById("nestorPageContent").style.display = "block";

	if (showOverlay) {
		// Dirty workaround to load data correctly in control
		let prudensDialogue = currentPrudensDialogue + '\n\n' + contestDialogue[0][1];
		generatedLogicTextarea.setValue(prudensDialogue);
		prudensDialogue += '\n\n' + contestDialogue[1][1];;
		generatedLogicTextarea.setValue(prudensDialogue);
		prudensDialogue += '\n\n' + contestDialogue[2][1];;
		generatedLogicTextarea.setValue(prudensDialogue);

		document.getElementById("textOverlay").innerHTML = "Contesting dialogue demo is ready! Click on the screen to start...";
		document.getElementById("nestorOverlay").addEventListener("click", overlayOff);
	}

	generatedLogicTextarea.setValue("");
	formalConclusionsTextArea.setValue("");
}



function showErrorConnectingToWebService(errorMessage) {
	document.getElementById("loader").style.display = "none";
	document.getElementById("textOverlay").innerHTML = "Connection to Prudens Web Service could not be established (" + errorMessage + ")!"
}



function overlayOn() {
	document.getElementById("nestorOverlay").style.display = "block";
}



function overlayOff() {
	document.getElementById("nestorOverlay").style.display = "none";
}



async function getNextArgument() {

	let animElementName = "animGenerate";

	document.getElementById("nextButton").textContent = "Next Argument";
	document.getElementById(animElementName).style.opacity = "1";
    document.getElementById("btnViewSystemOutput").style.opacity = "0";

	try {
		if (currentArgument < contestDialogue.length) {

			let nlArgument = `${contestDialogue[currentArgument][2]}: ${contestDialogue[currentArgument][0]} (${contestDialogue[currentArgument][3]})`;
			let nlDialogue = (currentNLDialogue == '') ? nlArgument : currentNLDialogue + '\n\n' + nlArgument;
			let prudensDialogue = currentPrudensDialogue + '\n\n' + contestDialogue[currentArgument][1];;

			//document.getElementById("nlAdvice").value = nlDialogue;
			nlArgumentsTextArea.setValue(nlDialogue);
			// Scroll to the end of the editor
			//document.getElementById("nlAdvice").scrollTop = document.getElementById("nlAdvice").scrollHeight;
			var lastLineNL = nlArgumentsTextArea.lastLine();
			nlArgumentsTextArea.scrollTo(null, nlArgumentsTextArea.charCoords({line: lastLineNL, ch: 0}, "local").bottom);

			generatedLogicTextarea.setValue(prudensDialogue);
			// Scroll to the end of the editor
			var lastLine = generatedLogicTextarea.lastLine();
			generatedLogicTextarea.scrollTo(null, generatedLogicTextarea.charCoords({line: lastLine, ch: 0}, "local").bottom);

			currentNLDialogue = nlDialogue;
			currentPrudensDialogue = prudensDialogue;
			currentArgument++;

			inferConclusionMain();
		}
	}

	catch (err) {
		console.log(err);
	}
		
	console.log(`currentArgument=${currentArgument}`);
	document.getElementById(animElementName).style.opacity = "0";

}






async function inferConclusion() {

	let animElementName = "animGenerate";

	document.getElementById(animElementName).style.opacity = "1";
    document.getElementById("btnViewSystemOutput").style.opacity = "0";

	let lResponseJSON = '{ "context": [], "inferences" : [], "facts" : [], "graph" : {}, "dilemmas" : [], "defeatedRules" : [], logs : [] }';

	try {

		lResponseJSON = await prudens_deduce(currentPrudensDialogue.replace(/[\t\n\r]/g, ''), "suppose; perceive;");
		responseJSON = lResponseJSON;

		if (lResponseJSON.type == 'error')
			throw new Error(`${responseJSON.name}: ${responseJSON.message}`);

		document.getElementById("btnViewSystemOutput").style.opacity = "1";

		let resultData = "<Inferences>\n"
		resultData += responseJSON.inferences.map(obj => obj ? obj.name : '').join(",\n");
		resultData += "\n<Dilemmas>\n";
		resultData += responseJSON.dilemmas.map(arr => arr.filter(obj => obj).map(obj => obj ? obj.name : '').join(" # ")).join("\n");
		translationPolicyTextArea.setValue(resultData);
		setTimeout(function () {
				translationPolicyTextArea.refresh()
			},
			100
		)
	
		//document.getElementById("generatedLogicLabel").innerHTML = lResponseJSON.message;
	}

	catch (err) {
		responseJSON = '{ "type": "", "name" : "", "message" : "" }';
		responseJSON.type =  'error';
		responseJSON.name = "Web call error";
		responseJSON.message =  err;
		document.getElementById("consoleNESTOR").innerHTML = lResponseJSON.message;
	}
	
	console.log(lResponseJSON);
	document.getElementById(animElementName).style.opacity = "0";

}






async function inferConclusionMain() {

	let lResponseJSON = '{ "context": [], "inferences" : [], "facts" : [], "graph" : {}, "dilemmas" : [], "defeatedRules" : [], logs : [] }';

	try {

		lResponseJSON = await prudens_deduce(currentPrudensDialogue.replace(/[\t\n\r]/g, ''), "suppose; perceive;");
		responseJSON = lResponseJSON;
		let conclusionExpressions = [];

		if (lResponseJSON.type == 'error')
			throw new Error(`${responseJSON.name}: ${responseJSON.message}`);

		document.getElementById("btnViewSystemOutput").style.opacity = "1";

		let resultData = "Inferences:\n"
		resultData += responseJSON.inferences.map(obj => 
			obj ? 
			(obj.sign === false ? '-' : '') + obj.name + 
			(obj.arity > 0 && obj.args ? 
				`(${obj.args.map(argsObj => argsObj ? argsObj.value : '').join(", ")})` : 
				'') : 
			''
		).join(", ");


		resultData += "\nDilemmas:\n";
		resultData += responseJSON.dilemmas.map(arr => arr.filter(obj => obj).map(obj => obj ? obj.name : '').join(" # ")).join("\n");

		resultData += "\nKey Supporting Arguments:\n";
		conclusionExpressions = extractJustificationNamesFromGraph(responseJSON.graph, true);
		resultData += conclusionExpressions.join(', ');
		formalConclusionsTextArea.setValue(resultData);
		setTimeout(function () {
				formalConclusionsTextArea.refresh()
			},
			100
		)

		let nlJustification = "";
		let suggestion = "";

		evalResult = evaluateLoanApplication(responseJSON.inferences);
		if (evalResult == 0)
			suggestion = "Loan application rejection must be supported otherwise the decision will be dismissed!"
		else {
			if (evalResult == 1)
				suggestion = "Loan application rejection is not justified!"
			else
				suggestion = "Loan application rejection is justified!"

			explanations.forEach(row => {
				if (row.length >= 2 && conclusionExpressions.includes(row[1])) {
					nlJustification += row[0];
				}
			});
		}

		let nlConclusions = "Suggestion: " + suggestion;
		nlConclusions += (nlJustification !== "") ? ("\n\nJustification:\n" + nlJustification) : "";

		//document.getElementById("inferredNLConclusions").innerHTML = nlConclusions;
		nlConclusionsTextArea.setValue(nlConclusions);
	
		//document.getElementById("generatedLogicLabel").innerHTML = lResponseJSON.message;
	}

	catch (err) {
		responseJSON = '{ "type": "", "name" : "", "message" : "" }';
		responseJSON.type =  'error';
		responseJSON.name = "Web call error";
		responseJSON.message =  err;
		document.getElementById("consoleNESTOR").innerHTML = lResponseJSON.message;
	}
	
	console.log(lResponseJSON);

}





function evaluateLoanApplication(inferences) {
    for (let inference of inferences) {
        if (inference.name === "reject_loan_application") {
            if (inference.sign === true) {
                return -1;
            } else if (inference.sign === false) {
                return 1;
            }
        }
    }
    return 0; // Return 0 if no matching object is found
}





function extractNamesFromGraph(graph, excludeContext) {
    let names = [];
    Object.keys(graph).forEach(property => {
        graph[property].forEach(item => {
			// Filter and add main item names if the switch is on and do not start with '$'
            if (item.name && (!excludeContext || !item.name.startsWith('$')))
				names.push(item.name);
            // Recursive extraction from nested objects like 'head' and 'body' if they exist
            // if (item.head && item.head.name) names.push(item.head.name);
            // if (item.body && item.body.name) names.push(item.body.name);
        });
    });
    return names;
}





function extractJustificationNamesFromGraph(graph, excludeContext) {
    let results = [];
    Object.keys(graph).forEach(property => {
        graph[property].forEach(item => {
            // Check if body exists and does not contain "suppose" or "perceive"
            let bodyNames = [];
            if (item.body && Array.isArray(item.body)) {
                item.body.forEach(bodyItem => {
                    if (bodyItem.name && bodyItem.name !== "suppose" && bodyItem.name !== "perceive") {
                        bodyNames.push(bodyItem.name);
                    }
                });
            }
            // If the body names array is not empty after filtering, include this object
            if ((item.name && (!excludeContext || !item.name.startsWith('$'))) && bodyNames.length > 0) {
                results.push(item.name);
            }
			else if (item.head && item.head.name === "reject_loan_application")
				results.push(item.name);
        });
    });
    return results;
}





function deepExtractNamesFromGraph(graph, excludeContext) {
    let results = [];
    Object.keys(graph).forEach(property => {
        graph[property].forEach(item => {
            // Check if body exists and does not contain "suppose" or "perceive"
            let bodyNames = [];
            if (item.body && Array.isArray(item.body)) {
                item.body.forEach(bodyItem => {
                    if (bodyItem.name && bodyItem.name !== "suppose" && bodyItem.name !== "perceive") {
                        bodyNames.push(bodyItem.name);
                    }
                });
            }
            // If the body names array is not empty after filtering, include this object
            if ((item.name && (!excludeContext || !item.name.startsWith('$'))) && bodyNames.length > 0) {
                results.push([item.name, ...bodyNames]);
            }
        });
    });
    return results;
}




async function generateLogic(nestor_webCall = null) {

	let animElementName = "animGenerate";

	document.getElementById(animElementName).style.opacity = "1";
	generatedLogicTextarea.setValue("Generating Logic...");
    document.getElementById("btnViewSystemOutput").style.opacity = "0";

	let nlAdvice = document.getElementById("nlAdvice").value;
	let translationPolicy = activeTranslationPolicy;
	let translationParametersJSON = translationSettings;

	let lResponseJSON = '{ "message": "Empty Message", "resultCode" : -1, "textData" : "", "jsondata" : "" }'

	try {

		if (nestor_webCall) {

			lResponseJSON = await nestor_webCall(nlAdvice, translationPolicy, JSON.stringify(translationParametersJSON));
			responseJSON = lResponseJSON;

			if (lResponseJSON.resultCode == 0) {
				generatedLogicTextarea.setValue(lResponseJSON.textData);
				document.getElementById("btnViewSystemOutput").style.opacity = "1";
				document.getElementById("generatedLogicLabel").innerHTML = lResponseJSON.message;
			}

			else {
				throw new Error(`${responseJSON.message}: ${responseJSON.resultCode}`);
			}
		}

		else {
			responseJSON.message =  "Undefined Web Call Function!";
			responseJSON.resultCode =  -100;
			throw new Error(`Undefined Web Call Function: ${responseJSON.resultCode}`);
		}
	}

	catch (err) {
		responseJSON.message =  err;
		responseJSON.resultCode =  -200;
		document.getElementById("consoleNESTOR").innerHTML = lResponseJSON.message;
	}
	
	console.log(lResponseJSON);
	document.getElementById(animElementName).style.opacity = "0";

}



function editTranslationPolicy() {
	translationPolicyTextArea.setValue(activeTranslationPolicy);
	setTimeout(function () {
    		translationPolicyTextArea.refresh()
        },
		100
	)
}



function loadTranslationPolicy() {
	translationPolicyTextArea.setValue(defaultTranslationPolicy);
	setTimeout(function () {
    		translationPolicyTextArea.refresh()
        },
		100
	)
}



function clearTranslationPolicy() {
	translationPolicyTextArea.setValue("");
	setTimeout(function () {
    		translationPolicyTextArea.refresh()
        },
		100
	)
}



function downloadTranslationPolicy(popupElement) {

	try {
		var textBlob = new Blob([translationPolicyTextArea.getValue()], {type:'text/plain'});
		var downloadLink = document.createElement("a");
		downloadLink.download = "TranslationPolicy.prudens";
		downloadLink.innerHTML = "Download File";
		downloadLink.href = window.URL.createObjectURL(textBlob);
		downloadLink.click();
		delete downloadLink;
		delete textBlob;
	}

	catch (err) {
		closePopup(popupElement);
		document.getElementById("consoleNESTOR").innerHTML = err;
		console.log(err);
	}

}



function useTranslationPolicy(popupElement) {
	activeTranslationPolicy = translationPolicyTextArea.getValue();
	console.log(activeTranslationPolicy);
	closePopup(popupElement);
}



function editTranslationSettings() {
	translationSettingstEditor.set(translationSettings);
}



function viewSystemOutput() {
	systemOutputEditor.set(responseJSON);
}



function useTranslationSettings(popupElement) {
	translationSettings = translationSettingstEditor.get();
	console.log(translationSettings);
	closePopup(popupElement);
}



function openPopup(popupElement, actionNESTOR = null) {
	if (actionNESTOR)
		actionNESTOR();
    document.getElementById(popupElement).style.display = "block";
}



function closePopup(popupElement) {
    document.getElementById(popupElement).style.display = "none";
}



document.querySelectorAll('.actionCommandIcon, .checkmark, .actionIcon').forEach(icon => {
    let tooltipTimeout;

    icon.addEventListener('mouseover', function() {
        const tooltip = this.querySelector('.tooltiptext');
        clearTimeout(tooltipTimeout); // Clear any existing timeout
        tooltip.style.visibility = 'visible';

        // Set a timeout to hide the tooltip after 2 seconds
        tooltipTimeout = setTimeout(() => {
            tooltip.style.visibility = 'hidden';
        }, 1000);
    });

    icon.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltiptext');
        clearTimeout(tooltipTimeout); // Clear the timeout
        tooltip.style.visibility = 'hidden'; // Hide the tooltip immediately
    });
});
