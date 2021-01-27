function focus() {
    Array.from(document.getElementsByTagName('input')).forEach(element => {
        element.addEventListener('focus', onFocus);
        element.addEventListener('blur', onBlur);
    });

    function onFocus(ev) {
        ev.target.parentNode.className = 'focused';
    }
    
    function onBlur(ev) {
        ev.target.parentNode.className = '';
    }
    
}