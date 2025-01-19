function toggleVisibility(){
    var content=document.querySelector('.content');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block'; 
    } else {
        content.style.display = 'none'; 
    }
}
