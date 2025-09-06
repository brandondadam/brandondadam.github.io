gsap.registerPlugin(CustomEase, Flip);
CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");

gsap.defaults({
    ease: "osmo-ease",
    duration: 0.725
});

function initGalleryOverlayTransitionFlip() {
    const listItems = document.querySelectorAll(".main-title__item");
    const projectHero = document.querySelectorAll(".project-hero-image");
    const overlayItems = document.querySelectorAll(".overlay-item");
    const closeButton = document.querySelector("[data-overlay='close']");
    const headings = document.querySelectorAll(".project-title");
    const contentToHide = document.querySelectorAll(".hide-me");
    const backButton = document.querySelectorAll(".back");
    const backText = document.querySelectorAll(".back-text");
    const logoButton = document.querySelectorAll(".home");
    const logoText = document.querySelectorAll(".logo-text");
    let activeListItem = null;

    function openOverlay(index) {
        // Set active class to the clicked list item
        listItems.forEach(item => item.classList.remove("active"));
        activeListItem = listItems[index];
        activeListItem.classList.add("active");

        // Record the state of the title
        const title = activeListItem.querySelector(".project-title");
        const titleState = Flip.getState(title, {
            props: "fontSize"
        });

        // Show the overlay and get elements for animation
        const overlayItem = overlayItems[index];
        const content = overlayItem.querySelector(".overlay-row");

        gsap.set(overlayItem, {
            display: "block",
            autoAlpha: 1
        })
        gsap.fromTo(content, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            delay: 0.5
        })

        //Back Button Stuff
        gsap.set(backButton, {
            display: "inline-block"
        });
        gsap.set(logoButton, {
            display: "none"
        });
        gsap.set(backText, {
            display: "block"
        });
        gsap.set(logoText, {
            display: "none"
        });

        const textTarget = overlayItem.querySelector("[data-overlay='text-target']");

        // Append the elements to overlay targets
        textTarget.appendChild(title);

        // Animate with GSAP Flip
        Flip.from(titleState);

        //Show Hero Image
        gsap.fromTo(projectHero, {
            yPercent: 100,
            autoAlpha: 0
        }, {
            yPercent: 0,
            autoAlpha: 110,
            delay: .6
        });

        //Hide Other Content
        gsap.to(contentToHide, {
            yPercent: 0,
            autoAlpha: 0,
            duration: 0.45
        });

        listItems.forEach((listItem, i) => {
            if (i !== index) {
                const otherTitle = listItem.querySelector(".project-title");
                gsap.to(otherTitle, {
                    yPercent: 100,
                    autoAlpha: 0,
                    duration: 0.45,
                    delay: 0.2 - i * 0.05
                });
            }
        });
    }

    // Function to close overlay
    function closeOverlay() {
        if (!activeListItem) return;
        // Find active overlay
        const index = Array.from(listItems).indexOf(activeListItem);
        const overlayItem = overlayItems[index];
        const title = overlayItem.querySelector("[data-overlay='text-target'] .project-title");
        const overlayContent = overlayItem.querySelector(".overlay-row");

        // Record the state of title and image in overlay
        const titleState = Flip.getState(title, {
            props: "fontSize"
        });

        //Hide Hero Image
        gsap.fromTo(projectHero, {
            yPercent: 0,
            autoAlpha: 1
        }, {
            yPercent: 110,
            autoAlpha: 0
        });

        //Back Button Stuff
        gsap.set(backButton, {
            display: "none"
        });
        gsap.set(logoButton, {
            display: "inline-block"
        });
        gsap.set(backText, {
            display: "none"
        });
        gsap.set(logoText, {
            display: "block"
        });

        //Reset overlay display and move elements back to their original containers
        gsap.to(overlayContent, {
            autoAlpha: 0,
            onComplete: () => {
                overlayItem.style.display = "none";
            }
        });

        // gsap.to(overlayContent, {
        //     yPercent: 110,
        //     autoAlpha: 0,
        //     onComplete: () => {
        //         overlayItem.style.display = "none";
        //     }
        // });
        // This fades nice, but the next time the modal opens, the content is moved down. 

        activeListItem.querySelector(".project-button").appendChild(title);

        // Animate elements back with GSAP Flip
        Flip.from(titleState);

        //Show Other Content
        gsap.to(contentToHide, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.45,
            delay: 0.3
        });

        // Remove active class
        activeListItem.classList.remove("active");
        activeListItem = null;
        gsap.to(headings, {
            yPercent: 0,
            autoAlpha: 1,
            delay: 0.3,
            stagger: 0.05
        });
    }

    // Add click event listeners to list items
    listItems.forEach((listItem, index) => {
        listItem.addEventListener("click", () => openOverlay(index));
    });

    // Close overlay on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeOverlay();
    });

    // Close overlay on close button click
    closeButton.addEventListener("click", closeOverlay);
}

// Initialize Gallery to Overlay Transition with GSAP Flip
document.addEventListener('DOMContentLoaded', () => {
    initGalleryOverlayTransitionFlip();
});