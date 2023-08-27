gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("body"),
  smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("body", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  
pinType: document.querySelector("body").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();




// var mouse = document.querySelector('.mouse-pointer')
// var mouseBg = document.querySelector('.mouse-pointer-bg')
// document.addEventListener('mousemove', function(dets){
//     mouse.style.transition = '0.17s all linear'
//     mouseBg.style.transition = '0.2s all linear'
//     mouse.style.left = dets.x+"px"
//     mouse.style.top = dets.y+"px"
//     mouse.style.opacity = 1
//     mouseBg.style.left = dets.x-125+"px"
//     mouseBg.style.top = dets.y-125+"px"
//     mouseBg.style.opacity = 0.3
// })


var timeline = gsap.timeline()


timeline.from('.banner-section', {
    opacity: 0,
    duration: 0.6,
    delay: 0.5,
})
gsap.to('.banner-bg',{
    scale: 2,
    scrollTrigger: {
        scrub: 2
    }
})

gsap.to('.bush-left',{
    opacity: 0,
    x: '-50%',
    duration: 2,

    scrollTrigger: {
        trigger: '.bush-left',
        scroller: 'body',
        start: "top 55%",
        end: "bottom bottom",
        scrub: 4
    }
})
gsap.to('.bush-right',{
    opacity: 0,
    x: '50%',
    duration: 2,
    scrollTrigger: {
        trigger: '.bush-right',
        scroller: 'body',
        start: "top 55%",
        end: "bottom bottom ",
        scrub: 4
    }
})

timeline.from('nav .navbar-brand, nav .nav-items li, nav .nav-actions li',{
    opacity: 0,
    y: -100,
    duration: 0.5,
    stagger: 0.1
});

gsap.to('header',{
    backgroundColor: '#191919',
    padding: '5px 0',
    duration: 0.7,
    scrollTrigger: {
        trigger: 'header',
        scroller: 'body',
        start: 'top -10%',
        end: 'end -15%',
        scrub: true
    }
})

timeline.from('.contents h1', {
    opacity: 0,
    duration: 0.7,
    delay: 0.2,
});

timeline.from('.contents h2', {
    opacity: 0,
    duration: 0.7,
    delay: 0.2,
})


gsap.to('.contents .get-ready', {
    scale: 1.1,
    duration: 0.5,
    scrollTrigger:{
        trigger: '.contents .get-ready', 
        scroller: 'body',
        start: "top 30%",
        end: "top 5%",
        scrub: 2,
    }
})
gsap.to('.contents .alone', {
    scale: 0.9,
    duration: 0.5,
    scrollTrigger:{
        trigger: '.contents .alone',
        scroller: 'body',
        start: "top 40%",
        end: "top 5%",
        scrub: 2,
    }
})

timeline.from('.banner-img-item-1, .banner-img-item-2, .banner-img-item-3', {
    opacity: 0,
    duration: 0.7,
    delay: 0.5,
    stagger: 0.2,

})
timeline.from('.get-started', {
    opacity: 0,
    duration: 0.7,
    delay: 0.5,
})

gsap.to('.get-started', {
    y: 10,
    repeat: -1,
    duration: 2,
    yoyo: true
})

gsap.to('.banner-img-item-1', {
    x: 15,
    repeat: -1,
    duration: 2,
    yoyo: true
})
gsap.to('.banner-img-item-2', {
    x: -15,
    repeat: -1,
    duration: 2,
    yoyo: true
})
gsap.to('.banner-img-item-3', {
    y: 15,
    repeat: -1,
    duration: 2,
    yoyo: true
})

gsap.to('.training-section h2',{
    transform: 'translateX(-120%)',
    duration: 2,
    scrollTrigger:{
        trigger: '.training-section h2',
        scroller: 'body',
        start: 'top 60%',
        end: '+=40%',
        scrub: 2,
        pin: true   
    }
})

gsap.to('.about-us-section .about-bg',{
    clipPath: 'inset(0%)',
    scrollTrigger:{
        trigger: '.about-us-section .about-bg',
        scroller: 'body',
        start: 'top 50%',
        end: '+=10%',
        scrub: 2,
    }
})

gsap.to('.about-us-section h2',{
    textShadow: '7px 7px 0px #26d184',
    scrollTrigger:{
        trigger: '.about-us-section h2',
        scroller: 'body',
        start: 'top 90%',
        end: '+=100%',
        scrub: 2,
    }
})
gsap.to('.training-programs-section h2',{
    textShadow: '10px 10px 0px #26d184',
    scrollTrigger:{
        trigger: '.training-programs-section h2',
        scroller: 'body',
        start: 'top 100%',
        end: '+=100%',
        scrub: 2,
    }
})
gsap.from('.training-programs-section .training-program.active .program-contents',{
    bottom: -200,
    opacity: 0,
    scrollTrigger:{
        trigger: '.training-programs-section .training-program.active .program-contents',
        scroller: 'body',
        start: 'top 101%',
        end: '+=1',
        scrub: 2,
    }
})

gsap.to('.our-stories-section h2',{
    textShadow: '10px 10px 0px #26d184',
    scrollTrigger:{
        trigger: '.our-stories-section h2',
        scroller: 'body',
        start: 'top 70%',
        end: '+=100%',
        scrub: 2,
    }
})

gsap.to('.contact-us-section h2',{
    textShadow: '10px 10px 0px #26d184',
    scrollTrigger:{
        trigger: '.contact-us-section h2',
        scroller: 'body',
        start: 'top 70%',
        end: '+=100%',
        scrub: 2,
    }
})
