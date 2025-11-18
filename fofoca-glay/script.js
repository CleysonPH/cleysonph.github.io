// Data alvo: 19/11/2025 às 13:00 (GMT-3 - Horário de Brasília)
const targetDate = new Date('2025-11-19T13:00:00-03:00').getTime();
const totalDuration = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
const startDate = targetDate - totalDuration;

function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Elementos do DOM
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const messageElement = document.getElementById('message');
    const progressBar = document.getElementById('progressBar');
    
    if (distance < 0) {
        // Timer expirado
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        messageElement.innerHTML = '<p>🎉 A fofoca foi liberada! 🎉</p>';
        messageElement.classList.add('finished');
        progressBar.style.width = '100%';
        
        // Adiciona confete ao expirar
        createConfetti();
        return;
    }
    
    // Cálculos de tempo
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Atualiza o display com animação
    updateDigit(hoursElement, hours);
    updateDigit(minutesElement, minutes);
    updateDigit(secondsElement, seconds);
    
    // Atualiza a mensagem baseada no tempo restante
    updateMessage(hours, minutes, messageElement);
    
    // Atualiza a barra de progresso
    const elapsed = now - startDate;
    const progress = Math.min((elapsed / totalDuration) * 100, 100);
    progressBar.style.width = progress + '%';
}

function updateDigit(element, value) {
    const newValue = value.toString().padStart(2, '0');
    if (element.textContent !== newValue) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.textContent = newValue;
            element.style.animation = 'digitChange 0.5s ease';
        }, 10);
    }
}

function updateMessage(hours, minutes, element) {
    let message = '';
    
    if (hours === 0 && minutes <= 5) {
        message = '<p>🔥 Segundos finais! A fofoca está quase saindo! 🔥</p>';
    } else if (hours === 0 && minutes <= 30) {
        message = '<p>⏰ Menos de meia hora! Prepare-se! ⏰</p>';
    } else if (hours === 0) {
        message = '<p>⚡ Última hora! A tensão está no ar! ⚡</p>';
    } else if (hours <= 3) {
        message = '<p>🕐 Poucas horas restantes... A expectativa cresce! 🕐</p>';
    } else if (hours <= 12) {
        message = '<p>⌛ Meio dia de espera... A curiosidade aumenta! ⌛</p>';
    } else {
        message = '<p>👀 A revelação está chegando... 👀</p>';
    }
    
    if (element.innerHTML !== message) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.innerHTML = message;
            element.style.opacity = '1';
        }, 300);
    }
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.opacity = '1';
            confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const fall = confetti.animate([
                { 
                    transform: `translateY(0px) rotate(0deg)`,
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            fall.onfinish = () => confetti.remove();
        }, i * 30);
    }
}

// Adiciona animação CSS para mudança de dígito
const style = document.createElement('style');
style.textContent = `
    @keyframes digitChange {
        0% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Inicia o timer
updateTimer();
setInterval(updateTimer, 1000);

// Easter egg: clique no emoji para ver um efeito especial
document.querySelector('.emoji').addEventListener('click', function() {
    this.style.animation = 'none';
    setTimeout(() => {
        this.style.animation = 'pulse 2s infinite, spin 0.5s ease';
    }, 10);
});

const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg) scale(1); }
        to { transform: rotate(360deg) scale(1.2); }
    }
`;
document.head.appendChild(spinStyle);
