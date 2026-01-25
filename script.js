// Navigation Background Shift on Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Dynamic Number Counter Animation
const runCounter = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', ''); // Clean existing text
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

// Intersection Observer for Section Reveals
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Trigger counter only when stats section enters view
            if (entry.target.id === 'stats') {
                runCounter();
            }
            // Once visible, we can stop observing this element
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with 'reveal' class and the stats section
document.querySelectorAll('.reveal, #stats').forEach(el => {
    observer.observe(el);
});

// Form Submission Mockup
const agriForm = document.getElementById('agriForm');
if(agriForm) {
    agriForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = agriForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = "Sending Inquiry...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        // Simulate network delay
        setTimeout(() => {
            alert("Thank you! Your message has been sent to Green Hill Crop Science. A representative will contact you shortly.");
            submitBtn.innerText = originalText;
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
            agriForm.reset();
        }, 1800);
    });
}
