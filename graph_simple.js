/*
User Interface aspect of creating a simple graph and 
this file also contains the simple graph class
*/

/************************Graph Class & Other Functions********************/
// input: x,y are arrays of two elements
// return: true iff x and y both exactly the same elements
const equiv = function (x,y) {
  let [a,b] = x;
  let [c,d] = y;
  return ((a===c && b===d) || (b===c && a===d))
}

// input: x, a variable and xs, an dictionary
// output: true if x is in xs and false otherwise
const inobj = function (x,xs) {
  let ans = false;
  Object.keys(xs).forEach(element => {
    if (element === x) {ans = true};
  });
  return ans
}

// input: x, a variable and xs, an dictionary
// output: true if x is in xs and false otherwise
const inarr = function (x,xs) {
  let ans = false;
  xs.forEach(element => {
    if (equiv(element,x)) {ans = true};
  })
  return ans
}

//removes an element from an array of ints through regular iteration
const remove = function (x,ls){
  let ret = [];
  let n = ls.length;
  for (let i = 0; i < n; i++) {
    if (ls[i] != x) {
      ret.push(ls[i])
    }
  }
  return ret
}

//removes an two element array from an array depending on the first 
//element in the two element array through iteration
const remove2 = function (x,ls){
  let ret = [];
  let n = ls.length;
  for (let i = 0; i < n; i++) {
    let y = ls[i]
    if (!equiv(x,y)) {
      ret.push(ls[i])
    }
  }
  return ret
}

//Different random colors for each graph
var colors = ["#E49175;","#DF8C70;", "#E9967A;", "#DA876B;",
"#D58266;", "#D07D61;", "#CB785C;", "#C67357;", "#C16E52;", "#BC694D;",
"#B76448;", "#B25F43;", "#AD5A3E;", "#F5A286;", "#FFAE92;", "#FFBA9E;",
"#FFC6AA;", "#FFD2B6;", "#FFDEC2;", "#FFEACE;", "#FFF6DA;", "#FFFFE6;",
"#FFFFF2;", "#FFFFFE;", "#FFFFFF;", "#E9C37D;", "#F5CF89;", "#FFDB95;",
"#F5A7EB;", "#FFB357;"]

// input: colorArray, array of colors ids
// returns: a single color id
const random_color = function (colorArray){
  let n = Math.floor(Math.random() * colorArray.length);
  return colors[n]
}

// An undirected simple graph with n nodes and e edges
class Graph {
  constructor(n){
    this.nodes = n; //nodes
    this.edges = []; //edges
    this.adj_nodes = []; //array that maps node to list of adjacent nodes
    for (var i=0; i<n; i+=1){
      this.adj_nodes.push([]);
    }
  }

  //returns: total nodes
  nodes(){
    return this.nodes;
  }

  //returns: total edges
  edges(){
    return this.edges;
  }

  //returns: adjacent nodes of v
  neighbors(v){
    return this.adj_nodes[v]
  }

  //u, v: int
  //precondition: 0 <= u,v < this.nodes
  //returns: bool, True iff an edge (u,v) exists
  is_edge(u,v){
    return this.adj_nodes[u].some(element => element == v);
  }

  //u,v: int
  //precondition: 0 <= u,v < this.nodes
  //if u!=v and they are not already connected, adds an edge (u,v)
  add_edge(u,v){ 
    if (u != v && !this.is_edge(u,v)){
      this.edges.push([u,v]);
      this.adj_nodes[u].push(v); // adds (u,v)
      this.adj_nodes[v].push(u); // adds (v,u)
    }
  }

  //u, v: int
  //precondition: 0 <= u,v < this.nodes
  //Removes the undirected edge (u,v) is it exists
  remove_edge(u,v){
    if (this.is_edge(u, v)){
      this.edges = remove2([u,v],this.edges);
      this.adj_nodes[u] = remove(this.adj_nodes[u], v);
      this.adj_nodes[v] = remove(this.adj_nodes[v], u);
    }
  }
}

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
  if (inobj(label,graph_ls)) {
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
    if (inobj(label,graph_ls)){
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
    if (inobj(label,graph_ls)){
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
  if (inobj(label, graph_ls)) {
    //Alerts user the graph name is already in use
    window.alert("Graph Name already in use");

  } else if (label === "") {

    //Alerts user there is no graph name
    window.alert("Please insert valid graph name");

  } else {

    //make p tag element with a random color
    let col = random_color(colors);
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
    graph_ls[label] = new Graph(node);
    
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

export {graph_ls,inarr,inobj, Graph, All_graphs};