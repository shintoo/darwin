let tree
let node
let svg

function createTree() {
  if (typeof window !== "undefined") {
  // ************** Generate the tree diagram	 *****************
    const margin = {top: 0, right: 120, bottom: 20, left: 120}
  	 const width = 1500 - margin.right - margin.left
  	 const height = 900 - margin.top - margin.bottom
	
    tree = d3.layout.tree()
    	.size([height, width])

    node = document.createElement("div")
    svg = d3.select(node).append("svg")
    	.attr("width", width + margin.right + margin.left)
    	.attr("height", height + margin.top + margin.bottom)
      .append("g")
    	.attr("transform", 
    	      "translate(" + margin.left + "," + margin.top + ")")
 
    return node
  }
  return null
}

function updateTree(treeData) {
  // Compute the new tree layout
  let nodes = tree.nodes(treeData[0]).reverse(),
	  links = tree.links(nodes)

  // Normalize for fixed-depth
  nodes.forEach(function(d) { d.y = d.depth * 140 + 50 });

  let i = 0

  // Declare the nodes
  let node = svg.selectAll("g.node")
	  .data(nodes, d => d.id || (d.id = ++i) );

  // Enter the nodes
  let nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")" });

  // Add node image fobject
  let fo = nodeEnter.append("svg:foreignObject")
      .attr("width", "100px")
      .attr("height", "150px")
      .attr("x", "-50px")
      .attr("y", "-75px")

   // Flex container in a node
   let nodeContainer = fo.append("xhtml:div")
      .style("border-radius", "50px 50px 10px 10px")
//      .style("border-radius", "10px")
      .style("box-shadow", "0 2px 5px 2px rgba(120, 120, 120, 0.15)")
      .style("margin", "10px")
      .style("background", "#fff")
      .style("padding", "5px")
      .style("display", "flex")
      .style("flex-direction", "column")
      .style("align-items", "center")
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .style("padding-bottom", "0.5em")

   // Node icon in flex container
   let nodeImage = nodeContainer.filter(d => d.icon)
      .append("xhtml:img")
      .attr("src", d => d.icon)
      .style("border-radius", "50%")
      .style("height", "75px")
      .style("width", "75px")

 
   let nodeCircle = nodeContainer.filter(d => !d.icon)
      .append("xhtml:div")
      .style("height", "75px")
      .style("width", "75px")
      .style("box-sizing", "border-box")
      .style("border-radius", "50%")
      .style("background", "#B8E6B8")
      .style("border-width", "2px")
      .style("border-color", "green")

   let nodeLabel = nodeContainer.append("p")
      .style("font", "8px 'Arial'")
      .style("color", "#000")
      .style("width", "50px")
      .style("height", "30px")
      .style("background-color", "#ffdaff")
      .style("color", "#00f")
      .style("text-align", "center")
      .html("memessss")

  // Declare the links
  let link = svg.selectAll("path.link")
	  .data(links, d => d.target.id );

  let diagonal = d3.svg.diagonal()
  	.projection(d => [d.x, d.y] );

  let line = d3.svg.line()
   .x(d => d.x)
   .y(d => d.y)

  // Enter the links
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .style("stroke", "#c2c2c2")
   .style("fill", "none")
   .style("stroke-width", 2)
//   .attr("d", d => line([d.source, d.target]))
   .attr("d", diagonal) // curvy diagonal lines

}

export {createTree, updateTree}
