// Smooth scrolling and link highlighting without # in the URL

// When 'About' link is clicked
document.getElementById("about-link").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default anchor link behavior to avoid adding '#' to the URL
    document.getElementById("About").scrollIntoView({ behavior: "smooth" }); // Smoothly scroll to the 'About' section
});

// When 'Works' link is clicked
document.getElementById("works-link").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    document.getElementById("Works").scrollIntoView({ behavior: "smooth" }); // Smoothly scroll to the 'Works' section
});

// When 'Contacts' link is clicked
document.getElementById("contacts-link").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    document.getElementById("Contacts").scrollIntoView({ behavior: "smooth" }); // Smoothly scroll to the 'Contacts' section
});

// Change active link color on scroll
window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section"); // Get all sections on the page
    const navLinks = document.querySelectorAll(".navbar-links a"); // Get all navigation links

    let currentSection = ""; // Variable to hold the current section ID

    // Loop through sections to determine which section is in view
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; // Calculate the top position of each section (with an offset)
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id"); // Set the current section to the section in view
        }
    });

    // Loop through navigation links to update active class
    navLinks.forEach((link) => {
        link.classList.remove("active"); // Remove active class from all links
        if (link.id.includes(currentSection.toLowerCase())) {
            link.classList.add("active"); // Add active class to the link corresponding to the current section
        }
    });
});

