import * as Algo from "./algorithms.js";
import * as A from "./array.js";

//changes the text of the start button
let start = document.querySelector(".start_button");
start.innerHTML = "Start MergeSort";

//changes element input type to number
let element_input = A.change_elems.querySelector(".elem");
element_input.setAttribute("type","number");
element_input.setAttribute("max","1000000");
element_input.setAttribute("min","-1000000");

//creating the HTML for Binary Search
const start_out = document.createElement("div");
start_out.setAttribute("class","start");
start_out.innerHTML =  ` 
<p>
    Input the Label and the element to be found. The Sort button provides 
    a sorted array. The Comparisons button provides all comparisons made
    during MergeSort. The Steps button are the different manipulated versions of the array.
</p>
<center>
Array Label: <input type="text" class="sort_array" size="10" value="One"/>
<br>
<button class="sort_button"> Sort </button>
&emsp;
<button class="compare_button"> Comparisons </button>
&emsp;
<button class="steps_button"> Steps </button>
</center>`;

//Array Label input, the explored button, and find Element input
const sort_array = start_out.querySelector(".sort_array");
const sort_button = start_out.querySelector(".sort_button");
const compare_button = start_out.querySelector(".compare_button");
const steps_button = start_out.querySelector(".steps_button");
let label = sort_array.value;

//prints the explored elements
const printE = function(array, x) {
    let print = document.createElement("div");
    if (x === 0) {
        print.innerHTML="Sorted: [ "+array+"]"
    } else if (x === 1){
        print.innerHTML="Comparisons: "
        for(let i=0; i< array.length; i++) {
            print.innerHTML+="("+array[i]+")";
        }
    } else {
        print.innerHTML="Steps: "
        for(let i=array.length-1; i>=0; i--) {
            print.innerHTML+="<br> "+i+": ["+array[i]+"]";
        }
    }
    return print
}

const buttons = function(x) {
    if (A.inobj(label, A.label_ls)) {
        let all = Algo.Mergesort(A.label_ls[label]);
        let current = A.all_arr.querySelector("."+label);
        current.appendChild(printE(all[x],x));
    } else {
        window.alert("Please use a constructed Array")
    }
}

//adds the text of start_out iff the start button was clicked
start.addEventListener("click", () => {
    if (Object.keys(A.label_ls).length === 0) {
        window.alert("Please make an Array first");
    } else {
        document.body.insertBefore(start_out, A.all_arr);
    }
})

//updates the var rep for Array Label input
sort_array.addEventListener("change", (event) => {
    label = event.target.value;
})
    
//provides the sorted array
sort_button.addEventListener("click", () => buttons(0));

//provides an array of two element arrays
compare_button.addEventListener("click", () => buttons(1));

//provides the steps of the MergeSort process
steps_button.addEventListener("click", () => buttons(2));
