let i = 0;
let submit = document.getElementById("submit");
let taskAdd = $("#taskAdd");

// <--------- Load Task From Database ---------->
window.onload = function () {
  getTodos();   // get data from db
  document.getElementById("inpDate").value = tomorrowDate(); // Set the tommorow date
};

// <--------- Load Task data to Database from form---------->

submit.onclick = function () {
  let task = document.getElementById("inpNewTask").value;
  let descrip = document.getElementById("inpDescrip").value;
  let inpDate = document.getElementById("inpDate").value;
  let inpStatus = document.getElementById("inpStatus").value;
  let inpPrior = document.getElementById("inpPrior").value;

  if (task == "") {
    alert("Please input Task");
    return false;
  }
  if (inpDate == "") {
    alert("Please input date");
    return false;
  }

  let array = [task, descrip, inpDate, inpStatus, inpPrior];
  tableRow(array);
  addNewTodoJson(task, descrip, inpDate, inpStatus, inpPrior);
};

// <--------- Display the data to the Table ---------->
function tableRow(array) {
  let tableRef = document.getElementById("taskAdd");
  let newRow = tableRef.insertRow(-1);
  
  for (let index = 0; index < array.length; index++) {
    let newCell = newRow.insertCell(index);
    let newText = document.createTextNode(array[index]);
      if(index == 0){
        newCell.setAttribute("onclick", "toggle("+ ++i + ")" );
        newCell.setAttribute("text-decoration","underline");
      }
    newCell.appendChild(newText);
  }

  let newCell = newRow.insertCell(array.length);
  newCell.id = i;
  newCell.setAttribute('Style', 'display:none');
  expand(i);
}
// <--------- Create the Add Note button and Display the Notes in every task ---------->
async function expand(id) { 
  console.log(id);
  let noteOne = document.getElementById(id);
  let inp = document.createElement('input')
  inp.id = 'addNewNote'+id;
  let btn = document.createElement('button')
  btn.className = "btn btn-success";
  btn.innerText = "Add New Note";
  btn.id = 'addNote-'+id;
  btn.setAttribute('onclick','addNew('+id+')');
  noteOne.appendChild(inp);
  noteOne.appendChild(btn);
  

  //Display the Notes in every task
  let url = '/todos/'+id+'/notes';
  const resp = await fetch(url, { method: "GET" });
  const notes = await resp.json();
  console.log(notes);
  for (note in notes) {
      // console.log(note);
      let listNote = document.createElement('li')
      listNote.innerText =  notes[note].descrip;
      noteOne.appendChild(listNote)  
  }
}

//<---------- Get the Todo task ----------->
async function getTodos() {
  const resp = await fetch("/todos", { method: "GET" });
  const todos = await resp.json();
  for (todo in todos) {
    tableRow([
      todos[todo].task,
      todos[todo].descrip,
      todos[todo].due,
      todos[todo].status,
      todos[todo].priority
    ]);
  }
}

//<---------- Display Notes to the particular task ----------->
function addNew(id){
  let noteValue = document.getElementById("addNewNote"+id)
  console.log(noteValue.value);
  if(noteValue.value == ""){
    alert('Add Note');
    return false
  }
  else{
    addNewNoteJson(noteValue.value,id);
    let noteOne = document.getElementById(id);
    let listNote = document.createElement('li')
    listNote.innerText = noteValue.value;
    noteOne.appendChild(listNote)  
  }
}

//<---------- Add the New Notes to the task (POST)----------->
async function addNewNoteJson(descrip,id){
  let url = "/todos/"+id+"/notes";
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     descrip
    }),
  });
}

//<---------- Add the New Task to the Database (POST)  ----------->
async function addNewTodoJson(task, descrip, due, status, priority) {
  const resp = await fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task,
      descrip,
      due,
      status,
      priority,
    }),
  });
}

//<---------- Show and Hide the Notes of task--------->
function toggle(id) {
  var e = document.getElementById(id);
  if(e.style.display == 'block')
     e.style.display = 'none';
  else
     e.style.display = 'block';
}

//Set the format of date
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

// returns tomorrow date
function tomorrowDate() {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(tommorow.getDate() + 1);
  return formatDate(tommorow);
}
