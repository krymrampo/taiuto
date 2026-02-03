/**
 * tAIuto - WhatsApp Chat Simulator
 * Interactive chat animation for hero section
 */

class ChatSimulator {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.options = {
            loopInterval: 8000,
            typingDelay: 500,
            messageDelay: 1000,
            ...options
        };
        
        this.messages = [
            {
                type: 'incoming',
                text: 'Buongiorno! Vorrei prenotare un taglio per domani pomeriggio 🙏',
                time: '09:15'
            },
            {
                type: 'outgoing',
                text: 'Ciao! Certo, sono tAIuto 👋 Ti do subito le disponibilità per domani pomeriggio:',
                time: '09:15',
                read: true
            },
            {
                type: 'outgoing',
                text: '• 14:30 con Marco\n• 16:00 con Sofia\n• 17:30 con Marco',
                time: '09:15',
                read: true
            },
            {
                type: 'incoming',
                text: 'Perfetto, prendo le 16:00 con Sofia! ✨',
                time: '09:16'
            },
            {
                type: 'outgoing',
                text: 'Prenotazione confermata! 📅\n\n<strong>Martedì 3 Feb - 16:00</strong>\nTaglio con Sofia\n\nTi aspettiamo! 💇‍♀️',
                time: '09:16',
                read: true
            }
        ];
        
        this.currentIndex = 0;
        this.isAnimating = false;
        this.chatArea = this.container.querySelector('.chat-area');
        
        this.init();
    }
    
    init() {
        this.render();
        this.startAnimation();
    }
    
    render() {
        if (!this.chatArea) return;
        
        // Clear existing messages
        this.chatArea.innerHTML = '';
        
        // Add date separator
        const dateSeparator = document.createElement('div');
        dateSeparator.className = 'text-center text-xs text-gray-500 my-4';
        dateSeparator.innerHTML = '<span class="bg-[#E5DDD5] px-3 py-1 rounded-full">Oggi</span>';
        this.chatArea.appendChild(dateSeparator);
    }
    
    async startAnimation() {
        while (true) {
            await this.playSequence();
            await this.wait(this.options.loopInterval);
            this.reset();
        }
    }
    
    async playSequence() {
        this.isAnimating = true;
        
        for (let i = 0; i < this.messages.length; i++) {
            const message = this.messages[i];
            
            // Show typing indicator for outgoing messages
            if (message.type === 'outgoing' && i > 0) {
                await this.showTypingIndicator();
                await this.wait(this.options.typingDelay);
                this.hideTypingIndicator();
            }
            
            // Show message
            this.showMessage(message);
            
            // Wait before next message
            await this.wait(this.options.messageDelay);
        }
        
        this.isAnimating = false;
    }
    
    showMessage(message) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble chat-${message.type} mb-3`;
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(10px)';
        
        const readStatus = message.read ? '✓✓' : '';
        const timeColor = message.type === 'outgoing' ? 'text-gray-500' : 'text-gray-400';
        
        bubble.innerHTML = `
            <div class="message-text">${message.text}</div>
            <div class="text-[10px] ${timeColor} mt-1 text-right">
                ${message.time} ${readStatus}
            </div>
        `;
        
        this.chatArea.appendChild(bubble);
        
        // Trigger animation
        requestAnimationFrame(() => {
            bubble.style.transition = 'all 0.4s ease-out';
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0)';
        });
        
        // Auto scroll
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator-container mb-3';
        typing.id = 'typing-indicator';
        typing.innerHTML = `
            <div class="chat-bubble chat-outgoing bg-white" style="width: 60px; padding: 12px 16px;">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        
        this.chatArea.appendChild(typing);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatArea.scrollTop = this.chatArea.scrollHeight;
    }
    
    reset() {
        this.hideTypingIndicator();
        this.render();
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
    }
    
    destroy() {
        this.reset();
        if (this.chatArea) {
            this.chatArea.innerHTML = '';
        }
    }
}

/**
 * Simple chat animation for non-interactive display
 */
function initSimpleChatAnimation() {
    const bubbles = document.querySelectorAll('.chat-bubble');
    
    bubbles.forEach((bubble, index) => {
        // Set initial delay based on index
        bubble.style.animationDelay = `${index * 0.8 + 0.5}s`;
        
        // Add hover effect
        bubble.addEventListener('mouseenter', () => {
            bubble.style.transform = 'scale(1.02)';
            bubble.style.transition = 'transform 0.2s ease';
        });
        
        bubble.addEventListener('mouseleave', () => {
            bubble.style.transform = 'scale(1)';
        });
    });
}

/**
 * Initialize chat hover effects
 */
function initChatHoverEffects() {
    const chatContainer = document.querySelector('.iphone-frame');
    if (!chatContainer) return;
    
    chatContainer.addEventListener('mouseenter', () => {
        chatContainer.style.transform = 'scale(1.02) rotateY(-5deg)';
        chatContainer.style.transition = 'transform 0.4s ease';
    });
    
    chatContainer.addEventListener('mouseleave', () => {
        chatContainer.style.transform = 'scale(1) rotateY(0)';
    });
}

/**
 * Message reaction animation
 */
function addMessageReaction(element) {
    const reactions = ['❤️', '👍', '😊', '🎉'];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    
    const badge = document.createElement('span');
    badge.className = 'message-reaction';
    badge.textContent = reaction;
    badge.style.cssText = `
        position: absolute;
        bottom: -8px;
        right: -8px;
        background: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        animation: popIn 0.3s ease-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(badge);
    
    // Remove after delay
    setTimeout(() => {
        badge.style.animation = 'popOut 0.3s ease-out forwards';
        setTimeout(() => badge.remove(), 300);
    }, 2000);
}

// Add pop animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        from {
            transform: scale(0);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes popOut {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Try to initialize advanced simulator
    const chatSim = new ChatSimulator('.chat-container');
    
    // Fallback simple animation
    initSimpleChatAnimation();
    initChatHoverEffects();
});

// Export for external use
window.ChatSimulator = ChatSimulator;
