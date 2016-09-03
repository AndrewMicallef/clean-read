# clean-read
---

This is the first step in what I am calling **Project Lucidity**

![](https://cdn.meme.am/instances/500x/71482294.jpg)

The driving philosphy is to *Eschew Obfuscation and Enunciate Lucidity.*

##TODO:
- Easy:

    - [ ] Replace acronymns with expanded phrases
- Less Easy:
    - [ ] Compress inline references
- Hard:
    - [ ] : Graph inline numerical statements


---

Regex pattern to capture name dates:
`(([a-z]*[;&,\s]){1,} (\d{4}))`

... Because I need to be able to use any unicode letter for peoples names,
and regex in Mozilla does not support the `\p{L}` character lookup, which
in PERL would get a letter from any language, I will need to find a different
more complex strategy...

---
#To install

`about:debugging` -> Load Temporary Add On -> any file in directory



## `hide refs on Science Direct`

```{.CSS}

a[id*='bib'][class = 'intra_ref'] {
    display: none;
}
```

appending this to the css of a science direct article sort of works; 
it takes the bibliographic references and hides them, but leaves blank space. 
A better solution would be to replace with greyed brackets, ie: 
<span style="color: silver">(...)</span>, which expand when mouse rollovers, to reveal the
links.

Even better would be to have the links appear in a list, clicking on each one
would take you to the web address of the publication.
