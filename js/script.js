document.addEventListener('DOMContentLoaded', function() {
    initThemeChanger();
    initTypedEffect();
    initPinwheel();
    initializeCarouselFocus();

});

function initThemeChanger() {
    const themeChanger = document.getElementById('theme-changer');
    themeChanger.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    });
}

function initTypedEffect() {
    new Typed('#typed', {
        strings: ['Tech Enthusiast.', 'Software Developer.', 'Technical Writer.', 'IT Technologist.', 'Electronics Engineer.'],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
    });
}

function initPinwheel() {
    const pinwheelContainer = document.getElementById('pinwheelContainer');
    if (!pinwheelContainer) return;

    const skillsData = {
        'Software Development': ['C', 'C++', 'Python', 'JavaScript', 'C#', 'HTML', 'CSS'],
        'Networking & Cybersecurity': ['Cisco Technologies', 'Security Protocols', 'Wireshark', 'VPN Configurations', 'Packet Tracer'],
        'Cloud Technologies': ['AWS', 'Google Cloud Platform', 'VMware', 'Virtual Box'],
        'Engineering': ['Microcontrollers: Raspberry Pi, Arduino, FreedomK64, ESP32', 'Electronic Circuit Design', 'PCB Soldering and Circuit Making', 'Devices - LabJack, Oscilloscope, Signal Generator, Multimeter', 'Embedded Systems and Simulations', 'Radio Frequency and Wireless Communications'],
        'Software Proficiency': ['MyApps - Apps Anywhere Suite', 'Adobe CC Suite - All Apps', 'Microsoft365 Suite - All Apps', 'FileZilla', 'OrCAD', 'PADS', 'Visual Studio', 'Putty', 'Visio', 'MCUExpresso'],
        'Cybersecurity': ['Software Testing', 'Kali Linux', 'Firewall Configurations'],
        'Database Management': ['SQL', 'MS Access', 'MySQL', 'Oracle Database'],
        'Operating Systems': ['Windows', 'MAC', 'Android', 'IOS', 'Fedora', 'Linux', 'RaspberryPi OS', 'Kali', 'Ubuntu', 'MbedOS', 'PhoenixOS', 'ChromeOS']
    };
    Object.entries(skillsData).forEach(([skill, details], index, arr) => {
        const angle = (index / arr.length) * 2 * Math.PI;
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.textContent = skill;
        bubble.style.transform = `translate(${Math.cos(angle) * 200}px, ${Math.sin(angle) * 200}px)`;

        bubble.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.3)';
        });
        bubble.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.3)', '');
        });

        bubble.addEventListener('click', () => showSkillsModal(skill, details));
        pinwheelContainer.appendChild(bubble);
    });
}

function showSkillsModal(skill, details) {
    closeSkillsModal();

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    const modal = document.createElement('div');
    modal.className = 'skill-modal';
    modal.innerHTML = `<span class="skill-modal-close">&times;</span><h3 class="skill-name">${skill}</h3><ul class="skill-list">${details.map(detail => `<li>${detail}</li>`).join('')}</ul>`;
    document.body.appendChild(modal);

    overlay.style.display = 'block';
    modal.style.display = 'block';

    document.querySelector('.skill-modal-close').addEventListener('click', closeSkillsModal);
    overlay.addEventListener('click', closeSkillsModal);
}

function closeSkillsModal() {
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.skill-modal');
    if (overlay) overlay.remove();
    if (modal) modal.remove();
}

function rotateCarousel(clickedProject) {
    const carousel = document.getElementById('projects-carousel');
    const projects = Array.from(carousel.children);
    const focusedIndex = projects.findIndex(p => p.classList.contains('focused'));
    const clickedIndex = projects.indexOf(clickedProject);

    const direction = clickedIndex > focusedIndex ? 'right' : 'left';
    const steps = Math.abs(clickedIndex - focusedIndex);

    for (let i = 0; i < steps; i++) {
        if (direction === 'right') {
            carousel.appendChild(carousel.firstElementChild); // Move first to last
        } else {
            carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild); // Move last to first
        }
    }

    // Update focused class
    projects.forEach(p => p.classList.remove('focused'));
    clickedProject.classList.add('focused');

    // Update visibility of projects
    updateProjectVisibility();
}

function initializeCarouselFocus() {
    const carousel = document.getElementById('projects-carousel');
    const projects = Array.from(carousel.children);

    // Ensure only the middle project is initially focused.
    // If there are more or less than 3 projects, adjust accordingly.
    if (projects.length >= 3) {
        projects.forEach((project, index) => {
            project.classList.remove('focused');
            project.classList.add('hidden'); // Hide initially
        });

        // Focus the middle project and make sure it's visible along with its immediate neighbors.
        const middleIndex = Math.floor(projects.length / 2);
        projects[middleIndex].classList.add('focused');
        projects[middleIndex].classList.remove('hidden');
        projects[middleIndex - 1].classList.remove('hidden');
        projects[middleIndex + 1].classList.remove('hidden');
    }

    // Initial update for project visibility
    updateProjectVisibility();
}

function updateProjectVisibility() {
    const carousel = document.getElementById('projects-carousel');
    const projects = Array.from(carousel.children);
    const focusedIndex = projects.findIndex(p => p.classList.contains('focused'));

    projects.forEach((project, index) => {
        project.classList.add('hidden'); // Hide initially
        // Show the focused project and its immediate neighbors
        if (index === focusedIndex || index === focusedIndex - 1 || index === focusedIndex + 1) {
            project.classList.remove('hidden');
        }
    });
}