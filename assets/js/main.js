//A C C O R D I O N

const accordion = document.getElementsByClassName('accordion_box');
console.log(accordion)
for (i = 0; i<accordion.length; i++){
    accordion[i].addEventListener('click',function(){
        this.classList.toggle('active');
    })
}
//M E N U
const primaryNav=document.querySelector(".mobile_menu");
const navToggle=document.querySelector(".mobile_toggle")

navToggle.addEventListener("click",()=>{
  const visibility=primaryNav.getAttribute("data-visible")
  if(visibility==="false"){
    primaryNav.setAttribute("data-visible",true);
    navToggle.setAttribute("aria-expanded",true)
  }else if(visibility==="true"){
    primaryNav.setAttribute("data-visible",false)
    navToggle.setAttribute("aria-expanded",false)
  }
})
//SLIDE
const header = document.querySelector("header");
const sectionOne = document.querySelector(".home-intro");
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");


const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
  };

  
const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);
  
  
  sliders.forEach(slider => {
    appearOnScroll.observe(slider);
  });
   faders.forEach(fader=>{
    appearOnScroll.observe(fader);
   })
//C A R O U S E L

//S L I D  E
const track =document.querySelector(".slider_track");
if(track){
  var slides =Array.from(track.children);
  console.log(slides)
}


const nextButton = document.querySelector(".slider_right");
const prevButton =document.querySelector(".slider_left");
const dotsNav=document.querySelector(".slider_nav");

if(dotsNav){
  var dots =Array.from(dotsNav.children);
  console.log(dots)
}


const slideWidth=slides[0].getBoundingClientRect().width;

/* slides[0].style.left=slideWidth * 0 + "px";
slides[1].style.left=slideWidth * 1 + "px";
slides[2].style.left=slideWidth * 2 + "px"; */

const setSlidePosition = (slide,index)=>{
    slide.style.left=slideWidth*index + 'px';
}
slides.forEach(setSlidePosition);
console.log(slides)
console.log(setSlidePosition)

const moveToSlide =(track,currentSlide,targetSlide)=>{
  console.log(targetSlide.style.left)
    track.style.transform='translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove("current_slide");
    targetSlide.classList.add("current_slide");
}

const updateDots=(currentDot,targetDot)=>{
    currentDot.classList.remove("current_slide");
    targetDot.classList.add("current_slide")
}
const hideShowArrows=(slides,prevButton,nextButton,targetIndex)=>{
  console.log(targetIndex)
    if(targetIndex===0){
        prevButton.classList.add("is_hidden")
        nextButton.classList.remove("is_hidden")
    }else if(targetIndex === slides.length-3){
        prevButton.classList.remove("is_hidden");
        nextButton.classList.add("is_hidden")
    }else{
        prevButton.classList.remove("is_hidden")
        nextButton.classList.remove("is_hidden")
    }
}
prevButton.addEventListener("click",e=>{
    const currentSlide=track.querySelector(".current_slide");
    const prevSlide=currentSlide.previousElementSibling;
    const currentDot=dotsNav.querySelector(".current_slide");
    const prevDot=currentDot.previousElementSibling;
    const prevIndex=slides.findIndex(slide=>slide===prevSlide)
    moveToSlide(track,currentSlide,prevSlide)
    console.log(currentSlide)
    updateDots(currentDot,prevDot)
    hideShowArrows(slides,prevButton,nextButton,prevIndex)
})

nextButton.addEventListener("click",e=>{
    
    for(i=0;i<2;i++){
      var currentSlide=track.querySelector(".current_slide")
      var nextSlide= currentSlide.nextElementSibling;
    }
    
    const currentDot = dotsNav.querySelector(".current_slide")
    const nextDot = currentDot.nextElementSibling;
    const nextIndex=slides.findIndex(slide=>slide===nextSlide)
    console.log(nextSlide)
    moveToSlide(track,currentSlide,nextSlide)
    updateDots(currentDot,nextDot)
    hideShowArrows(slides,prevButton,nextButton,nextIndex)
})

dotsNav.addEventListener("click",e=>{
  console.log(e.target)
    const targetDot = e.target.closest("button");
    if(!targetDot) return;
    const currentSlide=track.querySelector(".current_slide");
    const currentDot= dotsNav.querySelector(".current_slide")
    const targetIndex = dots.findIndex(dot =>dot === targetDot);
    const newTarget = targetIndex 
    const targetSlide=slides[newTarget];
    console.log(newTarget)
    console.log(targetSlide)
    moveToSlide(track,currentSlide,targetSlide)

    updateDots(currentDot,targetDot)
    hideShowArrows(slides,prevButton,nextButton,targetIndex)
})

