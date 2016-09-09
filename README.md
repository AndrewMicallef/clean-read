# clean-read

This is the first step in what I am calling **Project Lucidity**

![](https://cdn.meme.am/instances/500x/71482294.jpg)

The driving philosphy is to *Eschew Obfuscation and Enunciate Lucidity.*


#To install in firefox

Get it from the add-ons list here: https://addons.mozilla.org/en-US/firefox/addon/clean-read/

development versions:
In firefox address bar type: `about:debugging` 
- click `Load Temporary Add On` 
- select any file in directory


##TODO:

- Easy:
    - [ ] Think of a better name and come up with a logo (really not important)
    - [ ] Replace acronymns with expanded phrases
    - [ ] Make a toggle button for Firefox plugin
    - [X] Make a toggle switch to highlight what will be hidden to confirm we aren't 
          losing actual page content
    - [X] Make it actually do something when you install it
- Less Easy:
    - [X] Compress inline references
- Hard:
    - [ ] Graph inline numerical statements
    - [ ] Make a database which holds the type of Journal and the place to find the body text ?
    - [ ] Alternativley (bad) allow the user to select paragraphs to be filtered
            (I don't like that solution as it increases the transaction cost for 
            the user and makes them less likely to want to lucidify the text)


---
##Mechanism of action

The basic principle is this program grabs all text nested under the HTML p (for paragraph) tags, removes all other markup, and then searches for patterns matching the "Bracket, ((name, comma,) x I date) x J, close Bracket" format.

This is not a robust look up, and have already found it fails on a few sites. Good nes is that you can bring back the content by reloading the page. Bad news is you have to reload the page


### A Better idea:

Query: [the style repository](https://www.zotero.org/styles) for the journal name, use the resulting .csl file to build an appropriate regex pattern!!!!

---

Regex pattern to capture name dates:
`(([a-z]*[;&,\s]){1,} (\d{4}))`

... Because I need to be able to use any unicode letter for peoples names,
and regex in Mozilla does not support the `\p{L}` character lookup, which
in PERL would get a letter from any language, I will need to find a different
more complex strategy...

