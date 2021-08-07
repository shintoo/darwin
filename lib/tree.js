let tree
let node
let svg
let deleteNode

function createTree(delNode, x, y, width, height, nodeCount) {
  if (typeof window !== "undefined") {
  // ************** Generate the tree diagram	 *****************
    const margin = {top: 120, right: 20, bottom: 20, left: 0}
  	 const width = 1627 - margin.right - margin.left
  	 const height = 1200 - margin.top - margin.bottom
	
    tree = d3.layout.tree()
    	.size([height, width])
      .nodeSize([85, 0])
      .separation((a, b) => 2.2)//a.parent == b.parent ? 2 : 2)

    node = document.createElement("div")
    svg = d3.select(node).append("svg")
    	.attr("width", width + margin.right + margin.left)
    	.attr("height", height + margin.top + margin.bottom)
      .append("g")
    	.attr("transform", 
    	      "translate(" + x + "," + y + ")")
      .attr("viewBox", "0 0 500 500")
        .classed("svg-content-responsive", true)


    deleteNode = delNode

    return node
  }
  return null
}

function updateTree(treeData) {
  // Compute the new tree layout
  let nodes = tree.nodes(treeData[0]).reverse(),
	  links = tree.links(nodes)

  // Normalize for fixed-depth
  nodes.forEach(function(d) { d.y = (d.depth * 150 + 90)});

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
//      .style("border-radius", "10px 10px 10px 10px")
//      .style("border-radius", "10px")
//      .style("box-shadow", "0 2px 5px 2px rgba(120, 120, 120, 0.15)")
      .style("margin", "10px")
//      .style("background", "#fff")
      .style("padding", "5px")
      .style("display", "flex")
      .style("flex-direction", "column")
      .style("align-items", "center")
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .style("padding-bottom", "0.5em")

   // Node icon in flex container
   let nodeImage = nodeContainer
      .append("xhtml:img")
      .attr("src", d => d.icon || "https://d29fhpw069ctt2.cloudfront.net/icon/image/49053/preview.svg")
      .style("background", d => d.linkColor || "white")
      .attr("draggable", "false")
      .style("border-radius", "50%")
      .style("border", "4px solid")
      .style("border-color", d => d.linkColor || "white")
      .style("box-shadow", "0 5px 10px 2px rgba(120, 120, 120, 0.4)")
      .style("box-sizing", "border-box")
      .style("height", "75px")
      .style("width", "75px")
      .on("click", d => d.children ? null : deleteNode(d.id))
/* 
   let nodeCircle = nodeContainer.filter(d => !d.icon)
      .append("xhtml:div")
      .style("height", "75px")
      .style("width", "75px")
      .style("border-radius", "50%")
      .style("background", "#B8E6B8")
      .style("border", "4px solid white")
      .style("box-shadow", "0 5px 10px 2px rgba(120, 120, 120, 0.4)")
      */
   // TODO remove when nodeLabel is working
   let nodeText = nodeEnter.append("text")
    .attr("y", d => d.children ? "-70px" : "40px")
      .attr("x", "0")
      .attr("text-anchor", "middle")
      .attr("user-select", "none")
      .text(d => d.name)


   let nodeTextBg = nodeEnter.append("rect")
      .attr("rx", "20")
      .attr("background", "white")


//   let nodeLabel = nodeContainer.append("p")
//      .style("font", "8px 'Arial'")
//      .style("color", "#000")
//      .style("width", "50px")
//      .style("height", "30px")
// debug      .style("background-color", "#ffdaff")
//      .style("color", "#00f")
//      .style("text-align", "center")
//      .html("foo")


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
    .style("stroke", d => d.linkColor || "#e2e2e2")
   .style("fill", "none")
   .style("stroke-width", 2)
//   .attr("d", d => line([d.source, d.target]))
   .attr("d", diagonal) // curvy diagonal lines

}

export {createTree, updateTree}
