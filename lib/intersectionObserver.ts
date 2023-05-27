export default function animateOnShow(){
    const ob = document.querySelectorAll(".observe");
    let observer = new IntersectionObserver((entry)=>{
        if(entry[0].isIntersecting){   
            entry[0].target.classList.add("sect-tran")
            observer.unobserve(entry[0].target);
        }
    }, {
        threshold : 0.2
    });
    ob.forEach(el=>(observer.observe(el)));
}