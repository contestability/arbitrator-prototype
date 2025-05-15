let contestDialogue =
[
  [
    "Your loan application is rejected.",
    "S001 :: suppose implies rejectLoanApplication(jane_doe) | 0;",
    "Bank Officer",
    "N01",
    0
  ],
  [
    "Why is my loan application rejected?",
    "S002 :: suppose implies -rejectLoanApplication(jane_doe) | 0;",
    "Loan Applicant",
    "N02",
    1
  ],
  [
    "Your loan application has been rejected because your care-giving obligations are considered high and your credit efficiency is low.",
    "S003 :: suppose implies hasHighCareGivingOblications(jane_doe) | 0;\nS004 :: suppose implies hasLowCreditEfficiency(jane_doe) | 0;\nIP37 :: hasHighCareGivingOblications(jane_doe), hasLowCreditEfficiency(jane_doe) implies isSubjectToRejection(jane_doe) | 36;\nIP45 :: isSubjectToRejection(jane_doe) implies rejectLoanApplication(jane_doe) | 44;",
    "Bank Officer",
    "N03",
    2
  ],
  [
    "My loan application should not have been rejected because I am supported by qualified guarantor and I am a good existing customer. (: I own an account for a long time and I make frequent transactions.)",
    "SIP17 :: suppose implies goodExistingCustomer(jane_doe) | 0;\nP001 :: perceive implies supportedByGuarantor(jane_doe, john_doe) | 101;\nS005 :: suppose implies qualifiedGuarantor(john_doe) | 0;\nIP40 :: goodExistingCustomer(jane_doe), supportedByGuarantor(jane_doe, john_doe), qualifiedGuarantor(john_doe) implies -isSubjectToRejection(jane_doe) | 39;\nS006 :: suppose implies ownsAccountForLong(jane_doe) | 0;\nS007 :: suppose implies makesFrequentTransactions(jane_doe) | 0;\nIP17 :: ownsAccountForLong(jane_doe), makesFrequentTransactions(jane_doe) implies goodExistingCustomer(jane_doe) | 17;",
    "Loan Applicant",
    "N04",
    3
  ],
  [
    "You are not qualified as a good existing customer because your accounthas a low balance.",
    "SIP29 :: suppose implies -goodExistingCustomer(jane_doe) | 0;\nS008 :: suppose implies ownsAccountWithLowBalance(jane_doe) | 0;\nIP29 :: ownsAccountWithLowBalance(jane_doe) implies -goodExistingCustomer(jane_doe) | 30;",
    "Bank Officer",
    "N05",
    4
  ],
  [
    "Why is my credit score efficiency considered low?",
    "S009 :: suppose implies -hasLowCreditEfficiency(jane_doe) | 0;",
    "Loan Applicant",
    "N06",
    5
  ],
  [
    "Your credit efficiency is considered low because your credit score is considered low.",
    "S010 :: suppose implies hasLowCreditScore(jane_doe) | 0;\nIP09 :: hasLowCreditScore(jane_doe) implies hasLowCreditEfficiency(jane_doe) | 9;",
    "Bank Officer",
    "N07",
    6
  ],
  [
    "Why is my credit score judged as low?",
    "S011 :: suppose implies -hasLowCreditScore(jane_doe) | 0;",
    "Loan Applicant",
    "N08",
    7
  ],
  [
    "Your credit score is marked low because it is 615.",
    "P002 :: perceive implies hasCreditScore(jane_doe, 615) | 102;\nIP06a :: hasCreditScore(jane_doe, 615), ?lessThan(615, 630) implies hasLowCreditScore(jane_doe) | 6;",
    "Bank Officer",
    "N09",
    8
  ],
  [
    "You are wrong. My credit score is 625.",
    "C002 :: hasCreditScore(jane_doe, 615) # hasCreditScore(jane_doe, 625);\nP003 :: perceive implies hasCreditScore(jane_doe, 625) | 103;",
    "Loan Applicant",
    "N10",
    9
  ],
  [
    "Still, your credit score is considered low because it is below 630.",
    "IP06b :: hasCreditScore(jane_doe, 625), ?lessThan(625, 630) implies hasLowCreditScore(jane_doe) | 6;",
    "Bank Officer",
    "N11",
    10
  ],
  [
    "Why are my care-giving obligations considered high?",
    "S012 :: suppose implies -hasHighCareGivingOblications(jane_doe) | 0;",
    "Loan Applicant",
    "N12",
    11
  ],
  [
    "Your care-giving obligations are considered high because you are a primary care-giver and have two dependands.",
    "P004 :: perceive implies hasDependants(jane_doe, 2) | 104;\nS013 :: suppose implies isPrimaryCareGiver(jane_doe) | 0;\nIP23 :: hasDependants(jane_doe, 2), ?greaterOrEqualThan(2, 2), isPrimaryCareGiver(jane_doe) implies hasHighCareGivingOblications(jane_doe) | 24;",
    "Bank Officer",
    "N13",
    12
  ],
  [
    "Why am I considered primary care-giver?",
    "S014 :: suppose implies -isPrimaryCareGiver(jane_doe) | 0;",
    "Loan Applicant",
    "N14",
    13
  ],
  [
    "You are considered a primary care-giver because you have obligations based on the fact that you are a woman.",
    "P005 :: perceive implies hasGender(jane_doe, female) | 104;\nIP21a :: hasGender(jane_doe, female) implies hasGenderObligations(jane_doe, female) | 21;\nIP21b :: hasGenderObligations(jane_doe, female) implies isPrimaryCareGiver(jane_doe) | 22;",
    "Bank Officer",
    "N15",
    14
  ],
  [
    "Gender should not be used to determine care-giving obligations.",
    "EF04 :: hasGender(jane_doe, female) implies -hasGenderObligations(jane_doe, female) | 204;",
    "Loan Applicant",
    "N16",
    15
  ]
];

let explanations =
[
  [
    "Jane Doe's loan application should be rejected.",
    "S001",
    "rejectLoanApplication(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's loan application should not be rejected.",
    "S002",
    "-rejectLoanApplication(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe has high care giving oblications.",
    "S003",
    "hasHighCareGivingOblications(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's credit efficiency is considered low.",
    "S004",
    "hasLowCreditEfficiency(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's loan application is subject to rejection because she has high care giving oblications and her credit efficiency is low.",
    "IP37",
    "isSubjectToRejection(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's loan application should be rejected because it is subject to rejection.",
    "IP45",
    "rejectLoanApplication(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe is a good existing customer.",
    "SIP17",
    "goodExistingCustomer(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe is supported by a guarantor.",
    "P001",
    "supportedByGuarantor(jane_doe, john_doe)",
    "Loan Applicant"
  ],
  [
    "The guarantor is considered qualified.",
    "S005",
    "qualifiedGuarantor(john_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe's loan application is not subject to rejection because she is a good existing customer and she is supported by a qualified guarantor.",
    "IP40",
    "-isSubjectToRejection(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe has owned an account for a long time.",
    "S006",
    "ownsAccountForLong(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe makes frequent transactions.",
    "S007",
    "makesFrequentTransactions(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe is a good existing customer because she has owned an account for a long time and she makes frequent transactions.",
    "IP17",
    "goodExistingCustomer(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe is not a good existing customer.",
    "SIP29",
    "-goodExistingCustomer(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's account balance is low.",
    "S008",
    "ownsAccountWithLowBalance(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe is not a good existing customer because her account balance is low.",
    "IP29",
    "-goodExistingCustomer(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's credit efficiency is not considered low.",
    "S009",
    "-hasLowCreditEfficiency(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe's credit score is considered low.",
    "S010",
    "hasLowCreditScore(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's credit efficiency is considered low because her credit score is low.",
    "IP09",
    "hasLowCreditEfficiency(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's credit score is not considered low.",
    "S011",
    "-hasLowCreditScore(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe's credit score is 615.",
    "P002",
    "hasCreditScore(jane_doe, 615)",
    "Bank Officer"
  ],
  [
    "Jane Doe's credit score is considered low because her credit score of 615 is less than 630.",
    "IP06a",
    "hasLowCreditScore(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's credit score is 625.",
    "P003",
    "hasCreditScore(jane_doe, 625)",
    "Loan Applicant"
  ],
  [
    "Jane Doe's credit score is considered low because her credit score of 625 is less than 630.",
    "IP06b",
    "hasLowCreditScore(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe does not have high care giving oblications.",
    "S012",
    "-hasHighCareGivingOblications(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe has 2 dependants.",
    "P004",
    "hasDependants(jane_doe, 2)",
    "Bank Officer"
  ],
  [
    "Jane Doe is a primary caregiver.",
    "S013",
    "isPrimaryCareGiver(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe has high care giving oblications because she has 2 dependants or more and she is a primary care giver.",
    "IP23",
    "hasHighCareGivingOblications(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe is not a primary caregiver.",
    "S014",
    "-isPrimaryCareGiver(jane_doe)",
    "Loan Applicant"
  ],
  [
    "Jane Doe is a woman.",
    "P005",
    "hasGender(jane_doe, female)",
    "Bank Officer"
  ],
  [
    "Jane Doe has obligations related to her gender.",
    "IP21a",
    "hasGenderObligations(jane_doe, female)",
    "Bank Officer"
  ],
  [
    "Jane Doe is a primary caregiver because she has obligations related to her gender.",
    "IP21b",
    "isPrimaryCareGiver(jane_doe)",
    "Bank Officer"
  ],
  [
    "Jane Doe's gender should not be used to determine obligations.",
    "EF04",
    "-hasGenderObligations(jane_doe, female)",
    "Loan Applicant"
  ]
];

let currentArgument = 0;
let currentNLDialogue = '';
let currentPrudensDialogue = '@Knowledge\n\nEP01 :: rejectLoanApplication(jane_doe) # approveLoanApplication(jane_doe);';
const policyProceduresSection = ' @Procedures function greaterOrEqualThan(x, y) {return  Number(x) >= Number(y);} function greaterThan(x, y) {return  Number(x) > Number(y);} function lessOrEqualThan(x, y) {return  Number(x) <= Number(y);} function lessThan(x, y) {return  Number(x) < Number(y);}';

let currentArgumentText = "";


async function loadPage(showOverlay) {

	currentArgument = 0;
	currentNLDialogue = '';
	currentPrudensDialogue = '@Knowledge\n\nEP01 :: rejectLoanApplication(jane_doe) # approveLoanApplication(jane_doe);';
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

	nlArgumentsTextArea.setValue("");

	nlConclusionsTextArea.setValue("");
	document.getElementById("nextButton").textContent = "Start Dialogue";
	document.getElementById("writeNextButton").disabled = true;
	document.getElementById("nestorPageContent").style.display = "block";

	if (showOverlay) {
		// Dirty workaround to load data correctly in control
		let prudensDialogue = currentPrudensDialogue + '\n\n' + contestDialogue[0][1];
		prudensFormalDialogueTextarea.setValue(prudensDialogue);
		prudensDialogue += '\n\n' + contestDialogue[1][1];;
		prudensFormalDialogueTextarea.setValue(prudensDialogue);
		prudensDialogue += '\n\n' + contestDialogue[2][1];;
		prudensFormalDialogueTextarea.setValue(prudensDialogue);

		document.getElementById("textOverlay").innerHTML = "Contesting dialogue demo is ready! Click on the screen to start...";
		document.getElementById("nestorOverlay").addEventListener("click", overlayOff);
	}

	prudensFormalDialogueTextarea.setValue("");
	formalConclusionsTextArea.setValue("");
	document.getElementById("consoleNESTOR").textContent = "";

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

	document.getElementById("nextButton").textContent = "Next Argument";
	document.getElementById("writeNextButton").disabled = false;
    document.getElementById("btnViewSystemOutput").style.opacity = "0";

	try {
		if (currentArgument < contestDialogue.length) {

			let nlArgument = `${contestDialogue[currentArgument][2]}: ${contestDialogue[currentArgument][0]} (${contestDialogue[currentArgument][3]})`;
			let nlDialogue = (currentNLDialogue == '') ? nlArgument : currentNLDialogue + '\n\n' + nlArgument;
			let prudensDialogue = currentPrudensDialogue + '\n\n' + contestDialogue[currentArgument][1];;

			nlArgumentsTextArea.setValue(nlDialogue);

			// Scroll to the end of the editor
			var lastLineNL = nlArgumentsTextArea.lastLine();
			nlArgumentsTextArea.scrollTo(null, nlArgumentsTextArea.charCoords({line: lastLineNL, ch: 0}, "local").bottom);

			prudensFormalDialogueTextarea.setValue(prudensDialogue);
			// Scroll to the end of the editor
			var lastLine = prudensFormalDialogueTextarea.lastLine();
			prudensFormalDialogueTextarea.scrollTo(null, prudensFormalDialogueTextarea.charCoords({line: lastLine, ch: 0}, "local").bottom);

			currentNLDialogue = nlDialogue;
			currentPrudensDialogue = prudensDialogue;
			currentArgument++;

			inferConclusion();
		}
	}

	catch (err) {
		console.log(err);
	}
		
	console.log(`currentArgument=${currentArgument}`);

}





async function writeNextArgument() {

	document.getElementById("writeNextButton").textContent = "Write Next Argument";
	document.getElementById("writeNextButton").disabled = false;
    document.getElementById("btnViewSystemOutput").style.opacity = "0";

	try {

			openPopupFlex('argumentInputPopup', null);

			const {text, passkey} = await waitForUserInput();
			currentArgumentText = text;
			console.log('User input:', currentArgumentText);

		
			prudensIndex = await makeApiCallToChatGPT(currentArgumentText, passkey);
			console.log("prudensIndex:", prudensIndex);

			if (prudensIndex >=0 && prudensIndex < contestDialogue.length) {

				let nlArgument = ((currentArgument % 2 == 0) ? "Bank Officer: " : "Loan Applicant: ") +
									currentArgumentText +
									` (Nw${(currentArgument+1).toString().padStart(2, '0')})`;
				let nlDialogue = (currentNLDialogue == '') ? nlArgument : currentNLDialogue + '\n\n' + nlArgument;

				let prudensDialogue = currentPrudensDialogue + '\n\n' + contestDialogue[prudensIndex][1];
				nlArgumentsTextArea.setValue(nlDialogue);

				// Scroll to the end of the editor
				var lastLineNL = nlArgumentsTextArea.lastLine();
				nlArgumentsTextArea.scrollTo(null, nlArgumentsTextArea.charCoords({line: lastLineNL, ch: 0}, "local").bottom);

				prudensFormalDialogueTextarea.setValue(prudensDialogue);

				// Scroll to the end of the editor
				var lastLine = prudensFormalDialogueTextarea.lastLine();
				prudensFormalDialogueTextarea.scrollTo(null, prudensFormalDialogueTextarea.charCoords({line: lastLine, ch: 0}, "local").bottom);

				currentNLDialogue = nlDialogue;
				currentPrudensDialogue = prudensDialogue;
				currentArgument++;

				inferConclusion();
			}

			else {
				alert("Translation Error! Cannot match with an argument of translation map");
				throw new Error("Translation Error! Cannot match with an argument of translation map");
			}
	}

	catch (err) {
		console.log(err);
	}
		
}





async function inferConclusion() {

	let lResponseJSON = '{ "context": [], "inferences" : [], "facts" : [], "graph" : {}, "dilemmas" : [], "defeatedRules" : [], logs : [] }';

	try {

		lResponseJSON = await prudens_deduce(currentPrudensDialogue.replace(/[\t\n\r]/g, '') + policyProceduresSection, "suppose; perceive;");
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
			suggestion = "Loan application rejection must be further supported otherwise it will be dismissed!"
		else {
			if (evalResult == 1)
				suggestion = "Loan application rejection is dismissed!"
			else
				suggestion = "Loan application rejection is upheld!"

			explanations.forEach(row => {
				if (row.length >= 2 && conclusionExpressions.includes(row[1])) {
					nlJustification += row[0];
				}
			});
		}

		let nlConclusions = "Determination: " + suggestion;
		nlConclusions += (nlJustification !== "") ? ("\n\nJustification:\n" + nlJustification) : "";

		//document.getElementById("inferredNLConclusions").innerHTML = nlConclusions;
		nlConclusionsTextArea.setValue(nlConclusions);
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





function viewSystemOutput() {
	systemOutputEditor.set(responseJSON);
}





function openPopup(popupElement, actionNESTOR = null) {
	if (actionNESTOR)
		actionNESTOR();
    document.getElementById(popupElement).style.display = "block";
}





function openPopupFlex(popupElement, actionNESTOR = null) {
	if (actionNESTOR)
		actionNESTOR();
    document.getElementById(popupElement).style.display = "flex";
}





function closePopup(popupElement) {
    document.getElementById(popupElement).style.display = "none";
}





// Function to return a promise that resolves when the user submits text
function waitForUserInput() {
    return new Promise((resolve, reject) => {
        // Replace the handleSubmit function with a new implementation
        window.handleSubmit = function() {
            text = document.getElementById('popupTextControl').value;
			passkey = document.getElementById('popupPassKey').value;
			document.getElementById('popupTextControl').value = "";
            closePopup("argumentInputPopup");
            resolve({text, passkey});
        };

        // Handle the cancel button to reject the promise
        window.handleCancel = function() {
			document.getElementById('popupTextControl').value = "";
            closePopup("argumentInputPopup");
            reject(new Error('User canceled the input'));
        };
    });
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
