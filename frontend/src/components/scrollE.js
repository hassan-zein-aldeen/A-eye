// import { useEffect } from "react";

// export const useScrollEffect = (ref) => {
//   useEffect(() => {
//     const text = ref.current.querySelector('.title2');
//     const section = ref.current.querySelector('.section2');
//     const cc = ref.current.querySelector('.iconcard2');
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const sectionTop = section.getBoundingClientRect().top;
//       const sectionBottom = section.getBoundingClientRect().bottom;
//       const sectionHeight = section.offsetHeight;
//       const textHeight = text.offsetHeight;
//       if (sectionTop < (window.innerHeight) && sectionBottom >= (window.innerHeight)) {
//         const maxTranslateY = (sectionHeight - textHeight) / 2;
//         const scrollPercentage = (sectionHeight - scrollPosition) / sectionHeight;
//         let translateY = ((textHeight + 500) * scrollPercentage) * 0.7; // speed of scrolling for items
//         translateY = Math.min(translateY, maxTranslateY);
//         translateY = Math.max(translateY, -60);
//         text.style.transform = `translateY(${translateY + 100}px)`; //original position
//         cc.style.transform = `translateY(${translateY - 30}px)`; // original position
//         cc.classList.add('show');
//         section.classList.add('show');
//       } else {
//         section.classList.remove('show');
//         cc.classList.remove('show');
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [ref]);
// };