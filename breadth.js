import * as Simple from "./graph_simple.js";
import * as Algo from "./algorithms.js";

/*******************Start Button & Updates Inputs***********************/
const start_button = document.querySelector(".start_search");
const label_input = document.querySelector(".GName");
let label = label_input.value;
let bfs_out = false;

//breadth inputs and description in html
let breadth = document.createElement("div");
breadth.setAttribute("class","breadth");
breadth.innerHTML =  ` 
<p>
    Input the Label and the source node to produce the shortest
    distance between the source node and all other nodes. The Explored button provides the explored nodes in the graph from the source to the goal. The explored nodes are in the form [o_{k}]. The Path button 
    provides the path that BFS finds from the goal to source node. The path
    nodes are in the form (o_{k}).
</p>
<center>
Graph Label: <input type="text" class="search_graph" size="10"
value=${label} />
<br>
Source Node: <input type="number" class="search_source" min="0" value="0" max="1000000"/> 
<br>
Goal Node: <input type="number" class="search_goal" min="0" value="0" max="1000000"/>
<br>
<button class="explored_button"> Explored </button>
<br>
<button class="paths_button"> Path </button>
</center>`

const bfs_input = breadth.querySelector(".search_graph");
const source_input = breadth.querySelector(".search_source");
const goal_input = breadth.querySelector(".search_goal");
let bfs_inp = bfs_input.value;
let source = source_input.value;
let goal = goal_input.value;

//Updates current label
label_input.addEventListener("change", (event) => { 
    label = event.target.value;
})

//Updates current graph label under the bfs section
bfs_input.addEventListener("change", (event) => { 
    bfs_inp = event.target.value;
    source_input.max = Simple.graph_ls[bfs_inp].nodes-1;
    goal_input.max = Simple.graph_ls[bfs_inp].nodes-1;
})

//Updates current source node under the bfs section
source_input.addEventListener("change", (event) => { 
    source = event.target.value;
})

//Updates current goal node under the bfs section
goal_input.addEventListener("change", (event) => { 
    goal = event.target.value;
})

//Ouputs Graph Label and Source Node input
start_button.addEventListener("click", () => {
    if (Object.keys(Simple.graph_ls).length === 0) {
        window.alert("Please make a graph first")
    } else {
        if (!bfs_out) {
            bfs_input.value = label;
            source_input.max = Simple.graph_ls[label].nodes-1;
            goal_input.max = Simple.graph_ls[label].nodes-1;
            document.body.insertBefore(breadth, Simple.All_graphs);
            window.scrollTo(0,document.body.scrollHeight);
            bfs_out = true;
        }
    }
})


/************************Explored Button***************************/
const explored_button = breadth.querySelector(".explored_button");

// input: dist, an array of two length arrays
// output: a string of arrows going telling you the shortest distance
// from the source to every other node along with how many paths exist 
// of that distance
const explored = function (dist=[], g){
    let output = "";
    let i = 0;
    while (i < dist.length) {
        let k = dist[i].toString();
        if (i === 0){
            output+= "[o"+k.sub()+"]-";
        } else {
            output+= "-[o"+k.sub()+"]-";
        }
        i++;
    }
    return output + "> o"+g.toString().sub()
}

//outputs the distance from the source node to each node using the 
// given algorithm
explored_button.addEventListener("click",() => 
{
    if (Simple.inobj(bfs_inp,Simple.graph_ls)) {
        let bfsgraph = Simple.graph_ls[bfs_inp]
        let docgraph = document.querySelector("."+bfs_inp);
        let exp = document.createElement("div");
        
        if ((bfsgraph.nodes-1 >= source) && (bfsgraph.nodes-1 >= goal)) {
            let dist = Algo.BreadthFirstSearch(bfsgraph, source, goal);
            if (dist.length === 0){
                exp.innerHTML = "Explored: " + explored(dist, goal);
                docgraph.appendChild(exp);
            } else {
                window.alert("No path exists from "+source+ " to "+goal)
            }
        } else {
            window.alert(source.toString() + " node is not a valid node\
            \nPlease add a valid node or no edges attached to graph")
        }
    } else {
        window.alert("Graph Label Input not a valid Label");
    }
})

/************************All Paths Button***************************/
const paths_button = breadth.querySelector(".paths_button");

// input: dist, an array of two length arrays
// output: a string of arrows going telling you the shortest distance
// from the source to every other node along with how many paths exist 
// of that distance
const sourcetonode = function (dist, goal){
    let search = dist[goal];
    let path = search[2];
    let output = "";
    let i = 0;
    while (i < path.length-1) {
        let k = path[i].toString()
        output+= "(o"+k.sub()+")--";
        i++
    }
    return search[1]+" Path(s) found of length "+ search[0]+" : "+output + "> o" + path[i].toString().sub()
}

//outputs the distance from the source node to each node using the 
// given algorithm
paths_button.addEventListener("click",() => 
{
    if (Simple.inobj(bfs_inp,Simple.graph_ls)) {
        let bfsgraph = Simple.graph_ls[bfs_inp]
        let docgraph = document.querySelector("."+bfs_inp);
        let edges = document.createElement("div");
        
        if (bfsgraph.nodes-1 >= source && bfsgraph.nodes-1 >= goal) {
            let dist = Algo.BreadthFirstSearchPaths(bfsgraph, source);
            edges.innerHTML = sourcetonode(dist, goal);
            docgraph.appendChild(edges);
        } else {
            window.alert(source.toString() + " node is not a valid node\
            \nPlease add a valid node or no edges attached to graph")
        }
    } else {
        window.alert("Graph Label Input not a valid Label");
    }
})
