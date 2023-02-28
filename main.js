

async function getResponse() {
    try {
    //Get elements: 
    const languageBox = document.getElementById("languageBox");
    const difficultyBox = document.getElementById("difficultyBox");
    const countBox = document.getElementById("countBox");

    //Get completion: 
    const language = languageBox.value;
    const difficulty =  difficultyBox.value;
    const count = countBox.value;

    const prompt = promptEngineering(language, difficulty, count)

    const completion = await getCompletion(prompt);

    displayLikeHumanWriting(completion)

    // responseDiv.innerHTML = completion
    }
    catch(err) {
    alert(err.message)
    }

}

function promptEngineering (language, difficulty, count) {
    let prompt = `
    Write ${count} job interview questions for ${language} programming language. 
    Suitable for ${difficulty} level
    1. First example here...
    2. Second example here...
    Arrange each question in a different paragraph
    `;
    return prompt

}

async function displayLikeHumanWriting(completion) {
    for(let i = 0; i < completion.length; i++) {
    responseDiv.innerHTML += completion[i]
    await delay(30);
}
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
}
 
async function getCompletion(prompt) {

    //API key:
    const apiKey = "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"

    //Url:
    const url = "https://api.openai.com/v1/completions";

    //Request body: 
    const body = {
        prompt, 
        model: "text-davinci-003",
        max_tokens: 2500 // Max tokens in completion (returned answer)
    }

        //Post options: 
    
    const options = {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify(body)
    }

    //Get response: 
    const response = await fetch(url, options);

    if(response.status >= 400) throw json.error

    //Extract JSON:
    const json = await response.json()

    const completion = json.choices[0].text;

    return completion
}




// Prompt - the text we send to ChatGPT

//Completion - The text chatGPT return from the prompt;

//Prompt Engineering - technic to build prompt to answer best answer;