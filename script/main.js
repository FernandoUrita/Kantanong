
        // Video Modal Functionality
        const videoModal = document.getElementById('videoModal');
        const modalVideoFrame = document.getElementById('modalVideoFrame');
        const closeModal = document.getElementById('closeModal');
        const watchIntroBtn = document.getElementById('watchIntroBtn');
        const videoThumbnails = document.querySelectorAll('.video-thumbnail');
        

        // Initialize EmailJS with your Public Key
        // Replace these with your actual EmailJS credentials
        emailjs.init('KZg1auPTnCvcF5Ko3');
        const SERVICE_ID = 'service_hlmt6j1';
        const TEMPLATE_ID = 'template_mr7yebw';
        
        // Quiz variables
        let userName = '';
        let userEmail = '';
        let userScore = 0;
        let totalQuestions = 0;
        
        // DOM Elements
        const startForm = document.getElementById('quizStartForm');
        const questionsContainer = document.getElementById('quizQuestionsContainer');
        const completeSection = document.getElementById('quizComplete');
        const startBtn = document.getElementById('startQuizBtn');
        const submitBtn = document.getElementById('submitQuizBtn');
        const sendResultsBtn = document.getElementById('sendResultsBtn');
        const userGreeting = document.getElementById('quizUserGreeting');
        const scoreDisplay = document.getElementById('quizScore');
        const feedbackDisplay = document.getElementById('quizFeedback');
        
        // Event Listeners
        startBtn.addEventListener('click', startQuiz);
        submitBtn.addEventListener('click', submitQuiz);
        sendResultsBtn.addEventListener('click', sendResults);
        
        document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
        const questionDiv = this.closest('.quiz-question');
        const isCorrect = this.getAttribute('data-correct') === 'true';
        
        // Disable all options in this question
        questionDiv.querySelectorAll('.quiz-option').forEach(opt => {
            opt.disabled = true;
            
            // Highlight correct answer
            if (opt.getAttribute('data-correct') === 'true') {
                opt.classList.add('correct');
            }
        });
        
        // Mark selected option
        if (isCorrect) {
            this.classList.add('correct');
            userScore++;
        } else {
            this.classList.add('incorrect');
        }
        
        // Check if all questions answered
        checkQuizCompletion();
    });
});

function checkQuizCompletion() {
    const answeredQuestions = document.querySelectorAll('.quiz-option[disabled]').length / 4;
    if (answeredQuestions === totalQuestions) {
        // Show results
        const percentage = Math.round((userScore / totalQuestions) * 100);
        alert(`Quiz completed! Your score: ${userScore}/${totalQuestions} (${percentage}%)`);
    }
}
        
        function startQuiz() {
            userName = document.getElementById('userName').value.trim();
            userEmail = document.getElementById('userEmail').value.trim();
            
            // Validate inputs
            if (!userName) {
                alert('Pakilagay ang iyong pangalan');
                return;
            }
            
            if (!userEmail || !userEmail.includes('@')) {
                alert('Pakilagay ang wastong email address');
                return;
            }
            
            // Initialize quiz
            startForm.style.display = 'none';
            questionsContainer.style.display = 'block';
            userGreeting.textContent = `Kumusta, ${userName}! Sagutin ang mga sumusunod:`;
            submitBtn.style.display = 'block';
            
            // Count questions
            totalQuestions = document.querySelectorAll('.quiz-question').length;
            userScore = 0; // Reset score
        }
        
        function submitQuiz() {
            const answeredQuestions = document.querySelectorAll('.quiz-option[disabled]').length / 4;
            
            if (answeredQuestions < totalQuestions) {
                alert('Pakisagot muna ang lahat ng mga tanong bago magsumite');
                return;
            }
            
            // Show results
            questionsContainer.style.display = 'none';
            completeSection.style.display = 'block';
            
            const percentage = Math.round((userScore / totalQuestions) * 100);
            scoreDisplay.textContent = `Iyong iskor: ${userScore}/${totalQuestions} (${percentage}%)`;
            
            // Provide feedback
            let feedback = '';
            if (percentage >= 80) {
                feedback = 'Mahusay! Napakagaling ng iyong pag-unawa sa simile!';
            } else if (percentage >= 50) {
                feedback = 'Magandang simula! May konting pag-aaral pa at mas gagaling ka!';
            } else {
                feedback = 'Subukan mong muli! Maaari mong balikan ang mga aralin at subukan ulit mamaya.';
            }
            feedbackDisplay.textContent = feedback;
        }
        
        function sendResults() {
            const percentage = Math.round((userScore / totalQuestions) * 100);
            const currentDate = new Date().toLocaleDateString('en-PH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Prepare email data
            const templateParams = {
                user_name: userName,
                user_email: userEmail,
                score: `${userScore}/${totalQuestions}`,
                percentage: percentage,
                date: currentDate
            };
            
            // Send email
            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                .then(() => {
                    alert('Ang iyong iskor ay naipadala na! Salamat sa pagsubok!');
                    sendResultsBtn.disabled = true;
                    sendResultsBtn.textContent = 'Naipadala na ✓';
                    sendResultsBtn.style.backgroundColor = '#2E7D32';
                }, (error) => {
                    alert('May problema sa pagpapadala. Pakisubukan muli mamaya.');
                    console.error('Email sending failed:', error);
                });
        }


        // Open modal for intro video
        watchIntroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalVideoFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
            videoModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
        
        // Open modal for thumbnail videos
        videoThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const videoId = thumbnail.getAttribute('data-video-id');
                modalVideoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoModal.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', () => {
            modalVideoFrame.src = "";
            videoModal.style.display = "none";
            document.body.style.overflow = "auto";
        });
        
        // Close modal when clicking outside
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                modalVideoFrame.src = "";
                videoModal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
        
        // Audio Player Functionality
        const audio = new Audio();
        const playBtn = document.getElementById('play-btn');
        const progressContainer = document.getElementById('progress-container');
        const progress = document.getElementById('progress');
        const timeDisplay = document.getElementById('time-display');
        const lyricsLines = document.querySelectorAll('.lyrics-line');
        
        // Mock audio file (in a real implementation, this would be your actual audio file)
        audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
        audio.volume = 0.7;
        
        // Play/Pause functionality
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.textContent = '❚❚';
            } else {
                audio.pause();
                playBtn.textContent = '▶';
            }
        });
        
        // Update progress bar
        audio.addEventListener('timeupdate', () => {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            // Update time display
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
            const durationMinutes = Math.floor(duration / 60);
            const durationSeconds = Math.floor(duration % 60).toString().padStart(2, '0');
            
            timeDisplay.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
            
            // Highlight current lyric line (simplified version)
            const currentLineIndex = Math.floor((currentTime / duration) * lyricsLines.length);
            lyricsLines.forEach((line, index) => {
                if (index === currentLineIndex) {
                    line.classList.add('active');
                } else {
                    line.classList.remove('active');
                }
            });
        });
        
        // Click on progress bar to seek
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            
            audio.currentTime = (clickX / width) * duration;
        });
        
        // Quiz functionality
        const quizOptions = document.querySelectorAll('.quiz-option');
        
        quizOptions.forEach(option => {
            option.addEventListener('click', function() {
                const questionDiv = this.closest('.quiz-question');
                const feedbackDiv = questionDiv.querySelector('.quiz-feedback');
                
                if (this.classList.contains('correct')) {
                    this.classList.add('correct');
                    feedbackDiv.classList.add('show');
                    
                    // Disable all options in this question
                    questionDiv.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.disabled = true;
                    });
                } else {
                    this.classList.add('incorrect');
                }
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });