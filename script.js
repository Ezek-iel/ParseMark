//* All Regular expressions

const codeRegex = /`(.+)`/g

const boldRegex = /\*\*(.+)\*\*/g

const italicRegex = /\*([a-zA-Z0-9 ]+)\*/g

const headingRegex = /(#+)(.+)/g

/**
 * 
 * @param {string} text 
 */
function parseBold(text) {
    if (boldRegex.test(text)){
        return text.replace(boldRegex, `<b>$1</b>`)
    }
    return text
}

/**
 * 
 * @param {string} text 
 */
function parseItalic(text) {
    if (italicRegex.test(text)){
        return text.replace(italicRegex, `<i>$1</i>`)
    }
    return text
}

function parseCode(text){
    if (codeRegex.test(text)){
        return text.replace(codeRegex, `<code>$1</code>`)
    }
    return text
}

/**
 * 
 * @param {string} text 
 */
function parseHeaders(text) {
    if (!headingRegex.test(text)){
        return text
    }
    let match = headingRegex.exec(text)

    let [_, heading, resultText] = headingRegex.exec(text)
    if (heading.length <= 6){
        return `<h${heading.length}> ${resultText} </h${heading.length}>`
    }
    return text
}

/**
 * 
 * @param {string} expression 
 */
function parseExpression(expression){
    let resultString = "";
    let lines = expression.split('\n')
    for (let line of lines){
        if (line == '---'){
            resultString += "<hr>";
            continue;
        }
        line = parseHeaders(line)
        line = parseBold(parseCode(line))
        resultString += parseItalic(line) + "&nbsp"
    }
    return resultString
}


let parseButton = document.querySelector("#parse-btn")
let output = document.querySelector("#output")
let input = document.querySelector("#input")

parseButton.addEventListener(
    'click',
    e => {
        output.innerHTML = parseExpression(input.value)
    }
)
