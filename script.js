const slideContainer = document.querySelector('.slider-container'),
    slideElements = Array.from(document.querySelectorAll('.slide-element'));

let isDragging = false, startPos = 0, currentTranslate = 0, previousTranslate = 0, animationID = 0, currentIndex = 0;

slideElements.forEach((slide, index) => {

    slide.querySelector('img').addEventListener('dragstart', e => e.preventDefault())

    // Touches Events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    // Mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove);

})

window.oncontextmenu = e => e.preventDefault() + e.stopPropagation();

function touchStart(index) {
    return function (e) {
        currentIndex = index;
        startPos = getPositionX(e);
        isDragging = true;
        animationID = requestAnimationFrame(animation)
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID)
    const movedBy = currentTranslate - previousTranslate;
    if(movedBy < -100  && currentIndex < slideElements.length -1 ) currentIndex += 1;
    if(movedBy > 100  && currentIndex > 0 ) currentIndex -= 1;
    setPositionByIndex()
    console.log([currentIndex, currentTranslate,previousTranslate]);
}


function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
    currentTranslate = previousTranslate + currentPosition - startPos
    }
}


function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX :  event.touches[0].clientX;
}



function animation(){
    setSliderContainer()
    if (isDragging) requestAnimationFrame(animation)
}


function setSliderContainer () {
    slideContainer.style.transform = `translateX(${currentTranslate}px) `
}
function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    previousTranslate = currentTranslate;
    setSliderContainer()
}
