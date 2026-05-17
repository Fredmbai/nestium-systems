// Typing animation for form inputs
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Contact form submission — opens email client pre-filled to nestiumsystems@gmail.com
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim() || 'Project Inquiry';
    const message = document.getElementById('message').value.trim();
    const btn     = document.getElementById('submitBtn');
    const status  = document.getElementById('formStatus');

    if (!name || !email || !message) {
        status.textContent = '⚠ Please fill in all required fields.';
        status.className = 'form-status form-status--error';
        return;
    }

    const mailSubject = `[Nestium Systems] ${subject} — from ${name}`;
    const mailBody =
        `Hello Fredrick,\n\n` +
        `You have a new message via the Nestium Systems contact form.\n\n` +
        `──────────────────────────\n` +
        `Name:    ${name}\n` +
        `Email:   ${email}\n` +
        `Subject: ${subject}\n` +
        `──────────────────────────\n\n` +
        `${message}\n\n` +
        `──────────────────────────\n` +
        `Sent via nestium.systems`;

    const mailto = `mailto:nestiumsystems@gmail.com` +
        `?subject=${encodeURIComponent(mailSubject)}` +
        `&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailto;

    // UI feedback
    btn.textContent = 'EMAIL CLIENT OPENING…';
    btn.disabled = true;
    status.textContent = '✓ Your email app should open with the message pre-filled. Just hit Send!';
    status.className = 'form-status form-status--success';

    setTimeout(() => {
        btn.textContent = 'TRANSMIT MESSAGE';
        btn.disabled = false;
        this.reset();
        setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 2000);
    }, 4000);
});

// Channel icon hover effects
document.querySelectorAll('.channel').forEach(channel => {
    channel.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.channel-icon');
        if (icon) icon.style.transform = 'scale(1.15) rotate(-5deg)';
    });
    channel.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.channel-icon');
        if (icon) icon.style.transform = '';
    });
});
