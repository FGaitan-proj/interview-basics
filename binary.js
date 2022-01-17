import * as Algo from "./algorithms.js";
import * as A from "./array.js";

//changes the text of the start button
let start = document.querySelector(".start_button");
start.innerHTML = "Start BinarySearch";

//creating the HTML for Binary Search
const start_out = document.createElement("div");
start_out.setAttribute("class","start");
start_out.innerHTML =  ` 
<p>
    Input the Label and the element to be found. The Explored button provides the explored elements from binary search in the array, and they are in the form [o_{k}].
</p>
<center>
Array Label: <input type="text" class="search_array" size="10" />
<br>
Find Element: <input type="text" class="search_source" min="0" value="0" size="10" /> 
<br>
<button class="explored_button"> Explored </button>
</center>`;

//the explored button, Array Label input, and find Element input
const explored_button = start_out.querySelector(".explored_button");
const search_array = start_out.querySelector(".search_array");
const search_source = start_out.querySelector(".search_source");
let label = search_array.value;
let find = search_source.value;

//prints the explored elements
const printE = function(array) {
    let print = document.createElement("div");
    print.innerHTML="Explored: "
    for(let i=0; i< array.length; i++) {
        print.innerHTML+="["+array[i]+"]";
    }
    return print
}

//adds the text of start_out iff the start button was clicked
start.addEventListener("click", () => {
    if (Object.keys(A.label_ls).length === 0) {
        window.alert("Please make an Array first");
    } else {
        start_out.querySelector(".search_array").value = ""
        document.body.insertBefore(start_out, A.all_arr);
    }
})

//updates the var rep for Array Label input
search_array.addEventListener("change", (event) => {
    label = event.target.value;
})

//update sthe var rep for the find Element input
search_source.addEventListener("change", (event) => {
    find = event.target.value;
})

//applies Algo.BinarySearch to A.label_ls[label]
explored_button.addEventListener("click", () => {
    if (A.inobj(label, A.label_ls)) {
        let array = A.label_ls[label];
        if (array.some((element) => element === find)){
            let explored = Algo.BinarySearch(array,find);
            let current = A.all_arr.querySelector("."+label);
            current.appendChild(printE(explored));
        } else {
            window.alert("Element not found in array: "+label)
        }
    } else {
        window.alert("Please use a constructed Array")
    }
    
})
    