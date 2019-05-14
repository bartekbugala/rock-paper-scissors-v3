'use strict';
function generateGameScoreTable(scoreArray, columnNamesObject) {
    let htmlString = '<table><thead><tr>' + generateColumnNames(columnNamesObject) + '</tr></thead><tbody>';
    for (let i = 0; i < scoreArray.length; i++) {
        htmlString += '<tr>' + generateGameScoreRowContent(scoreArray[i]) + '</tr>'
    }
    htmlString += '</tbody></table>';
    return htmlString;
}

function generateGameScoreRowContent(roundDataObject) {
    let htmlString = '';
    for (let key in roundDataObject) {
        htmlString += '<td>' + roundDataObject[key] + '</td>';
    }
    return htmlString;
}

function generateColumnNames(columnNamesObject) {
    let htmlString = '';
    for (let key in columnNamesObject) {
        htmlString += '<th>' + columnNamesObject[key] + '</th>';
    }
    return htmlString;
}