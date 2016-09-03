//http://stackoverflow.com/a/31369978

function highlight(element, regex) {
    var document = element.ownerDocument;
    
    var nodes = [],
        text = "",
        node,
        nodeIterator = document.createNodeIterator(element, NodeFilter.SHOW_TEXT, null, false);
        
    while (node = nodeIterator.nextNode()) {
        nodes.push({
            textNode: node,
            start: text.length
        });
        text += node.nodeValue
    }
    
    if (!nodes.length)
        return;

    var match;
    while (match = regex.exec(text)) {
        var matchLength = match[0].length;
        
        // Prevent empty matches causing infinite loops        
        if (!matchLength)
        {
            regex.lastIndex++;
            continue;
        }
        
        for (var i = 0; i < nodes.length; ++i) {
            node = nodes[i];
            var nodeLength = node.textNode.nodeValue.length;
            
            // Skip nodes before the match
            if (node.start + nodeLength <= match.index)
                continue;
        
            // Break after the match
            if (node.start >= match.index + matchLength)
                break;
            
            // Split the start node if required
            if (node.start < match.index) {
                nodes.splice(i + 1, 0, {
                    textNode: node.textNode.splitText(match.index - node.start),
                    start: match.index
                });
                continue;
            }
            
            // Split the end node if required
            if (node.start + nodeLength > match.index + matchLength) {
                nodes.splice(i + 1, 0, {
                    textNode: node.textNode.splitText(match.index + matchLength - node.start),
                    start: match.index + matchLength
                });
            }
            
            // Highlight the current node
            var spanNode = document.createElement("span")
            spanNode.className = "highlight";
            
            
            
            node.textNode.parentNode.replaceChild(spanNode, node.textNode)
            spanNode.appendChild(node.textNode)
            
            spanNode.style.display = 'none';
            
        }
    }
}

var sections = document.querySelectorAll("p[class*='section']");
var regex = new RegExp('\\(.*?\\)', "g");


[].forEach.call(sections, function(sections) {
  // do whatever
    highlight(sections, regex);
    
  
});
