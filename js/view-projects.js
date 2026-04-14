gsap.registerPlugin(CustomEase, Flip);
CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");

gsap.defaults({
    ease: "osmo-ease",
    duration: 0.725
});

function initGalleryOverlayTransitionFlip() {
    const listItems = document.querySelectorAll(".main-title__item");
    const WIPTags = document.querySelectorAll(".wip-tag");
    const projectHero = document.querySelectorAll(".project-hero-image");
    const projectOverviewItems = document.querySelectorAll(".project-overview-item");
    const overlayItems = document.querySelectorAll(".overlay-item");
    const closeButton = document.querySelector("[data-overlay='close']");
    const headings = document.querySelectorAll(".project-title");
    const contentToHide = document.querySelectorAll(".hide-me");
    const backButton = document.querySelectorAll(".back");
    const backText = document.querySelectorAll(".back-text");
    const logoButton = document.querySelectorAll(".home");
    const logoText = document.querySelectorAll(".logo-text");
    let activeListItem = null;

    const setIfHas = (target, vars) => {
        if (!target) return;
        if (target.length === 0) return;
        gsap.set(target, vars);
    };

    const toIfHas = (target, vars) => {
        if (!target) return;
        if (target.length === 0) return;
        gsap.to(target, vars);
    };

    const fromToIfHas = (target, fromVars, toVars) => {
        if (!target) return;
        if (target.length === 0) return;
        gsap.fromTo(target, fromVars, toVars);
    };

    const projectHashes = ['visionlink', 'dsp-mobile', 'freedom-tracker', 'immersion-vr', 'motorola', '48-custom', 'dynamic-desktops'];

    function openOverlay(index) {
        // Set active class to the clicked list item
        listItems.forEach(item => item.classList.remove("active"));
        activeListItem = listItems[index];
        activeListItem.classList.add("active");

        // Update URL hash
        window.location.hash = projectHashes[index];

        // Record the state of the title
        const title = activeListItem.querySelector(".project-title");
        const titleState = Flip.getState(title, {
            props: "fontSize"
        });

        // Show the overlay and get elements for animation
        const overlayItem = overlayItems[index];
        const content = overlayItem.querySelector(".overlay-content");

        setIfHas(overlayItem, {
            display: "block",
            autoAlpha: 1
        });
        fromToIfHas(content, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            delay: 1.1
        });

        //Back Button Stuff
        setIfHas(backButton, {
            display: "inline-block"
        });
        setIfHas(logoButton, {
            display: "none"
        });
        setIfHas(backText, {
            display: "block"
        });
        setIfHas(logoText, {
            display: "none"
        });

        const textTarget = overlayItem.querySelector("[data-overlay='text-target']");

        // Append the elements to overlay targets
        textTarget.appendChild(title);

        // Animate with GSAP Flip
        Flip.from(titleState);

        //Show Project Overview Items
        projectOverviewItems.forEach((OverviewItem, i) => {
            if (i !== index - 1) {
                gsap.fromTo(OverviewItem, {
                    yPercent: 100,
                    autoAlpha: 0
                }, {
                    yPercent: 0,
                    autoAlpha: 1,
                    duration: 0.45,
                    delay: .85
                });
            }
        });

        //Show Hero Image
        fromToIfHas(projectHero, {
            yPercent: 100,
            autoAlpha: 0
        }, {
            yPercent: 0,
            autoAlpha: 110,
            delay: 1
        });

        //Hide Other Content
        toIfHas(contentToHide, {
            yPercent: 0,
            autoAlpha: 0,
            duration: 0.45
        });

        //Hide WIP Tags
        toIfHas(WIPTags, {
            autoAlpha: 0,
            duration: 0.25
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
        const overlayContent = overlayItem.querySelector(".overlay-content");

        // Record the state of title and image in overlay
        const titleState = Flip.getState(title, {
            props: "fontSize"
        });

        //Hide Project Overview Items
        projectOverviewItems.forEach((OverviewItem, i) => {
            if (i !== index - 1) {
                gsap.to(OverviewItem, {
                    yPercent: 100,
                    autoAlpha: 0,
                    duration: 0.45,
                    delay: 0 - i * 0.05
                });
            }
        });

        //Hide Hero Image
        fromToIfHas(projectHero, {
            yPercent: 0,
            autoAlpha: 1
        }, {
            yPercent: 110,
            autoAlpha: 0
        });

        //Back Button Stuff
        setIfHas(backButton, {
            display: "none"
        });
        setIfHas(logoButton, {
            display: "inline-block"
        });
        setIfHas(backText, {
            display: "none"
        });
        setIfHas(logoText, {
            display: "block"
        });

        //Reset overlay display and move elements back to their original containers
        toIfHas(overlayContent, {
            autoAlpha: 0,
            yPercent: 110,
            onComplete: () => {
                gsap.set(overlayContent, { yPercent: 0 });
                overlayItem.style.display = "none";
            }
        });

        activeListItem.querySelector(".project-button").appendChild(title);

        // Animate elements back with GSAP Flip
        Flip.from(titleState);

        //Show Other Content
        toIfHas(contentToHide, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.45,
            delay: 0.3
        });

        //Show WIP Tags
        toIfHas(WIPTags, {
            autoAlpha: 1,
            duration: 0.45,
            delay: 0.45
        });

        // Remove active class
        activeListItem.classList.remove("active");
        activeListItem = null;

        // Update URL hash
        window.location.hash = '';

        toIfHas(headings, {
            yPercent: 0,
            autoAlpha: 1,
            delay: 0.3,
            stagger: 0.05
        });
    }

    // Handle hash changes for browser back/forward
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        if (hash === '') {
            if (activeListItem) closeOverlay();
        } else {
            const index = projectHashes.indexOf(hash);
            if (index !== -1 && !activeListItem) {
                openOverlay(index);
            }
        }
    });

    const projectButtons = document.querySelectorAll(".project-button");

    // Add click event listeners to project buttons and prevent anchor defaults
    projectButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            openOverlay(index);
        });
    });

    // Close overlay on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeOverlay();
    });

    // Close overlay on close button click
    closeButton.addEventListener("click", closeOverlay);

    // Check for initial hash on page load
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
        const index = projectHashes.indexOf(initialHash);
        if (index !== -1) {
            openOverlay(index);
        }
    }
}

// Initialize Gallery to Overlay Transition with GSAP Flip
document.addEventListener('DOMContentLoaded', () => {
    initGalleryOverlayTransitionFlip();
});