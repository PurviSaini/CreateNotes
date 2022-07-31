// if user adds a note, adding it to local storage
displayNotes();
// adding title to our note
let addTitle=document.getElementById('addTitle');
addTitle.addEventListener('click',function(){
    //click event
        if(document.getElementById('area')==null){
        let text=addTitle.innerHTML;
        addTitle.innerHTML=`<textarea class="form-control" id="area" rows="1">${text}</textarea>`
    }
    //blur event
      let textarea=document.getElementById('area');
      textarea.addEventListener('blur',function(){
      addTitle.innerHTML=textarea.value;
    });
});

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }
    //created an object that will have title and note text
    let notesObj={
        title:"",
        text:""
    }
    notesObj.title=addTitle.innerHTML;
    notesObj.text=addText.value;
    notesArr.push(notesObj);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    addText.value = "";
    displayNotes();
    addTitle.innerHTML="Add Title";

});
// read data from local storage
function displayNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }

    let html = "";
    notesArr.forEach((element, index) => {
    
        html += `
      <div class="notesCard card m-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
          </div>
        </div>`;


    });

    let notesElement = document.getElementById('notes');
    if (notesArr.length != 0) {
        notesElement.innerHTML = html;
    }
    else {
        notesElement.innerHTML = `Add your first Note!!`;

    }
}
// delete note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr =JSON.parse(notes);
    }
    notesArr.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArr));

    displayNotes();
}
// search functionality
let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function () {
    let inputText = searchText.value.toLowerCase();
    let notesCard = document.getElementsByClassName('notesCard');
    Array.from(notesCard).forEach(function (e) {
        let noteText = e.getElementsByTagName('p')[0].innerText;
        if (noteText.includes(inputText)) {
            e.style.display = "block";
        }
        else {
            e.style.display = "none";

        }

    });
    
});
