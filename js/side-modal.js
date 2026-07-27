// Modal open/close — fade + slide transitions
// Reuses the same GSAP setup as the project overlay transitions
// (view-projects.js sets the "osmo-ease" custom ease and 0.725s default
// duration), so the modal opens/closes with the same feel: content slides
// in/out while fading via autoAlpha.

function initModalBasic() {
    const modalGroup = document.querySelector('[data-modal-group-status]');
    const modalDark = modalGroup ? modalGroup.querySelector('.modal__dark') : null;
    const modalTargets = document.querySelectorAll('[data-modal-target]');
    const modals = document.querySelectorAll('[data-modal-name]');

    let activeTimeline = null;

    function openModal(modalTargetName) {
        const targetTrigger = document.querySelector(`[data-modal-target="${modalTargetName}"]`);
        const targetCard = document.querySelector(`[data-modal-name="${modalTargetName}"]`);
        if (!targetTrigger || !targetCard) return;

        if (activeTimeline) activeTimeline.kill();

        // Close all, then activate the target
        modalTargets.forEach((target) => target.setAttribute('data-modal-status', 'not-active'));
        modals.forEach((modal) => modal.setAttribute('data-modal-status', 'not-active'));
        targetTrigger.setAttribute('data-modal-status', 'active');
        targetCard.setAttribute('data-modal-status', 'active');
        if (modalGroup) {
            modalGroup.setAttribute('data-modal-group-status', 'active');
        }

        // Reset scroll position — the card's internal scroll container
        // persists in the DOM between opens, so it keeps whatever
        // scrollTop it had last time unless we reset it here.
        const scrollContainer = targetCard.querySelector('.modal__scroll');
        if (scrollContainer) scrollContainer.scrollTop = 0;

        const tl = gsap.timeline();
        if (modalDark) {
            tl.fromTo(modalDark, { autoAlpha: 0 }, { autoAlpha: 1 }, 0);
        }
        tl.fromTo(targetCard, { autoAlpha: 0, xPercent: 100 }, { autoAlpha: 1, xPercent: 0 }, 0);

        activeTimeline = tl;
    }

    function closeAllModals() {
        const activeCard = document.querySelector('[data-modal-name][data-modal-status="active"]');
        if (activeTimeline) activeTimeline.kill();

        const tl = gsap.timeline({
            onComplete: () => {
                modalTargets.forEach((target) => target.setAttribute('data-modal-status', 'not-active'));
                modals.forEach((modal) => modal.setAttribute('data-modal-status', 'not-active'));
                if (modalGroup) {
                    modalGroup.setAttribute('data-modal-group-status', 'not-active');
                }
            }
        });

        if (activeCard) {
            tl.to(activeCard, { autoAlpha: 0, xPercent: 100 }, 0);
        }
        if (modalDark) {
            tl.to(modalDark, { autoAlpha: 0 }, 0);
        }

        activeTimeline = tl;
    }

    // Open modal
    modalTargets.forEach((modalTarget) => {
        modalTarget.addEventListener('click', function () {
            openModal(this.getAttribute('data-modal-target'));
        });
    });

    // Close modal
    document.querySelectorAll('[data-modal-close]').forEach((closeBtn) => {
        closeBtn.addEventListener('click', closeAllModals);
    });

    // Close modal on `Escape` key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Initialize Basic Modal
document.addEventListener('DOMContentLoaded', () => {
    initModalBasic();
});
