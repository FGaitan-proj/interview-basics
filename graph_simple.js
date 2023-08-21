import * as A from "./algorithms.js";
/*
User Interface aspect of creating a simple graph
*/

/************************Graph Algorithms Set up**********************/
const node_input = document.querySelector(".GNode");
const label_input = document.querySelector(".GName");
const makeg_button = document.querySelector(".make_simplegraph");
const graph_ls = {};
let node = node_input.value;
let label = label_input.value;
let edges = false;

//Changes number of nodes to current input
node_input.addEventListener("change", (event) => {
  node = event.target.value;
})

//Changes label to current input
label_input.addEventListener("change", (event) => {
  label = event.target.value;
  if (A.inobj(label,graph_ls)) {
    document.querySelector(".lbl").innerHTML = label
    document.querySelector(".N1").max = graph_ls[label].nodes-1;
    document.querySelector(".N2").max = graph_ls[label].nodes-1;
  }
})

//The element that contains all graph elements in document
const All_graphs = document.createElement("p");
All_graphs.setAttribute("class","All_graphs");
All_graphs.setAttribute("style", "height: 200px; overflow-y: scroll;");


////////////////////////////Making and Changing Edges//////////////////////
// input: node, an int representing number of nodes
// returns: nothing, adds html for button to changes edges in html
//                  as well as the button for BFS
function make_edges(node) {
  //Makes the edges input
  const edges_input = document.createElement("div");
  edges_input.setAttribute("class","make_edges");
  document.body.appendChild(All_graphs);
  edges_input.innerHTML = `
  <center>
  Applying changes to <strong class="lbl"> ${label}</strong>.
  <br>
  Edges:
    <input type="number" class="N1" min="0" max="${node}" value="0"/>
    <input type="number" class="N2" min="0" max="${node}" value="0"/>
    <br>
    <button class="AEdges"> Add Edges </button>
    <button class="REdges"> Remove Edges </button>
  </center>
  `;
  document.body.insertBefore(edges_input, All_graphs);
  edges = true;
}

function Pr(edges){
  let printedges = [];
  edges.forEach( element => {
    let [n1,n2] = element;
    printedges.push(
        "o"+n1.toString().sub()+" ---- o"+n2.toString().sub()
    );
  })
  return "Edges {"+ edges.length + "}: " + printedges;
}

// input: graph, a string name for a graph
// return: nothing, allows functionality for add and remove buttons
function change_edges(graph, node) {
  const all_edges = document.createElement("div");
  const add_button = document.querySelector(".AEdges");
  const rem_button = document.querySelector(".REdges");
  const node1_input = document.querySelector(".N1");
  const node2_input = document.querySelector(".N2");
  let n1 = node1_input.value;
  let n2 = node2_input.value;
  
  //updates label
  document.querySelector(".lbl").innerHTML = label

  //updates n1 and n2 to current input and current max
  node1_input.max = node;
  node1_input.addEventListener("change", (event) => 
  { n1 = event.target.value; })
  node2_input.max = node;
  node2_input.addEventListener("change", (event) => 
  { n2 = event.target.value;})

  //Verifies validity of edge before adding to specified graph
  add_button.addEventListener("click", () => {
    if (A.inobj(label,graph_ls)){
      if (graph.className === label) { 
        let s_graph = graph_ls[label];
        s_graph.add_edge(n1,n2);
        all_edges.innerHTML = Pr(s_graph.edges);
        graph.appendChild(all_edges);
      }
    } else {
      window.alert("Please use a valid Graph name")
    }
  })

  //Verifies validity of edge before removing from specified graph
  rem_button.addEventListener("click", () => {
    if (A.inobj(label,graph_ls)){
      if (graph.className === label) { 
        let s_graph = graph_ls[label]; 
        s_graph.remove_edge(n1,n2);
        all_edges.innerHTML = Pr(s_graph.edges);
        graph.appendChild(all_edges);
      }
    } else {
      window.alert("Please use a valid Graph name")
    }
  })

}

////////////////////////////Making Graph Elements//////////////////////////
// input: node, an int number of nodes 
// output: returns array string representation of nodes
function printnode(node) {
  let printn = [];
  let i = 0;
  if (node <= 15) {
    while (i < node){
      let n = i.toString();
      printn.push(" o"+ n.sub());
      i++;
    }
  } else {
    while (i < 10){
      let n = i.toString();
      printn.push(" o"+ n.sub());
      i++;
    } 
    printn.push("... o"+ node.sub());
  }
  return printn
}


//Creates the visual Graph and appends to site
makeg_button.addEventListener("click", () => {
  if (A.inobj(label, graph_ls)) {
    //Alerts user the graph name is already in use
    window.alert("Graph Name already in use");

  } else if (label === "") {

    //Alerts user there is no graph name
    window.alert("Please insert valid graph name");

  } else {

    //make p tag element with a random color
    let col = A.random_color();
    let graph = document.createElement("div");
    graph.setAttribute("class", label);
    graph.setAttribute("style","background-color:"+col);

    //adds text to constructed p tag
    graph.innerHTML = `
    <center>
    &emsp;
    ${label} Graph {${node}} 
     <button class="del${label}" style="float: right;"> 
     Delete 
     </button> <br> 
     &emsp; ${printnode(node)}
    </center>
    `;

    //adds p tag to page 
    All_graphs.appendChild(graph);

    //add label to global list
    graph_ls[label] = new A.SimpleGraph(node);
    
    // add button for edges and to changes edges 
    if (!edges) {make_edges(node-1);};
    change_edges(graph, node-1);
    
    //autoscroll to bottom 
    window.scrollTo(0,document.body.scrollHeight);

    //delete button
    document.querySelector(".del"+label).addEventListener("click",
    () => {
      graph.innerHTML = "";
      delete graph_ls[label];
    })
  }
})

export {graph_ls, All_graphs};