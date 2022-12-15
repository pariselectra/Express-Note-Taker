const fs = require("fs");

const path = require("path");

function noteCreateNewNote(body, noteTakerArray) {
    const note = body;
    noteTakerArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        }, null, 2)
    )
    return note;
}

function noteDeleteNote(noteTakerArray, id) {
    let deleteID = parseInt(id);
    noteTakerArray.splice(deleteID, 1);

    for (let i = deleteID; i < noteTakerArray.length; i++) {
        noteTakerArray[i].id = i.toString();
    }

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        }, null, 2)
    )
}


module.exports = {
    noteCreateNewNote,
    noteDeleteNote
};