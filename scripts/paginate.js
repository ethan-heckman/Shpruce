function paginate() {
    // Word uses the equivalent of 816x1056 for page dimensions. 1056 - 96(2) = 864px of content
    const contentHeight = 864;
    const gap = 240;
    const content = quill.root.children

    // let offset = 0; 
    let next = contentHeight;

    let a = Array.from(content);
    a.forEach(function(el) {
        el.style.marginTop = ``;
        
        // const pageStart = (Math.floor(el.offsetTop / contentHeight)) * contentHeight + offset * Math.floor(el.offsetTop / contentHeight); 
        // const remains = contentHeight - (el.offsetTop % contentHeight);

        // if(el.offsetTop % contentHeight > contentHeight - el.offsetHeight) {
        //     el.style.marginTop = `${remains + gap + 96}px`;
        //     offset++;
        // }

        if(el.offsetTop + el.offsetHeight > next) {
            el.style.marginTop = `${gap}px`;
            next += contentHeight + gap;
        }
    });
}
paginate();
quill.on(`text-change`,paginate);
