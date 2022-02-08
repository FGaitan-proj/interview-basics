/*
helper functions, new classes, and algorithms
*/ 

//Different random colors for each graph
var colors = ["#E49175;","#DF8C70;", "#E9967A;", "#DA876B;",
"#D58266;", "#D07D61;", "#CB785C;", "#C67357;", "#C16E52;", "#BC694D;",
"#B76448;", "#B25F43;", "#AD5A3E;", "#F5A286;", "#FFAE92;", "#FFBA9E;",
"#FFC6AA;", "#FFD2B6;", "#FFDEC2;", "#FFEACE;", "#FFF6DA;", "#FFFFE6;",
"#FFFFF2;", "#FFFFFE;", "#FFFFFF;", "#E9C37D;", "#F5CF89;", "#FFDB95;",
"#F5A7EB;", "#FFB357;"]

// input: colorArray, array of colors ids
// returns: a single color id
const random_color = function (){
  let n = Math.floor(Math.random() * colors.length);
  return colors[n]
}

// input: x,y are arrays of two elements
// return: true iff x and y both exactly the same elements
// TODO make it so that its for everything
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

//removes a single element from an array of ints through regular iteration
const remove1 = function (x,ls){
  let ret = [];
  let n = ls.length;
  let once = false;
  for (let i = 0; i < n; i++) {
    if ((ls[i] != x) || once) {
      ret.push(ls[i])
    } else {
      once = true;
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
    if (ls[i].shift() != x) {
      ret.push(ls[i])
    }
  }
  return ret
}

// An undirected simple graph with n nodes and e edges
class SimpleGraph {
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
      this.edges = A.remove2([u,v],this.edges);
      this.adj_nodes[u] = A.remove1(this.adj_nodes[u], v);
      this.adj_nodes[v] = A.remove1(this.adj_nodes[v], u);
    }
  }
}

// An undirected weighted graph with n nodes and e edges
class WeightedGraph {
  constructor(n){
    this.nodes = n; //nodes
    this.edges = 0; //edges
    this.adj_nodes = []; //array that maps node to list of adjacent nodes
    for (let i=0; i<n; i+=1){
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
  //precondition: 0 <= u,v < this.edges
  //returns: bool, True iff an edge (u,v) exists
  is_edge(u,v){
    var ls = this.adj_nodes[u];
    for (var i=0;i<ls.length; i+=1){
      if (v == ls[i].shift()){
          return true;
      }
    }
    return false;
  }

  //u, v: int
  //precondition: 0 <= u,v < this.edges
  //returns: int, the weight of the edge or undefined
  weight (u,v){
    var ls = this.adj_nodes[u];
    for (var i=0;i<ls.length; i+=1){
      if (v == ls[i].shift()){
          return ls[i].pop();
      }
    }
    return undefined;
  }

  //u,v: int
  //w: float, edge weight
  //precondition: 0 <= u,v < this.edges
  //if u!=v and they are not already connected, adds an edge (u,v)
  add_edge(u,v, w){ 
    if (u != v && !this.is_edge(u,v)){
      this.edges+=1;
      this.adj_nodes[u].push([v,w]); // adds (u,v)
      this.adj_nodes[v].push([u,w]); // adds (v,u)
    }
  }

  //u, v: int
  //precondition: 0 <= u,v < this.edges
  //Removes the undirected edge (u,v) is it exists
  remove_edge(u,v){
    if (this.is_edge(u, v)){
      this.edges-=1;
      this.adj_nodes[u] = remove2(this.adj_nodes[u], v);
      this.adj_nodes[v] = remove2(this.adj_nodes[v], u);
    }
  }
}



////////////////////////////Breadth First search///////////////////////////
// input: graph, a simple Graph
//        s, an int source node label
//        g, an int goal node label
// returns: a list of explored nodes
const BreadthFirstSearch = function (graph, s, g){
  let Que = [];
  let Explored = [];
  Que.push(s);
  while (Que.length != 0) {
    let v = Que.pop()
    if (v == g) {
      return Explored
    }
    Explored.push(v);
    let neigh = graph.neighbors(v);
    for (let i = 0; i < neigh.length; i++) {
      let w = neigh[i];
      if (!Explored.some(x => w == x)) {
        Que.push(w);
      }
    }
  }
}

//input: graph, a simple graph
//       s, an int source node label
//returns: an array path of three element arrays path[i][0] is the length 
//        of first path that breadthfirst search finds, 
//        path[i][1] is the number of paths of that length
//        path[i][2] is the first path found
const BreadthFirstSearchPaths = function (graph,s) {
  let Nodes = graph.nodes;
  let path = [];
  let Que = [s];

  //defines all nodes at not searched as well as setting number of
  //paths to 0
  for (let i=0;i<Nodes;i+=1){
    path.push([-1,0,[s]]);
  }
  path[s] = [0,1,[s]];

  //searches through Que
  while(Que.length != 0) {
    let v = Que.pop();
    let ls = graph.neighbors(v);
    for (let j=0;j<ls.length; j+=1){
      let w = ls[j];
      let [v1,v2, v3] = path[v]; //current node info
      let [w1,w2, w3] = path[w]; //neighbor node info
      if (w1 == -1) {
        //adding to length of path or declaring as explored
        let w1 = v1 + 1;

        //adding to previous path
        let x = v3.slice();
        x.push(w);

        //redefining value of path[w]
        path[w] = [w1,v2,x];
        Que.push(w);
      }
      if (w1 == v1 + 1){
        path[w] = [w1,v2+w2, w3];
      }
    }
  }
  return path
}

////////////////////////////Depth First search///////////////////////////
// input: graph, a simple Graph
//        s, an int source node label
//        g, an int goal node label
// returns: a list of explored nodes
const DepthFirstSearch = function (graph, s, g){
  let Stack = [];
  let Explored = [];
  Stack.push(s);
  while (Stack.length != 0) {
    let v = Stack.shift()
    if (v == g) {
      return Explored
    }
    Explored.push(v);
    let neigh = graph.neighbors(v);
    for (let i = 0; i < neigh.length; i++) {
      let w = neigh[i];
      if (!Explored.some(x => w == x)) {
        Stack.push(w);
      }
    }
  }
}

//input: graph, a simple graph
//       s, an int source node label
//returns: an array path of three element arrays path[i][0] is the first path that depthfirst search finds, 
//        ls[i][1] is the number of paths of that length
//        ls[i][2] is the first path found
const DepthFirstSearchPaths = function (graph,s) {
  let Nodes = graph.nodes;
  let path = [];
  let Stack = [s];

  //defines all nodes at not searched as well as setting number of
  //paths to 0
  for (let i=0;i<Nodes;i+=1){
    path.push([-1,0,[s]]);
  }
  path[s] = [0,1,[s]];

  //searches through Stack
  while(Stack.length != 0) {
    let v = Stack.shift();
    let ls = graph.neighbors(v);
    for (let j=0;j<ls.length; j+=1){
      let w = ls[j];
      let [v1,v2, v3] = path[v]; //current node info
      let [w1,w2, w3] = path[w]; //neighbor node info
      if (w1 == -1) {
        //adding to length of path or declaring as explored
        let w1 = v1 + 1;

        //adding to previous path
        let x = v3.slice();
        x.push(w);

        //redefining value of path[w]
        path[w] = [w1,v2,x];
        Stack.push(w);
      }
      if (w1 == v1 + 1){
        path[w] = [w1,v2+w2, w3];
      }
    }
  }
  return path
}

////////////////////////////Binary search///////////////////////////
// input: ls, a simple array
//        x, an int goal element
// returns: a list of explored element
const BinarySearch = function (ls, x){
  let Explored = [];
  if (ls.length < 2) {
    return []
  }
  let Stack = [ls];
  while (Stack.length != 0){
    let xs = Stack.shift();
    let n = Math.floor((xs.length)/2);
    Explored.push(xs[n]);
    if (xs[n] == x) {
      return Explored
    }
    if (xs.length > 1){
      Stack.push(xs.slice(n))
      Stack.push(xs.slice(0,n))
    }
  }
}

////////////////////////////Merge Sort///////////////////////////
// input: array, an unsorted array
// returns: a sorted array,a list of steps in sorting, and a list of comparisons
const Mergesort = function (array){
  //base case
  let n = array.length;
  if (n < 2){
    return [array, [], []]
  }

  let newarr = [];
  let comp = [];
  let steps = [];

  //divide into two sorted arrays and merge steps from those arrays
  let split = Math.floor(n/2);
  let [left, lcom, lstep] = Mergesort(array.slice(0,split));
  let [right, rcom, rstep] = Mergesort(array.slice(split));
  comp = comp.concat(lcom);
  comp = comp.concat(rcom);

  //creating the steps array
  let step = [];
  step = step.concat(left);
  step = step.concat(right);
  steps.push(step);
  steps = steps.concat(lstep);
  steps = steps.concat(rstep);
  

  //iteratively compare and sort into newarr
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < left.length && j < right.length) {
    let leftnode = left[i];
    let rightnode = right[j];
    comp.push([leftnode,rightnode]);
    if (leftnode < rightnode) {
      newarr[k] = leftnode;
      i++;
      k++;
    } else {
      newarr[k] = rightnode;
      j++;
      k++;
    }
  }

  //rest of left arry
  while (i < left.length) {
    newarr[k] = left[i]
    i++;
    k++;
  }
  //rest of right array
  while (j < right.length) {
    newarr[k] = right[j];
    j++;
    k++;
  }

  return [newarr, comp, steps]
}

////////////////////////////Quick Sort///////////////////////////
// input: array, an unsorted array with no repeats
//        low, an int
//        high, an int 
// output: an int of the last
const partition = function (array, low, high) {
  let comp = [];
  let pivot = array[low];
  let i = low; let j = high;
  while (i < j) {
    while (array[i] <= pivot){
      i++;
      comp.push([array[i],pivot]);
    } 
    while (array[j] > pivot) {
      j--;
      comp.push([array[j],pivot]);
    }
    if (i<j) {
      let t = array[i];
      array[i] = array[j];
      array[j] = t;
    }
  }
  let t = array[low];
  array[low] = array[j];
  array[j] = t;
  return [j, comp]
}

// input: array, an unsorted array with no repeats
//        low, an int
//         high, an int
// returns: a sorted array, as well as a list of steps in sorting
const quicksort_helper = function (array,low,high, step, allcoms) {
  if (low < high) {
    step.push(array.map((x)=>x));

    let part = partition(array,low,high)
    let pivot = part.shift();

    let comps = part.shift();
    allcoms.push(comps);

    quicksort_helper(array, low,pivot, step, allcoms);
    quicksort_helper(array, pivot+1,high, step, allcoms);
  }
}

// input: array, an unsorted array with no repeats
// returns: a sorted array,a list of steps in sorting, and a list of comparisons
const Quicksort = function (array){
  let steps = [];
  let comps = [];
  quicksort_helper(array,0,array.length-1, steps, comps);
  return [array,comps, steps]
}

export {random_color, equiv, inobj, inarr, remove,remove1,remove2, SimpleGraph, WeightedGraph, BreadthFirstSearch, BreadthFirstSearchPaths, DepthFirstSearch,DepthFirstSearchPaths, BinarySearch, Mergesort, Quicksort};
