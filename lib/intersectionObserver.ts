export default function animateOnShow(){
    const ob = document.querySelectorAll(".observe");
    let observer = new IntersectionObserver((entry)=>{
        if(entry[0].isIntersecting){   
            entry[0].target.classList.add("hero-text")
            observer.unobserve(entry[0].target);
        }
    }, {
        threshold : 0,
        rootMargin: "0px 0px -200px 0px",
    });
    ob.forEach(el=>(observer.observe(el)));
}