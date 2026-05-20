// script.js — interactions and scroll reveal for FNIC Interior
document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Set copyright year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth offset for anchors when header is sticky
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({top, behavior:'smooth'});
        // close mobile nav
        if(nav.classList.contains('open')){nav.classList.remove('open');navToggle.classList.remove('open');}
      }
    })
  });

  // Scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const obsOptions = {threshold:0.08};
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    })
  }, obsOptions);
  reveals.forEach(r => observer.observe(r));

  // Simple contact form handler (placeholder)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(!name || !email || !message){
        alert('Please complete all fields before sending.');
        return;
      }
      // Here you would submit to your server. For demo, show confirmation.
      form.reset();
      alert('Thanks! Your message has been sent. We will contact you shortly.');
    });
  }
});
