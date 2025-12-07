document.addEventListener("DOMContentLoaded", () => {
    const scrollUpBtn = document.getElementById("scrollTopBtn");
    const scrollDownBtn = document.getElementById("scrollDownBtn");
    const sections = Array.from(document.querySelectorAll("section"));
    const offsetMap = { "competences": 130 }; 
    const defaultOffset = 30;

    function getOffset(sectionId) {
        return offsetMap[sectionId] || defaultOffset;
    }

    function updateActiveSection() {
        const scrollMiddle = window.scrollY + window.innerHeight / 2;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            section.classList.toggle("active", scrollMiddle >= sectionTop && scrollMiddle <= sectionBottom);
        });
    }

    function toggleScrollButtons() {
        scrollUpBtn.classList.toggle("show", window.scrollY > 300);
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollDownBtn.classList.toggle("show", window.scrollY < scrollableHeight - 10);
    }

    window.addEventListener("scroll", () => {
        toggleScrollButtons();
        updateActiveSection();
    });

    updateActiveSection();

    scrollUpBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    scrollDownBtn.addEventListener("click", () => {
        const currentScroll = window.scrollY;
        const nextSection = sections.find(sec => sec.offsetTop > currentScroll + 140);
        if (!nextSection) return;
        const scrollTarget = nextSection.offsetTop - getOffset(nextSection.id);
        window.scrollTo({ top: scrollTarget, behavior: "smooth" });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;
            e.preventDefault();
            const scrollTarget = targetSection.offsetTop - getOffset(targetSection.id);
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        });
    });
});
