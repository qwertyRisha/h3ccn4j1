document.addEventListener('DOMContentLoaded', () => {
    let audioCtx = null;
    
    function playBeep(freq = 600, duration = 0.03) {
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
        }
    }
    const buttons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            playBeep(800, 0.04);
            const target = button.getAttribute('data-target');

            buttons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            button.classList.add('active');
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add('active');
                const textElem = targetSection.querySelector('.typewriter-text');
                if (textElem && !targetSection.id.match(/experience|projects|certs/)) {
                    typeWriterEffect(textElem);
                } else if (textElem) {
                    textElem.textContent = textElem.getAttribute('data-original') || textElem.textContent;
                }
            }
        });
    });

    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const binary = '01';
        const fontSize = 16;
        let columns = Math.floor(canvas.width / fontSize);
        let rainDrops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(3, 7, 13, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff66';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = binary.charAt(Math.floor(Math.random() * binary.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }
        setInterval(drawMatrix, 35);
    }
    function typeWriterEffect(element) {
        const originalText = element.getAttribute('data-original') || element.textContent;
        if (!element.getAttribute('data-original')) {
            element.setAttribute('data-original', originalText);
        }
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < originalText.length) {
                element.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, 15);
            }
        }
        type();
    }

    const initialText = document.querySelector('.content-section.active .typewriter-text');
    if (initialText) {
        const section = initialText.closest('.content-section');
        if (section && !section.id.match(/experience|projects|certs/)) {
            typeWriterEffect(initialText);
        } else if (initialText) {
            const originalText = initialText.getAttribute('data-original') || initialText.textContent;
            initialText.setAttribute('data-original', originalText);
            initialText.textContent = originalText;
        }
    }

    const introOverlay = document.getElementById('intro-overlay');
    const popupsContainer = document.getElementById('popups-container');
    const ransomwareBox = document.getElementById('ransomware-box');
    const terminalScreen = document.getElementById('terminal-screen');
    const timerEl = document.getElementById('timer');
    const skipBtn = document.getElementById('skip-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

    function hideIntro() {
        if (introOverlay) {
            introOverlay.classList.add('hidden');
        }
    }

    function showPopups() {
        if (!popupsContainer) return;
        const messages = [
            'ESTABLISHING LINK',
            'LOADING KERNEL',
            'BYPASSING FIREWALL',
            'TARGET ACQUIRED',
            'ACCESS GRANTED',
            'TRACE COMPLETE'
        ];

        messages.forEach((msg, index) => {
            const popup = document.createElement('div');
            popup.className = 'popup-item';
            popup.textContent = msg;
            popup.style.left = `${Math.random() * 75 + 8}%`;
            popup.style.top = `${Math.random() * 55 + 18}%`;
            popup.style.animationDelay = `${index * 0.25}s`;
            popupsContainer.appendChild(popup);
        });
    }

    function startTimer() {
        if (!timerEl) return;
        let timeLeft = 39;
        const tick = () => {
            const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            const seconds = String(timeLeft % 60).padStart(2, '0');
            timerEl.textContent = `00:${minutes}:${seconds}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                return;
            }
            timeLeft -= 1;
        };
        const timerInterval = setInterval(tick, 1000);
        tick();
    }

    function typeText(element, text, speed = 40) {
        return new Promise(resolve => {
            let index = 0;
            element.textContent = '';
            const tick = () => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(tick, speed);
                } else {
                    resolve();
                }
            };
            tick();
        });
    }

    async function runIntroSequence() {
        if (!introOverlay) return;

        showPopups();

        setTimeout(() => {
            if (ransomwareBox) {
                ransomwareBox.classList.remove('hidden');
                startTimer();
            }
        }, 1200);

        setTimeout(() => {
            if (ransomwareBox) {
                ransomwareBox.classList.add('hidden');
            }
            if (terminalScreen) {
                terminalScreen.classList.remove('hidden');
            }
        }, 5400);

        if (line1 && line2 && line3) {
            setTimeout(async () => {
                await typeText(line1, '> CONNECTING TO h3ccn4j1://secure');
                await typeText(line2, '> VALIDATING CREDENTIALS... OK');
                await typeText(line3, '> ACCESS GRANTED // WELCOME TO THE MATRIX');
            }, 5600);
        }

        setTimeout(() => {
            hideIntro();
        }, 9800);
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            hideIntro();
        });
    }

    if (decryptBtn) {
        decryptBtn.addEventListener('click', () => {
            if (ransomwareBox) {
                ransomwareBox.classList.add('hidden');
            }
            if (terminalScreen) {
                terminalScreen.classList.remove('hidden');
            }
            if (line1 && line2 && line3) {
                typeText(line1, '> DECRYPTION KEY VERIFIED');
                typeText(line2, '> RESTORING FILESYSTEM');
                typeText(line3, '> WELCOME BACK // SYSTEM STABLE');
            }
            setTimeout(() => {
                hideIntro();
            }, 1800);
        });
    }

    runIntroSequence();

    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const imageModalClose = document.getElementById('imageModalClose');

    document.querySelectorAll('.clickable-card').forEach(card => {
        const openCardModal = () => {
            const isExperienceCard = card.dataset.target === 'experience';
            if (isExperienceCard) {
                const section = document.getElementById('experience');
                if (section) {
                    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
                    section.classList.add('active');
                }
                const relatedNav = document.querySelector('.nav-btn[data-target="experience"]');
                if (relatedNav) {
                    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
                    relatedNav.classList.add('active');
                }
                return;
            }

            if (!imageModal || !modalImage || !modalTitle || !modalDescription) return;

            const image = card.dataset.image;
            const title = card.dataset.title || 'Preview';
            const description = card.dataset.description || '';

            if (image) {
                modalImage.style.display = 'block';
                modalImage.src = image;
                modalImage.alt = title;
            } else {
                modalImage.style.display = 'none';
                modalImage.src = '';
                modalImage.alt = '';
            }

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            imageModal.classList.remove('hidden');
        };

        card.addEventListener('click', openCardModal);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openCardModal();
            }
        });
    });

    if (imageModalClose) {
        imageModalClose.addEventListener('click', () => {
            if (imageModal) imageModal.classList.add('hidden');
        });
    }

    if (imageModal) {
        imageModal.addEventListener('click', (event) => {
            if (event.target === imageModal) {
                imageModal.classList.add('hidden');
            }
        });
    }

    const cliModal = document.getElementById('cli-modal');
    const cliTrigger = document.getElementById('cli-trigger');
    const cliClose = document.getElementById('cli-close');
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');

    function toggleCLI() {
        if (!cliModal) return;
        cliModal.classList.toggle('hidden');
        if (!cliModal.classList.contains('hidden')) {
            cliInput.focus();
        }
    }

    if (cliTrigger) cliTrigger.addEventListener('click', toggleCLI);
    if (cliClose) cliClose.addEventListener('click', toggleCLI);

    window.addEventListener('keydown', (e) => {
        if (e.key === '`') {
            e.preventDefault();
            toggleCLI();
        }
    });

    let emailState = {
        step: 0,
        senderEmail: '',
        messageContent: ''
    };

    if (cliInput) {
        cliInput.addEventListener('keydown', (e) => {
            playBeep(400, 0.02);
            if (e.key === 'Enter') {
                const cmd = cliInput.value.trim();
                printCLIResponse(`h3ccn4j1@cyb3rs3c:~$ ${cmd}`, '#38bdf8');
                processCLICommand(cmd);
                cliInput.value = '';
                cliOutput.scrollTop = cliOutput.scrollHeight;
            }
        });
    }
    
    function printCLIResponse(text, color = '#cbd5e1') {
        if (!cliOutput) return;
        const p = document.createElement('p');
        p.style.color = color;
        p.innerText = text;
        cliOutput.appendChild(p);
    }

    function processCLICommand(cmd) {
        const lowerCmd = cmd.toLowerCase();

        if (emailState.step === 1) {
            if (!cmd.includes('@') || !cmd.includes('.')) {
                printCLIResponse('[ERROR] Invalid email format. Try again:', '#ff0055');
                return;
            }
            emailState.senderEmail = cmd;
            emailState.step = 2;
            printCLIResponse('> Enter your message:', '#38bdf8');
            return;
        }

        if (emailState.step === 2) {
            emailState.messageContent = cmd;
            emailState.step = 0;

            printCLIResponse('> SENDING EMAIL...', '#ffbd2e');

            const targetEmail = "jhelianeirishllorera@gmail.com";
            const subject = encodeURIComponent(`Portfolio Contact from ${emailState.senderEmail}`);
            const body = encodeURIComponent(`From: ${emailState.senderEmail}\n\nMessage:\n${emailState.messageContent}`);
            
            window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

            printCLIResponse('[SUCCESS] Mail client launched! Check your email app to dispatch message.', '#00ff66');
            return;
        }

        switch (lowerCmd) {
            case 'help':
                printCLIResponse('Available commands:');
                printCLIResponse('  email     - Send a direct message to Jheliane');
                printCLIResponse('  status    - Check current operator status');
                printCLIResponse('  certs     - Output certification list');
                printCLIResponse('  skills    - Output security & dev skills');
                printCLIResponse('  clear     - Clear terminal buffer');
                printCLIResponse('  exit      - Close CLI prompt');
                break;

            case 'email':
            case 'mail':
            case 'contact':
                emailState.step = 1;
                printCLIResponse('=== DISPATCH EMAIL PROTOCOL ===', '#38bdf8');
                printCLIResponse('> Enter your email address:', '#38bdf8');
                break;

            case 'status':
                printCLIResponse('> STATUS: ONLINE | WEB PENETRATION TESTER', '#00ff66');
                break;

            case 'certs':
                printCLIResponse('> CWPT (2026) | CCP (2026) | Google IT Support (2026)', '#00ff66');
                break;

            case 'skills':
                printCLIResponse('> Security: Wireshark, Nmap, Burp Suite, OWASP Top 10', '#00ff66');
                printCLIResponse('> Code: Python, PHP, JavaScript, SQL, C/C++, HTML/CSS', '#38bdf8');
                break;

            case 'clear':
                cliOutput.innerHTML = '';
                break;

            case 'exit':
                toggleCLI();
                break;

            case '':
                break;

            default:
                printCLIResponse(`Command not found: ${cmd}. Type 'help' for command list.`, '#ff0055');
                break;
        }
    }
});