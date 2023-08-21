import * as A from "./algorithms.js";
/*
User Interface aspect of creating an array
*/

//HTML to start constructing the array
const array = document.createElement("div");
array.innerHTML = `
<strong>Array Construction</strong> 
<br>
This page is designed to take a Name to create one or more arrays.
If you want to specify the changes to a specific array, then you just
need to change the input for Label.
<p>
  Label: <input type="text" class="AName" value="One" size="10"/>
</p>
<p>
  <button class="array_button">Make Array</button>
  <br>
  <button class="start_button"> </button>
</p>
`

//HTML for editing the array 
const change_elems = document.createElement("div");
change_elems.setAttribute("class","change_elems");
change_elems.innerHTML = `
<center>
Applying changes to <strong class="lbl">One</strong>.
<br>
Element:
  <input type="text" class="elem" value="0" size="10"/>
  <br>
  <button class="AElem"> Add Element </button>
  <button class="RElem"> Remove Element </button>
</center>
`;


//contains all array elements in document
const all_arr = document.createElement("p");
all_arr.setAttribute("class","all_arr");
all_arr.setAttribute("style", "height: 200px; overflow-y: scroll;");

//Label input, Element input, Make Array Button, Add/Remove Element button
const array_label = array.querySelector(".AName");
const element_input = change_elems.querySelector(".elem")
const array_button = array.querySelector(".array_button");
const add_button = change_elems.querySelector(".AElem");
const rem_button = change_elems.querySelector(".RElem");
let label = array_label.value;
let elem = element_input.value;
let label_ls = {};

//appending HTML to start making arrays, and the container of all arrays
document.body.appendChild(array);
document.body.appendChild(all_arr);

//updates the label of the array
array_label.addEventListener("change", (event) => {
    label = event.target.value;
    change_elems.querySelector(".lbl").innerHTML = label;
    console.log(label)
})

//updates the input for the element 
element_input.addEventListener("change", (event) => {
    elem = event.target.value;
})

//adds a visual to all_arr of a new array
array_button.addEventListener("click", () => {
    if (A.inobj(label, label_ls)) {
      //Alerts user the array name is already in use
      window.alert("Array Name already in use");

    } else if (label === "") {

      //Alerts user there is no array name
      window.alert("Please insert valid array name");

    } else {

      //adds the change buttons, and adds a new array
      document.body.insertBefore(change_elems,all_arr);
      let arr = document.createElement("div");
      arr.setAttribute("class", label);
      arr.setAttribute("style","background-color:"+ A.random_color());

      //adds text to constructed p tag
      //TODO add a a select button/ save button?
      arr.innerHTML = `
      <center>
      &emsp;
      ${label} Array  
      <button class="del${label}" style="float: right;"> 
      Delete 
      </button> 
      </center> 
      <br>
      <div class="elem${label}" ></div>
      `;

      //adds p tag to page 
      all_arr.appendChild(arr);

      //add label to global list
      label_ls[label] = [];
      
      //autoscroll to bottom 
      window.scrollTo(0,document.body.scrollHeight);

      //delete button
      document.querySelector(".del"+label).addEventListener("click", () => {
          arr.innerHTML = "";
          delete label_ls[label];
      })
    }
})

//the functionality of the add element button
add_button.addEventListener("click", () => {
    if (A.inobj(label,label_ls)) {
      if (label_ls[label].some(element => element === elem)) {
        window.alert("Please do not repeat elements")
      } else {
        let arr = all_arr.querySelector("."+label);
        let elHTML = arr.querySelector(".elem"+label);
        let ls = label_ls[label].push(elem);
        elHTML.innerHTML="{"+ls+"} ["+label_ls[label]+"]"
      } 
    } else {
        window.alert("Please use a valid Array name")
    }
})

//the functionality of the remove button
rem_button.addEventListener("click", () => {
    if (A.inobj(label,label_ls)) {

        let arr = all_arr.querySelector("."+label);
        let elem = arr.querySelector(".elem"+label);
        label_ls[label] = A.remove1(element,label_ls[label]);
        elem.innerHTML="{"+label_ls[label].length+"} ["+label_ls[label]+"]"
        
    } else {
        window.alert("Please use a valid Array name")
    }
})

export {label_ls, all_arr, change_elems};