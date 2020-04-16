var td = document.createElement('td');
document.body.appendChild(td);

{/* <td style="display:none"><input type="text">
        <button type="button" class="btn btn-success" id="add">Add</button>
    
    <li>hiiii</li>
    <li>fsff</li>
</td> */}
var li1 = document.createElement('li');
var li2 = document.createElement('li');
ul.appendChild(li1);
ul.appendChild(li2);

function hide(e){
  // e.target refers to the clicked <li> element
  // This is different than e.currentTarget which would refer to the parent <ul> in this context
  e.target.style.visibility = 'hidden';
}

// Attach the listener to the list
// It will fire when each <li> is clicked
ul.addEventListener('click', hide, false);