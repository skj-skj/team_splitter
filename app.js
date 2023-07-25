console.log("Hello")

let teams = []

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

/**
 * 
 * @param {string} name 
 * @param {string[]} ids 
 * @returns {string}
 */
function buildLink(name, ids) {
    const emailList = ids.map((i) => i.trim());
    const users = emailList.join(",");

    const link = `https://teams.microsoft.com/l/chat/0/0?users=${users}&topicName=${encodeURIComponent(
        name
    )}`;

    return link;
}

/**
 * 
 * @param {number} num 
 * @returns {string}
 */
function numberToLetter(num) {
    const baseCharCode = "A".charCodeAt(0);
    const letterCount = 26;

    const index = (num % letterCount) + baseCharCode;
    const charCode = index > "Z".charCodeAt(0) ? baseCharCode : index;

    return String.fromCharCode(charCode);
}



/**
 * Returns List of Email Ids
 * @returns {String[]} ids
 */
function getEmails() {
    let ids = document.getElementById('emails').value.split(',').map(e => e.trim())
    return ids
}

/**
 * Clear Root div
 * @param {string} rootId 
 * @return {void}
 */
function clearRoot(rootId) {
    getRoot(rootId).innerHTML = ''
}

/**
 * 
 * @param {string} rootId 
 * @returns {HTMLDivElement}
 */
function getRoot(rootId) {
    return document.getElementById(rootId)
}

/**
 * 
 * @param {string[]} ids 
 * @param {string} teamName 
 * @returns {HTMLAnchorElement}
 */
function genAnchor(ids, teamName) {
    let aElement = document.createElement('a')
    let url = buildLink(teamName, ids)
    aElement.href = url
    aElement.textContent = `Click to Open ${teamName}`
    aElement.target = '_blank'
    return aElement
}

/**
 * 
 * @param {string} rootId 
 * @param {string[]} ids 
 * @param {string} teamName 
 * @return {HTMLDivElement}
 */
function genDiv(ids, teamName) {
    let divElement = document.createElement('div')

    let olElement = document.createElement('ol');

    ids.forEach(item => {
        let liElement = document.createElement('li')
        liElement.textContent = item
        olElement.appendChild(liElement)
    })

    let aElement = genAnchor(ids, teamName)
    let liElement = document.createElement('li')
    liElement.appendChild(aElement)
    olElement.appendChild(liElement)

    divElement.appendChild(olElement)
    return divElement
}

/**
 * Returns Teams
 * @returns
 */
function genTeams() {
    let ids = getEmails()
    let mid_ceil = Math.ceil(ids.length / 2)
    shuffle(ids)
    let teams = [ids.slice(0, mid_ceil), ids.slice(mid_ceil, ids.length)]
    clearRoot(rootId = "root")
    let rootDiv = getRoot("root")
    for ([index, team] of teams.entries()) {
        let teamName = `Team ${numberToLetter(index)}`
        let divElement = genDiv(team, teamName)
        rootDiv.appendChild(divElement)
    }

}

/**
 * 
 * @param {string} buttonId 
 * @param {boolean} do_disable
 */
function elementDisableToggle(buttonId, do_disable) {
    let button = document.getElementById(buttonId);
    button.disabled = do_disable;
    console.log(button)
}




/**
 * Generate Team with Blur Effect
 */
function genTeamsBlurred() {
    elementDisableToggle("generate-team-btn", true)
    elementDisableToggle("emails", true)
    let blurValue = 10;
    let intervalId = setInterval(() => {
        if (blurValue < 5) {
            getRoot('root').style.filter = "blur(0px)";
            elementDisableToggle("generate-team-btn", false)
            elementDisableToggle("emails", false)
            clearInterval(intervalId);
        } else {
            blurValue -= 1;
            getRoot('root').style.filter = "blur(" + blurValue + "px)";
        }
        genTeams()
    }, 1000);
}