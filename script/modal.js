// Function to open any tayutay modal
function openTayutayModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Set up all "Matuto Pa" links
document.querySelectorAll('.learn-more').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('href').substring(1); // Remove #
        openTayutayModal(modalId);
    });
});

// Close modals (works for all)
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.tayutay-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close when clicking outside (works for all)
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('tayutay-modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Add this to your existing script
document.querySelectorAll('.video-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const videoId = this.getAttribute('data-video-id');
        const iframe = document.getElementById('lessonVideoFrame');
        
        // Set YouTube embed URL (autoplay enabled)
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        
        // Show the modal
        document.getElementById('videoLessonModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close video modal (add to existing close handler)
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        // Stop video when closing
        const iframe = document.getElementById('lessonVideoFrame');
        iframe.src = '';
        
        this.closest('.tayutay-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});