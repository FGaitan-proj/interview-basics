/*
Functions that are written in their respective title as well as 
functions that aid in explanation
*/ 

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

export {BreadthFirstSearch, BreadthFirstSearchPaths, DepthFirstSearch,DepthFirstSearchPaths, BinarySearch, Mergesort, Quicksort};