// Global JavaScript for HealthIntelli

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.createToggleButton();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        this.updateToggleButton();
    }

    createToggleButton() {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'theme-toggle';
        toggleButton.innerHTML = this.currentTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        toggleButton.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(toggleButton);
    }

    updateToggleButton() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.innerHTML = this.currentTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        }
    }
}

// User Management
class UserManager {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    login(email, password, role) {
        // Simple validation (in real app, this would be server-side)
        if (email && password && role) {
            const user = {
                email: email,
                role: role,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getRole() {
        return this.currentUser ? this.currentUser.role : null;
    }
}

// Form Validation
class FormValidator {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePassword(password) {
        return password.length >= 6;
    }

    static validateRequired(value) {
        return value.trim() !== '';
    }

    static showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.textContent = message;
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    static clearErrors() {
        const errors = document.querySelectorAll('.alert-error');
        errors.forEach(error => error.remove());
    }
}

// API Simulation
class APISimulator {
    static async checkSymptoms(symptoms) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simple symptom checking logic
        const responses = {
            'fever': 'Possible viral infection. Consider rest and hydration. Consult a doctor if fever persists.',
            'headache': 'Could be tension headache or dehydration. Try rest and water. See a doctor if severe.',
            'cough': 'Possible respiratory infection. Monitor symptoms and consult a doctor if worsening.',
            'stomach pain': 'Could be digestive issue. Avoid heavy foods. See a doctor if pain persists.',
            'fatigue': 'Could be due to stress or lack of sleep. Ensure adequate rest. Consult if ongoing.'
        };

        const lowerSymptoms = symptoms.toLowerCase();
        for (const [symptom, response] of Object.entries(responses)) {
            if (lowerSymptoms.includes(symptom)) {
                return {
                    diagnosis: `Likely related to: ${symptom}`,
                    recommendation: response,
                    severity: 'Mild to Moderate',
                    disclaimer: 'This is not a medical diagnosis. Please consult a healthcare professional for proper evaluation.'
                };
            }
        }

        return {
            diagnosis: 'Unable to determine specific condition',
            recommendation: 'Please describe your symptoms in more detail or consult a healthcare professional.',
            severity: 'Unknown',
            disclaimer: 'This is not a medical diagnosis. Please consult a healthcare professional for proper evaluation.'
        };
    }

    static async getDoctors() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return [
            {
                id: 1,
                name: 'Dr. Sarah Johnson',
                specialization: 'General Medicine',
                image: '/assets/images/image.png',
                rating: 4.8,
                experience: '10 years'
            },
            {
                id: 2,
                name: 'Dr. Neelam Mohan',
                specialization: 'Cardiology',
                image: '/assets/images/image2.jpg',
                rating: 4.9,
                experience: '15 years'
            },
            {
                id: 3,
                name: 'Dr. Raj Patel',
                specialization: 'Pediatrics',
                image: '/assets/images/image3.jpg',
                rating: 4.7,
                experience: '8 years'
            },
            {
                id: 4,
                name: 'Dr. David Wilson',
                specialization: 'Orthopedics',
                image: '/assets/images/image4.jpg',
                rating: 4.6,
                experience: '12 years'
            }
        ];
    }
}

// Security Features
class SecurityManager {
    constructor() {
        this.failedAttempts = parseInt(localStorage.getItem('failedAttempts')) || 0;
        this.lastFailedAttempt = localStorage.getItem('lastFailedAttempt');
    }

    recordFailedAttempt() {
        this.failedAttempts++;
        this.lastFailedAttempt = new Date().toISOString();
        localStorage.setItem('failedAttempts', this.failedAttempts.toString());
        localStorage.setItem('lastFailedAttempt', this.lastFailedAttempt);

        if (this.failedAttempts >= 3) {
            this.showSecurityAlert();
        }
    }

    resetFailedAttempts() {
        this.failedAttempts = 0;
        localStorage.removeItem('failedAttempts');
        localStorage.removeItem('lastFailedAttempt');
    }

    showSecurityAlert() {
        alert('Security Alert: Multiple failed login attempts detected. Please verify your credentials or contact support.');
    }

    generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }
}

// Utility Functions
class Utils {
    static formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    static formatTime(time) {
        return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    static showLoader(container) {
        const loader = document.createElement('div');
        loader.className = 'loader';
        container.appendChild(loader);
        return loader;
    }

    static hideLoader(loader) {
        if (loader && loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }

    static showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        document.body.insertBefore(alert, document.body.firstChild);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 5000);
    }
}

// Initialize global instances
const themeManager = new ThemeManager();
const userManager = new UserManager();
const securityManager = new SecurityManager();

// Global event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add form validation to all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            FormValidator.clearErrors();
        });
    });
});

// Export for use in other files
window.HealthIntelli = {
    ThemeManager,
    UserManager,
    FormValidator,
    APISimulator,
    SecurityManager,
    Utils,
    themeManager,
    userManager,
    securityManager
};

