// Scroll Progress Bar
window.onscroll = function () { myFunction() };

function myFunction() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  let myBar = document.getElementById("myBar");
  if (myBar) {
    myBar.style.width = scrolled + "%";
  }
};

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
      });
    });
  }

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.innerText = 'Sending...';
      btn.disabled = true;

      // Collect form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Use FormSubmit.co via Fetch API
      fetch('https://formsubmit.co/ajax/mirsayeful367@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === "false" || data.success === false) {
            throw new Error('Form submission failed');
          }
          alert('Message sent successfully!');
          contactForm.reset();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Something went wrong. Please try again or email directly.');
        })
        .finally(() => {
          btn.innerText = originalText;
          btn.disabled = false;
        });
    });
  }
});