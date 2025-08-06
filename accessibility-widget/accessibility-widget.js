/**
 * Accessibility Widget - Konfigurierbares Barrierefreiheits-Tool
 * Version: 1.0
 */

class AccessibilityWidget {
    constructor(config = {}) {
        // Standard-Konfiguration
        this.config = {
            position: config.position || 'bottom-right', // bottom-right, bottom-left, bottom-center, top-right, top-left, top-center, middle-left, middle-right
            buttonColor: config.buttonColor || '#007bff',
            buttonHoverColor: config.buttonHoverColor || '#0056b3',
            panelWidth: config.panelWidth || 300,
            buttonSize: config.buttonSize || 50,
            zIndex: config.zIndex || 9999,
            margin: config.margin || 20, // Abstand vom Rand in Pixeln
            showOnLoad: config.showOnLoad !== false,
            language: config.language || 'en',
            ...config
        };

        // Übersetzungen
        this.translations = {
            en: {
                // Panel Header
                accessibility: 'Accessibility',
                close: 'Close',
                
                // Section Headers
                display: 'Display',
                textSize: 'Text Size',
                motion: 'Motion',
                reading: 'Reading',
                
                // Buttons
                highContrast: 'High Contrast',
                invertColors: 'Invert Colors',
                focusLinks: 'Highlight Links',
                readingGuide: 'Reading Guide',
                increaseFont: 'Increase Text',
                decreaseFont: 'Decrease Text',
                resetFont: 'Reset Text Size',
                reduceMotion: 'Reduce Motion',
                speakPage: 'Read Page',
                speakElement: 'Read Element',
                stopSpeaking: 'Stop Reading',
                
                // Speaking Indicator
                speakingActive: 'Reading active...',
                
                // Element Speaking
                elementReadingTitle: 'Read Element',
                elementReadingText: 'Click on any element to read it.',
                cancel: 'Cancel',
                
                // Voice Selection
                noGermanVoiceFound: 'No German voice found, using default.',
                selectedVoice: 'Selected voice:',
                availableVoices: 'Available voices:',
                
                // Error Messages
                speechError: 'Speech synthesis error:',
                modalElementsNotFound: 'Modal elements not found',
                unknownMovie: 'Unknown Movie',
                noDescriptionAvailable: 'No description available.',
                noInformationAvailable: 'No information available.',
                videoLoading: 'Video loading...'
            },
            de: {
                // Panel Header
                accessibility: 'Barrierefreiheit',
                close: 'Schließen',
                
                // Section Headers
                display: 'Darstellung',
                textSize: 'Textgröße',
                motion: 'Bewegung',
                reading: 'Vorlesen',
                
                // Buttons
                highContrast: 'Hoher Kontrast',
                invertColors: 'Farben umkehren',
                focusLinks: 'Links hervorheben',
                readingGuide: 'Lesehilfe',
                increaseFont: 'Text vergrößern',
                decreaseFont: 'Text verkleinern',
                resetFont: 'Textgröße zurücksetzen',
                reduceMotion: 'Bewegung reduzieren',
                speakPage: 'Seite vorlesen',
                speakElement: 'Element vorlesen',
                stopSpeaking: 'Vorlesen stoppen',
                
                // Speaking Indicator
                speakingActive: 'Vorlesen aktiv...',
                
                // Element Speaking
                elementReadingTitle: 'Element vorlesen',
                elementReadingText: 'Klicken Sie auf ein beliebiges Element, um es vorlesen zu lassen.',
                cancel: 'Abbrechen',
                
                // Voice Selection
                noGermanVoiceFound: 'Keine deutsche Stimme gefunden, verwende Standard.',
                selectedVoice: 'Gewählte Stimme:',
                availableVoices: 'Verfügbare Stimmen:',
                
                // Error Messages
                speechError: 'Fehler bei der Sprachausgabe:',
                modalElementsNotFound: 'Modal-Elemente nicht gefunden',
                unknownMovie: 'Unbekannter Film',
                noDescriptionAvailable: 'Keine Beschreibung verfügbar.',
                noInformationAvailable: 'Keine Information vorhanden',
                videoLoading: 'Video wird geladen...'
            }
        };

        // Widget-Elemente
        this.widget = null;
        this.toggle = null;
        this.panel = null;
        this.closeBtn = null;
        this.buttons = [];

        // Text-to-Speech Variablen
        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.isSpeaking = false;
        this.isElementSpeakingMode = false;

        // Speaking Indicator
        this.speakingIndicator = null;

        // Initialisierung
        this.init();
    }

    // Hilfsfunktion für Übersetzungen
    t(key) {
        const lang = this.config.language;
        const fallbackLang = 'en';
        
        // Versuche die gewünschte Sprache
        if (this.translations[lang] && this.translations[lang][key]) {
            return this.translations[lang][key];
        }
        
        // Fallback auf Englisch
        if (this.translations[fallbackLang] && this.translations[fallbackLang][key]) {
            return this.translations[fallbackLang][key];
        }
        
        // Wenn auch das nicht funktioniert, gib den Schlüssel zurück
        return key;
    }

    init() {
        this.createWidget();
        this.createSpeakingIndicator();
        this.bindEvents();
        this.loadSettings();
        
        if (this.config.showOnLoad) {
            this.show();
        }
    }

    createWidget() {
        // Widget Container
        this.widget = document.createElement('div');
        this.widget.id = 'accessibility-widget';
        this.widget.className = 'accessibility-widget';
        this.applyPositionStyles();

        // Toggle Button
        this.toggle = document.createElement('button');
        this.toggle.id = 'accessibility-toggle';
        this.toggle.className = 'accessibility-toggle';
        this.toggle.setAttribute('aria-label', this.t('accessibility'));
        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.innerHTML = '<i class="fas fa-universal-access"></i>';
        this.applyButtonStyles();

        // Panel
        this.panel = document.createElement('div');
        this.panel.id = 'accessibility-panel';
        this.panel.className = 'accessibility-panel';
        this.panel.style.width = this.config.panelWidth + 'px';

        // Panel Header
        const header = document.createElement('div');
        header.className = 'accessibility-header';
        header.innerHTML = `
            <h3>${this.t('accessibility')}</h3>
            <button id="accessibility-close" class="accessibility-close" aria-label="${this.t('close')}">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Panel Content
        const content = document.createElement('div');
        content.className = 'accessibility-content';
        content.innerHTML = this.createButtonHTML();

        this.panel.appendChild(header);
        this.panel.appendChild(content);
        this.widget.appendChild(this.toggle);
        this.widget.appendChild(this.panel);

        document.body.appendChild(this.widget);
    }

    createButtonHTML() {
        return `
            <div class="accessibility-section">
                <h4>${this.t('display')}</h4>
                <button class="accessibility-btn" data-action="high-contrast">
                    <i class="fas fa-adjust"></i>${this.t('highContrast')}
                </button>
                <button class="accessibility-btn" data-action="invert-colors">
                    <i class="fas fa-palette"></i>${this.t('invertColors')}
                </button>
                <button class="accessibility-btn" data-action="focus-links">
                    <i class="fas fa-mouse-pointer"></i>${this.t('focusLinks')}
                </button>
                <button class="accessibility-btn" data-action="reading-guide">
                    <i class="fas fa-ruler-horizontal"></i>${this.t('readingGuide')}
                </button>
            </div>
            
            <div class="accessibility-section">
                <h4>${this.t('textSize')}</h4>
                <button class="accessibility-btn" data-action="increase-font">
                    <i class="fas fa-plus"></i>${this.t('increaseFont')}
                </button>
                <button class="accessibility-btn" data-action="decrease-font">
                    <i class="fas fa-minus"></i>${this.t('decreaseFont')}
                </button>
                <button class="accessibility-btn" data-action="reset-font">
                    <i class="fas fa-undo"></i>${this.t('resetFont')}
                </button>
            </div>
            
            <div class="accessibility-section">
                <h4>${this.t('motion')}</h4>
                <button class="accessibility-btn" data-action="reduce-motion">
                    <i class="fas fa-running"></i>${this.t('reduceMotion')}
                </button>
            </div>
            
            <div class="accessibility-section">
                <h4>${this.t('reading')}</h4>
                <button class="accessibility-btn" data-action="speak-page">
                    <i class="fas fa-volume-up"></i>${this.t('speakPage')}
                </button>
                <button class="accessibility-btn" data-action="speak-element">
                    <i class="fas fa-hand-pointer"></i>${this.t('speakElement')}
                </button>
                <button class="accessibility-btn" data-action="stop-speaking">
                    <i class="fas fa-stop"></i>${this.t('stopSpeaking')}
                </button>
            </div>
        `;
    }

    createSpeakingIndicator() {
        this.speakingIndicator = document.createElement('div');
        this.speakingIndicator.className = 'speaking-indicator';
        this.speakingIndicator.innerHTML = `<i class="fas fa-volume-up"></i> ${this.t('speakingActive')}`;
        document.body.appendChild(this.speakingIndicator);
    }

    applyPositionStyles() {
        const styles = {
            position: 'fixed',
            zIndex: this.config.zIndex,
            fontFamily: 'Poppins, sans-serif'
        };

        const margin = this.config.margin + 'px';
        const buttonRadius = (this.config.buttonSize / 2) + 'px';

        switch (this.config.position) {
            case 'top-left':
                styles.top = margin;
                styles.left = margin;
                break;
            case 'top-center':
                styles.top = margin;
                styles.left = '50%';
                styles.transform = 'translateX(-50%)';
                break;
            case 'top-right':
                styles.top = margin;
                styles.right = margin;
                break;
            case 'middle-left':
                styles.top = '50%';
                styles.left = margin;
                styles.transform = 'translateY(-50%)';
                break;
            case 'middle-right':
                styles.top = '50%';
                styles.right = margin;
                styles.transform = 'translateY(-50%)';
                break;
            case 'bottom-left':
                styles.bottom = margin;
                styles.left = margin;
                break;
            case 'bottom-center':
                styles.bottom = margin;
                styles.left = '50%';
                styles.transform = 'translateX(-50%)';
                break;
            default: // bottom-right
                styles.bottom = margin;
                styles.right = margin;
        }

        Object.assign(this.widget.style, styles);
        
        // Set data-position attribute for CSS targeting
        this.widget.setAttribute('data-position', this.config.position);
        
        // Set custom properties for CSS
        this.widget.style.setProperty('--widget-margin', margin);
        this.widget.style.setProperty('--button-radius', buttonRadius);
    }

    applyButtonStyles() {
        this.toggle.style.cssText = `
            width: ${this.config.buttonSize}px;
            height: ${this.config.buttonSize}px;
            border-radius: 50%;
            background: ${this.config.buttonColor};
            color: white;
            border: none;
            cursor: pointer;
            font-size: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;

        // Hover-Effekt
        this.toggle.addEventListener('mouseenter', () => {
            this.toggle.style.background = this.config.buttonHoverColor;
            this.toggle.style.transform = 'scale(1.1)';
        });

        this.toggle.addEventListener('mouseleave', () => {
            this.toggle.style.background = this.config.buttonColor;
            this.toggle.style.transform = 'scale(1)';
        });
    }

    bindEvents() {
        // Toggle Panel
        this.toggle.addEventListener('click', () => {
            this.panel.classList.toggle('active');
            this.toggle.setAttribute('aria-expanded', this.panel.classList.contains('active'));
        });

        // Close Panel
        this.closeBtn = document.getElementById('accessibility-close');
        this.closeBtn.addEventListener('click', () => {
            this.panel.classList.remove('active');
            this.toggle.setAttribute('aria-expanded', 'false');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.widget.contains(e.target)) {
                this.panel.classList.remove('active');
                this.toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Button Actions
        this.buttons = document.querySelectorAll('.accessibility-btn');
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                this.handleAction(action, button);
            });
        });
    }

    handleAction(action, button) {
        switch(action) {
            case 'high-contrast':
                this.toggleHighContrast(button);
                break;
            case 'invert-colors':
                this.toggleInvertColors(button);
                break;
            case 'increase-font':
                this.increaseFontSize();
                break;
            case 'decrease-font':
                this.decreaseFontSize();
                break;
            case 'reset-font':
                this.resetFontSize();
                break;
            case 'focus-links':
                this.toggleFocusLinks(button);
                break;
            case 'reading-guide':
                this.toggleReadingGuide(button);
                break;
            case 'reduce-motion':
                this.toggleReduceMotion(button);
                break;
            case 'speak-page':
                this.stopSpeaking();
                const text = document.body.innerText;
                this.speak(text);
                break;
            case 'speak-element':
                this.toggleElementSpeaking(button);
                break;
            case 'stop-speaking':
                this.stopSpeaking();
                break;
        }
    }

    toggleHighContrast(button) {
        document.body.classList.toggle('high-contrast');
        button.classList.toggle('active');
        this.saveSetting('high-contrast', document.body.classList.contains('high-contrast'));
    }

    toggleInvertColors(button) {
        document.body.classList.toggle('inverted');
        button.classList.toggle('active');
        this.saveSetting('inverted', document.body.classList.contains('inverted'));
    }

    increaseFontSize() {
        const currentSize = getComputedStyle(document.body).fontSize;
        const currentValue = parseFloat(currentSize);
        const newValue = Math.min(currentValue * 1.1, 24);
        document.body.style.fontSize = newValue + 'px';
        this.saveSetting('font-size', newValue);
    }

    decreaseFontSize() {
        const currentSize = getComputedStyle(document.body).fontSize;
        const currentValue = parseFloat(currentSize);
        const newValue = Math.max(currentValue * 0.9, 12);
        document.body.style.fontSize = newValue + 'px';
        this.saveSetting('font-size', newValue);
    }

    resetFontSize() {
        document.body.style.fontSize = '';
        this.saveSetting('font-size', null);
    }

    toggleFocusLinks(button) {
        document.body.classList.toggle('focus-links');
        button.classList.toggle('active');
        this.saveSetting('focus-links', document.body.classList.contains('focus-links'));
    }

    toggleReadingGuide(button) {
        document.body.classList.toggle('reading-guide');
        button.classList.toggle('active');
        this.saveSetting('reading-guide', document.body.classList.contains('reading-guide'));
    }

    toggleReduceMotion(button) {
        document.body.classList.toggle('reduce-motion');
        button.classList.toggle('active');
        this.saveSetting('reduce-motion', document.body.classList.contains('reduce-motion'));
    }

    getGermanVoice() {
        return new Promise(resolve => {
            const getVoices = () => {
                const voices = this.speechSynthesis.getVoices();
                if (voices.length > 0) {
                    console.log(this.t('availableVoices'), voices.map(v => `${v.name} (${v.lang})`));
                    
                    // Mac-spezifische Erkennung
                    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
                    
                    let selectedVoice = null;
                    
                    if (isMac) {
                        // Auf Mac: Anna bevorzugen, dann andere deutsche Stimmen
                        const annaVoice = voices.find(v => v.name === 'Anna' && v.lang.startsWith('de'));
                        const germanFemaleVoice = voices.find(v => v.lang.startsWith('de') && v.name.toLowerCase().includes('female'));
                        const anyGermanVoice = voices.find(v => v.lang.startsWith('de'));
                        
                        selectedVoice = annaVoice || germanFemaleVoice || anyGermanVoice;
                    } else {
                        // Auf anderen Systemen: Deutsche weibliche Stimme bevorzugen
                        const germanFemaleVoice = voices.find(v => v.lang.startsWith('de') && v.name.toLowerCase().includes('female'));
                        const anyGermanVoice = voices.find(v => v.lang.startsWith('de'));
                        
                        selectedVoice = germanFemaleVoice || anyGermanVoice;
                    }

                    if (selectedVoice) {
                        console.log(this.t('selectedVoice'), selectedVoice.name);
                    } else {
                        console.log(this.t('noGermanVoiceFound'));
                    }
                    resolve(selectedVoice);
                }
            };

            if (this.speechSynthesis.getVoices().length > 0) {
                getVoices();
            } else {
                this.speechSynthesis.onvoiceschanged = getVoices;
            }
        });
    }

    async speak(text) {
        if (!text || this.speechSynthesis.speaking) {
            return;
        }

        this.currentUtterance = new SpeechSynthesisUtterance(text);
        const voice = await this.getGermanVoice();
        if (voice) {
            this.currentUtterance.voice = voice;
        }
        this.currentUtterance.rate = 0.9;
        this.currentUtterance.pitch = 1;

        this.currentUtterance.onstart = () => {
            this.isSpeaking = true;
            this.speakingIndicator.classList.add('active');
        };

        this.currentUtterance.onend = () => {
            this.stopSpeaking();
        };
        
        this.        currentUtterance.onerror = (event) => {
            console.error(this.t('speechError'), event.error);
            this.stopSpeaking();
        };

        this.speechSynthesis.speak(this.currentUtterance);
    }

    toggleElementSpeaking(button) {
        this.isElementSpeakingMode = !this.isElementSpeakingMode;

        if (this.isElementSpeakingMode) {
            button.classList.add('active');
            document.body.style.cursor = 'crosshair';
            document.addEventListener('click', this.handleElementClick.bind(this), true);

            // Zentrales Overlay anzeigen
            let instruction = document.getElementById('speaking-instruction');
            if (!instruction) {
                instruction = document.createElement('div');
                instruction.id = 'speaking-instruction';
                instruction.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: ${this.config.buttonColor};
                    color: white;
                    padding: 24px 32px;
                    border-radius: 12px;
                    z-index: 2147483647;
                    text-align: center;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                    font-size: 1.15rem;
                `;
                instruction.innerHTML = `
                    <h3 style="margin-top:0">${this.t('elementReadingTitle')}</h3>
                    <p>${this.t('elementReadingText')}</p>
                    <button id="cancel-element-speaking" style="margin-top: 16px; padding: 8px 20px; border: none; border-radius: 5px; background: white; color: ${this.config.buttonColor}; cursor: pointer; font-weight:600;">${this.t('cancel')}</button>
                `;
                document.documentElement.appendChild(instruction);
                document.getElementById('cancel-element-speaking').onclick = () => this.stopSpeaking();
            }
        } else {
            this.stopSpeaking();
        }
    }

    handleElementClick(e) {
        if (!this.isElementSpeakingMode) return;

        // Wenn auf das Overlay oder ein Kind davon geklickt wurde, nichts tun
        const instruction = document.getElementById('speaking-instruction');
        if (instruction && (e.target === instruction || instruction.contains(e.target))) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        const target = e.target;
        let text = '';

        if (target.matches('img') && target.alt) {
            text = target.alt;
        } else if (target.matches('a') && target.innerText) {
            text = target.innerText + ' - Link';
        } else if (target.matches('button') && target.innerText) {
            text = target.innerText + ' - Button';
        } else {
            text = target.innerText;
        }

        if (text) {
            this.speak(text.trim());
        }

        // Overlay entfernen
        if (instruction) instruction.remove();
    }

    stopSpeaking() {
        this.speechSynthesis.cancel();
        this.isSpeaking = false;

        if (this.isElementSpeakingMode) {
            document.body.style.cursor = 'default';
            document.removeEventListener('click', this.handleElementClick.bind(this), true);
            const speakElementBtn = document.querySelector('[data-action="speak-element"]');
            if(speakElementBtn) speakElementBtn.classList.remove('active');
            this.isElementSpeakingMode = false;
        }

        // Overlay entfernen
        const instruction = document.getElementById('speaking-instruction');
        if (instruction) instruction.remove();

        const speakPageBtn = document.querySelector('[data-action="speak-page"]');
        if(speakPageBtn) speakPageBtn.classList.remove('active');

        this.speakingIndicator.classList.remove('active');
        this.currentUtterance = null;
    }

    saveSetting(key, value) {
        const settings = JSON.parse(localStorage.getItem('accessibility-settings') || '{}');
        if (value === null) {
            delete settings[key];
        } else {
            settings[key] = value;
        }
        localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('accessibility-settings') || '{}');
        
        if (settings['high-contrast']) {
            document.body.classList.add('high-contrast');
            document.querySelector('[data-action="high-contrast"]').classList.add('active');
        }
        
        if (settings['inverted']) {
            document.body.classList.add('inverted');
            document.querySelector('[data-action="invert-colors"]').classList.add('active');
        }
        
        if (settings['font-size']) {
            document.body.style.fontSize = settings['font-size'] + 'px';
        }
        
        if (settings['focus-links']) {
            document.body.classList.add('focus-links');
            document.querySelector('[data-action="focus-links"]').classList.add('active');
        }
        
        if (settings['reading-guide']) {
            document.body.classList.add('reading-guide');
            document.querySelector('[data-action="reading-guide"]').classList.add('active');
        }
        
        if (settings['reduce-motion']) {
            document.body.classList.add('reduce-motion');
            document.querySelector('[data-action="reduce-motion"]').classList.add('active');
        }
    }

    show() {
        this.widget.style.display = 'block';
    }

    hide() {
        this.widget.style.display = 'none';
    }

    destroy() {
        if (this.widget && this.widget.parentNode) {
            this.widget.parentNode.removeChild(this.widget);
        }
        if (this.speakingIndicator && this.speakingIndicator.parentNode) {
            this.speakingIndicator.parentNode.removeChild(this.speakingIndicator);
        }
    }
}

// Globale Funktion für einfache Initialisierung
window.initAccessibilityWidget = function(config) {
    return new AccessibilityWidget(config);
}; 