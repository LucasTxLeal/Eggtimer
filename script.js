document.addEventListener('DOMContentLoaded', function() {
    // Seleção dos elementos DOM
    const eggOptions = document.querySelectorAll('.egg-option');
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const eggAnimation = document.getElementById('eggAnimation');
    const doneMessage = document.getElementById('doneMessage');
    
    // Variáveis de controle
    let selectedTime = 0;
    let selectedType = '';
    let timer = null;
    let timeRemaining = 0;
    let isPaused = false;
    
    // Som de alarme (em Base64 para não precisar de arquivo externo)
    const alarmSound = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2ooFollowEAccpMThg6f4I0aSXznmPvfavlTsscXqFagIzkwkhoXs4a3RxBVw3M/KNDI5eKmFzGcwJxn/AKRnkACggQKmAEBQQABQQFAAQgAAmOiIIQBQAQZAQAICQPT5xAAEAAEAFSiAAAkBQFIBEBRQITAQEBQQjq7JBUDBAUHoaYJBoAAAdB0JRQdQUFUAAQAJKDKDQQGGADCwgMF5YAAAAAAS0KALgAKiWbAAAAAAZAIwAAEEBjBhFUURBOVQAA');
    
    /**
     * Seleção do tipo de ovo
     */
    eggOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove a seleção anterior
            eggOptions.forEach(opt => opt.classList.remove('selected'));
            // Adiciona a classe selected ao elemento clicado
            this.classList.add('selected');
            
            // Obtém os dados do ovo selecionado
            selectedTime = parseInt(this.dataset.time);
            selectedType = this.dataset.type;
            
            // Atualiza a imagem de animação com o tipo selecionado
            updateEggAnimation(selectedType);
        });
    });
    
    /**
     * Atualiza a animação do ovo com base no tipo selecionado
     * @param {string} type - Tipo de ovo selecionado
     */
    function updateEggAnimation(type) {
        const eggSvg = eggAnimation.querySelector('svg');
        
        if (type === 'soft') {
            eggSvg.innerHTML = `
                <ellipse cx="50" cy="50" rx="35" ry="45" fill="white" stroke="black" stroke-width="4"/>
                <circle cx="50" cy="50" r="15" fill="#FFEB3B"/>
                <circle cx="45" cy="45" r="3" fill="black"/>
                <path d="M 50 52 Q 55 57, 60 52" stroke="black" stroke-width="2" fill="none"/>
            `;
        } else if (type === 'jammy') {
            eggSvg.innerHTML = `
                <ellipse cx="50" cy="50" rx="35" ry="45" fill="white" stroke="black" stroke-width="4"/>
                <circle cx="50" cy="50" r="15" fill="#FFA000"/>
                <circle cx="45" cy="45" r="3" fill="black"/>
                <path d="M 50 52 Q 55 57, 60 52" stroke="black" stroke-width="2" fill="none"/>
            `;
        } else if (type === 'hard') {
            eggSvg.innerHTML = `
                <ellipse cx="50" cy="50" rx="35" ry="45" fill="white" stroke="black" stroke-width="4"/>
                <circle cx="50" cy="50" r="15" fill="#FFF59D"/>
                <circle cx="45" cy="45" r="3" fill="black"/>
                <path d="M 50 52 Q 55 57, 60 52" stroke="black" stroke-width="2" fill="none"/>
            `;
        } else if (type === 'fried') {
            eggSvg.innerHTML = `
                <ellipse cx="50" cy="70" rx="45" ry="15" fill="#F57F17" stroke="black" stroke-width="2"/>
                <ellipse cx="50" cy="65" rx="30" ry="20" fill="white" stroke="black" stroke-width="2"/>
                <circle cx="50" cy="65" r="15" fill="#FFEB3B"/>
            `;
        }
    }
    
    /**
     * Iniciar timer
     */
    startBtn.addEventListener('click', function() {
        if (selectedTime === 0) {
            alert('Por favor selecione um tipo de ovo primeiro!');
            return;
        }
        
        // Limpa o timer anterior se existir
        if (timer) {
            clearInterval(timer);
        }
        
        // Configura o tempo inicial
        timeRemaining = selectedTime;
        updateTimerDisplay();
        
        // Mostra os elementos necessários
        timerDisplay.style.display = 'block';
        eggAnimation.style.display = 'block';
        eggAnimation.classList.add('cooking');
        doneMessage.style.display = 'none';
        
        // Inicia o contador
        timer = setInterval(function() {
            if (!isPaused) {
                timeRemaining--;
                updateTimerDisplay();
                
                if (timeRemaining <= 0) {
                    clearInterval(timer);
                    timerComplete();
                }
            }
        }, 1000);
        
        startBtn.textContent = 'Reiniciar';
    });
    
    /**
     * Pausar timer
     */
    pauseBtn.addEventListener('click', function() {
        if (!timer) return;
        
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? '▶️' : '⏸';
        
        // Pausa ou continua a animação
        if (isPaused) {
            eggAnimation.classList.remove('cooking');
        } else {
            eggAnimation.classList.add('cooking');
        }
    });
    
    /**
     * Resetar timer
     */
    resetBtn.addEventListener('click', function() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        
        // Restaura o estado inicial
        isPaused = false;
        pauseBtn.textContent = '⏸';
        timerDisplay.style.display = 'none';
        eggAnimation.style.display = 'none';
        eggAnimation.classList.remove('cooking');
        doneMessage.style.display = 'none';
        startBtn.textContent = 'Iniciar';
    });
    
    /**
     * Atualiza o display do timer
     */
    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        // Formata com zeros à esquerda
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    /**
     * Ações ao completar o timer
     */
    function timerComplete() {
        // Para a animação de "cozimento"
        eggAnimation.classList.remove('cooking');
        // Mostra a mensagem de conclusão
        doneMessage.style.display = 'block';
        // Toca o som de alarme
        alarmSound.play().catch(e => console.log('Erro ao tocar som:', e));
        
        // Animação de conclusão
        eggAnimation.style.animation = 'none';
        setTimeout(() => {
            eggAnimation.style.animation = 'bounce 0.2s 3';
        }, 10);
    }
});