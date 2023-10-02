// ==UserScript==
// @name     Export Claude.Ai
// @description Download the conversation with Claude
// @version  1
// @grant    none
// @match    *://claude.ai/*
// ==/UserScript==

function getTextByClass(className) {
    var elements = document.getElementsByClassName(className);
    var result = [];

    for (var i = 0; i < elements.length; i++) {
        // Clone the node to not affect the original element
        var clone = elements[i].cloneNode(true);

        // Remove all SVG and button elements
        var unwantedElements = clone.querySelectorAll('svg, button');
        for (var j = 0; j < unwantedElements.length; j++) {
            unwantedElements[j].remove();
        }

        // Add cleaned text to the result
        result.push(clone.innerText.trim());
    }

    return result.join("\n");
}


function addButton() {
    var button = document.createElement("button");
    button.innerHTML = `Export`;
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        border-radius: 12px;
        z-index: 999;
    `;

    button.addEventListener ("click", function() {
        var text = getTextByClass('col-start-2');
        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        var url = URL.createObjectURL(blob);

        var link = document.createElement("a");
        link.download = 'extracted.txt';
        link.href = url;
        link.click();
    });

    document.body.appendChild(button);
}

addButton();
