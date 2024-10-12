// Get the circle element
const circle = document.querySelector('.circle');

// Get all the social media icons
const socialMediaIcons = document.querySelectorAll('.social-media-icons a');

// Get all the words (p elements) inside .what-i-do
const words = document.querySelectorAll('.rows');

// Get all elements with the hover-text class
const hoverTextElements = document.querySelectorAll('.hover-text');

const hiddenTextElements = document.querySelectorAll('.hidden-text');


// Store original positions of the icons
const originalPositions = Array.from(socialMediaIcons).map(icon => {
    const rect = icon.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
});

// Target position where the circle should move
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

// Actual position of the circle (for smooth interpolation)
let currentX = targetX;
let currentY = targetY;

// Circle dimensions (radius)
const circleRadius = 25; // Assuming the circle is 50x50px

// Delay in milliseconds before the circle starts moving
let delayTime = 100; // You can adjust this value

// Smoothness factor for movement (lower values create smoother, slower following)
let smoothness = 0.3;

// Force field strength (how much the circle is pulled)
const forceFieldStrength = 0.5;

// Event listener for mouse movement
document.addEventListener('mousemove', function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
});

// Function to detect collision between circle and an element
function isCollidingWithCircle(element) {
    const elementRect = element.getBoundingClientRect();  // Get the element's bounding box

    // Calculate the center of the element
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const elementCenterY = elementRect.top + elementRect.height / 2;

    // Calculate the distance between the circle's center and the element's center
    const distanceX = elementCenterX - currentX;
    const distanceY = elementCenterY - currentY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Check if the distance is less than the sum of the circle's radius and the element's half-width/height
    const elementRadius = Math.max(elementRect.width, elementRect.height) / 2;

    // Return true if the distance between centers is less than the sum of their radii (collision)
    return distance < (circleRadius + elementRadius);
}

// Function to handle collision effects on social media icons
function handleIconCollision(icon) {
    // Check if the icon is currently colliding with the circle
    if (isCollidingWithCircle(icon)) {
        // Change only the part of the icon that is colliding to black
        icon.style.color = '#A9B8D2'; // Set default color
        icon.style.filter = 'brightness(0) invert(0)'; // Reset filter for full icon

        return true; // Return true if a collision is detected
    }

    // Reset color if not colliding
    icon.style.color = '#A9B8D2'; // Reset color if not colliding
    icon.style.filter = 'none'; // Reset filter to original color
    return false; // Return false if no collision
}

// Function to animate the circle smoothly
function animateCircle() {
    // Smoothly interpolate between current position and target position
    currentX += (targetX - currentX) * smoothness;
    currentY += (targetY - currentY) * smoothness;

    // Check for collisions with social media icons
    let pulling = false; // Track if we're being pulled towards an icon

    socialMediaIcons.forEach((icon) => {
        if (handleIconCollision(icon)) {
            pulling = true; // If any icon is colliding, set pulling to true
        }
    });

    // If we're being pulled towards an icon, adjust the target position
    if (pulling) {
        // Calculate the pull direction and apply force
        socialMediaIcons.forEach((icon) => {
            if (isCollidingWithCircle(icon)) {
                const iconRect = icon.getBoundingClientRect();
                const iconCenterX = iconRect.left + iconRect.width / 2;
                const iconCenterY = iconRect.top + iconRect.height / 2;

                const pullDirectionX = (currentX - iconCenterX) * forceFieldStrength;
                const pullDirectionY = (currentY - iconCenterY) * forceFieldStrength;

                // Apply the pull to the icon's position
                icon.style.transform = `translate(${pullDirectionX}px, ${pullDirectionY}px)`;
            }
        });
    } else {
        // Reset icons to their original positions if not colliding
        socialMediaIcons.forEach((icon) => {
            icon.style.transform = `translate(0px, 0px)`; // Reset transform
        });
    }

    // Apply the new position to the circle
    circle.style.left = `${currentX}px`;
    circle.style.top = `${currentY}px`;

    // Continue animating with requestAnimationFrame for smooth motion
    requestAnimationFrame(animateCircle);
}

// Add a delay before the circle starts following
setTimeout(() => {
    // Start the animation loop
    requestAnimationFrame(animateCircle);
}, delayTime);

// Function to collapse the circle
function collapseCircle() {
    circle.style.transform = 'translate(-50%, -50%) scale(0)';  // Collapse the circle
}

// Function to expand the circle
function expandCircle(scale) {
    circle.style.transform = `translate(-50%, -50%) scale(${scale})`;  // Expand the circle
}

// Add event listeners for the hover-text elements
hoverTextElements.forEach(text => {
    text.addEventListener('mouseenter', () => {
        expandCircle(8);  // Expand the circle when hovering over any hover-text
    });

    text.addEventListener('mouseleave', () => {
        expandCircle(1);  // Collapse the circle back to original size when the cursor leaves
    });
});

// Add event listeners for the hover-text elements
hiddenTextElements.forEach(text => {
    text.addEventListener('mouseenter', () => {
        expandCircle(8);  // Expand the circle when hovering over any hover-text
    });

    text.addEventListener('mouseleave', () => {
        expandCircle(1);  // Collapse the circle back to original size when the cursor leaves
    });
});


// Get all elements with the hover-gif class
const hoverGifElements = document.querySelectorAll('.hover-gif');

// Add event listeners for the hover-gif elements
hoverGifElements.forEach(text => {
    text.addEventListener('mouseenter', () => {
        expandCircle(2.5);  // Expand the circle when hovering over any hover-gif
    });

    text.addEventListener('mouseleave', () => {
        expandCircle(1);  // Collapse the circle back to original size when the cursor leaves
    });
});

// Add event listeners for mouse enter and leave on navbar links
const navbarLinks = document.querySelectorAll('.navbar-links a');

navbarLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        collapseCircle();  // Collapse the circle when hovering over navbar links
    });

    link.addEventListener('mouseleave', () => {
        expandCircle(1);  // Expand the circle back to original size when the cursor leaves
    });
});

// Add event listeners for mouse enter and leave name
const hideCircle = document.querySelectorAll('.hide-circle p');

hideCircle.forEach(link => {
    link.addEventListener('mouseenter', () => {
        collapseCircle();  // Collapse the circle when hovering over name
        link.style.color = '#6C7BFF';  // Change text color to black when circle disappears
    });

    link.addEventListener('mouseleave', () => {
        expandCircle(1);  // Expand the circle back to original size when the cursor leaves
        link.style.color = '';  // Reset text color back to original when circle reappears
    });
});

// Function to turn the text into a square when hovered
function turnToSquare(word) {
    word.classList.add('square'); // Add the 'square' class to the hovered text
}

// Function to revert the text back to its normal state when hover ends
function revertToText(word) {
    word.classList.remove('square'); // Remove the 'square' class
}

// Add event listeners to each word (p element) for hover effects
words.forEach(word => {
    const span = word.querySelector('span'); // Get the span inside each row
    word.addEventListener('mouseenter', () => {
        collapseCircle();  // Collapse the circle when hovering over the text
        span.style.opacity = '1'; // Show the span text
    });

    word.addEventListener('mouseleave', () => {
        expandCircle(1);  // Expand the circle back to original size when the hover ends
        span.style.opacity = '0'; // Hide the span text
    });
});


// Add event listeners for mouse enter and leave name
const inputElement = document.querySelectorAll('input');

inputElement.forEach(link => {
    link.addEventListener('mouseenter', () => {
        collapseCircle();  // Collapse the circle when hovering over name
        link.style.color = '#6C7BFF';  // Change text color to black when circle disappears
    });

    link.addEventListener('mouseleave', () => {
        expandCircle(1);  // Expand the circle back to original size when the cursor leaves
        link.style.color = '';  // Reset text color back to original when circle reappears
    });
});

// Add event listeners for mouse enter and leave name
const textareaElement = document.querySelectorAll('textarea');

textareaElement.forEach(link => {
    link.addEventListener('mouseenter', () => {
        collapseCircle();  // Collapse the circle when hovering over name
        link.style.color = '#6C7BFF';  // Change text color to black when circle disappears
    });

    link.addEventListener('mouseleave', () => {
        expandCircle(1);  // Expand the circle back to original size when the cursor leaves
        link.style.color = '';  // Reset text color back to original when circle reappears
    });
});

// Add event listeners for mouse enter and leave name
const buttonElement = document.querySelectorAll('button');

buttonElement.forEach(link => {
    link.addEventListener('mouseenter', () => {
        collapseCircle();  // Collapse the circle when hovering over name
        link.style.color = '';  // Change text color to black when circle disappears
    });

    link.addEventListener('mouseleave', () => {
        expandCircle(1);  // Expand the circle back to original size when the cursor leaves
        link.style.color = '';  // Reset text color back to original when circle reappears
    });
});


function sendMail() {
    var name = $('#contact-name').val();
    var subject = $('#contact-subject').val();
    var message = $('#contact-textarea').val();
    window.location.href = 'mailto:cesar.cruz@live.com.pt?subject= ' + name + ' (' + subject + ')' + '&body=' + message;
};

const emailElement = document.querySelectorAll('.email');

emailElement.forEach(link => {
    link.addEventListener('mouseenter', () => {
        collapseCircle();  // Collapse the circle when hovering over name
        link.style.color = '';  // Change text color to black when circle disappears
    });

    link.addEventListener('mouseleave', () => {
        expandCircle(1);  // Expand the circle back to original size when the cursor leaves
        link.style.color = '';  // Reset text color back to original when circle reappears
    });
});

const phoneElement = document.querySelectorAll('.phone');

phoneElement.forEach(link => {
    link.addEventListener('mouseenter', () => {
        collapseCircle();  // Collapse the circle when hovering over name
        link.style.color = '';  // Change text color to black when circle disappears
    });

    link.addEventListener('mouseleave', () => {
        expandCircle(1);  // Expand the circle back to original size when the cursor leaves
        link.style.color = '';  // Reset text color back to original when circle reappears
    });
});

// Select all client-name elements
const clientNames = document.querySelectorAll('.client-name');

clientNames.forEach(client => {
    const fullName = client.getAttribute('data-full-name');
    const shortName = client.getAttribute('data-short-name');
    const hiddenText = client.querySelector('.text-hidden-sections'); // Get the hidden text

    // Ensure hidden text starts hidden
    hiddenText.style.opacity = '0';
    hiddenText.style.transition = 'opacity 0.3s ease'; // Add transition for smoothness

    client.addEventListener('mouseenter', () => {
        // Change only the text part (excluding the hidden text)
        client.innerHTML = `${shortName} `; // Set to short name
        client.appendChild(hiddenText); // Re-add the hidden text
        hiddenText.style.opacity = '1'; // Reveal hidden text
    });

    client.addEventListener('mouseleave', () => {
        // Revert back to full name and hide hidden text
        client.innerHTML = `${fullName} `; // Set to full name
        client.appendChild(hiddenText); // Re-add the hidden text
        hiddenText.style.opacity = '0'; // Hide the hidden text
    });
});



