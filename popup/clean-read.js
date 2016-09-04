//http://stackoverflow.com/a/31369978

function highlight(element, regex) {
    var document = element.ownerDocument;
    
    // ?
    var nodes = [],
        text = "",
        node,
        nodeIterator = document.createNodeIterator(element, NodeFilter.SHOW_TEXT, null, false);
    
    // results in a string that contains all the nodes text minus markup.
    while (node = nodeIterator.nextNode()) {
        nodes.push({
            textNode: node,
            start: text.length
        });
        text += node.nodeValue
    }

   // break if no text? 
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
            
            // hide the current node
            var spanNode = document.createElement("span")
            spanNode.className = "hide";
            
            
            
            node.textNode.parentNode.replaceChild(spanNode, node.textNode)
            spanNode.appendChild(node.textNode)
            
            spanNode.style.display = 'none';
            
        }
    }
}

// the section works on Science Direct....
// TO DO: find a robust method to do this
// TO DO: [easier] create a database of methods for specific journals
// perhaps I could just use any `p` section, and hope that the sites use `p` to
// refer to what it ought to, ie paragraph...

var sections = document.querySelectorAll("p[class*='section']");
var regex = /\(([^\d]*?, \d{4},?)+?\)/igm;

// This section loops through all the `sections`
// highlight applies the regex to the text and adds all matches to the class
// `hide`. Class hide gets the display = none, style attribute.
[].forEach.call(sections, function(sections) {
  // do whatever
    highlight(sections, regex);
    
});


// this doesn't work
var css = '.hide:hover{ display: inline }';
style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);