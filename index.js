const btnEl = document.getElementById('btn');
const appEl = document.getElementById('app');

getNotes().forEach(element => {
    const noteEl=createNoteEl(element.id,element.content);
    appEl.insertBefore(noteEl,btnEl);
});

function createNoteEl(id,content){
    const element=document.createElement('textarea');
    element.classList.add("note");
    element.placeholder= "Empty Note";
    element.value = content;
    element.addEventListener('dblclick',()=>{
         const warning = confirm("Do you want to delete this note?");
         if(warning){
            deleteNote(id, element);
         }
    })

    element.addEventListener('input',()=>{
        updateNote(id,element.value);
    })
    return element;
}

function updateNote(id,content){
    const notes = getNotes();
    const target = notes.filter((note)=>note.id==id)[0];
    target.content=content;
    saveNoteToLocalStorage(notes);
}

function deleteNote(id,element){
    const notes = getNotes().filter(note=>note.id!=id);
    //will get reference to the array which have all id except the id given in parameter
    saveNoteToLocalStorage(notes);
    appEl.removeChild(element);
}

function addNote(){
    const notes=getNotes();
    const noteObj = {
        id: Math.floor(Math.random()*100000),
        content: "",
    };
    const noteEl = createNoteEl(noteObj.id,noteObj.content);
    appEl.insertBefore(noteEl,btnEl);
    notes.push(noteObj);
    saveNoteToLocalStorage(notes);
}

function getNotes(){
    
    // let note=localStorage.getItem("note-app");
    // console.log(note);
    // console.log(typeof note);
    //we will get json string from the browser so we have to convert to js obj
    return JSON.parse(localStorage.getItem("note-app")||"[]");
    //if no note app then empty sting array
}

function saveNoteToLocalStorage(notes){
    localStorage.setItem("note-app",JSON.stringify(notes));//to save to application localstorage
    //json.stringify() convert js value array to json string
}

btnEl.addEventListener('click', addNote);