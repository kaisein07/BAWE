
// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.card, .service-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // Validation simple
            if (!formData.name || !formData.email || !formData.message) {
                showAlert('Veuillez remplir tous les champs obligatoires.', 'warning');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showAlert('Veuillez entrer une adresse email valide.', 'warning');
                return;
            }

            // Simuler l'envoi de l'email
            simulateEmailSend(formData);
        });
    }

    // Navigation active
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// Fonction pour afficher les images dans la galerie
function showImage(src) {
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.src = src;
    }
}

// Fonction pour simuler l'envoi d'email
function simulateEmailSend(formData) {
    // Afficher un indicateur de chargement
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
    submitBtn.disabled = true;

    // Simuler un délai d'envoi
    setTimeout(() => {
        // Créer le contenu de l'email
        const emailContent = `
Nouveau message depuis le site Résidence Bawé:

Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone || 'Non renseigné'}

Message:
${formData.message}

---
Envoyé depuis le site web de la Résidence Bawé
        `.trim();

        // Créer un lien mailto
        const mailtoLink = `mailto:babioaboudou93@gmail.com?subject=Nouveau message - Résidence Bawé&body=${encodeURIComponent(emailContent)}`;
        
        // Ouvrir le client email
        window.location.href = mailtoLink;

        // Afficher un message de succès
        showAlert('Votre client email va s\'ouvrir pour envoyer le message. Merci de votre intérêt !', 'success');

        // Réinitialiser le formulaire
        document.getElementById('contactForm').reset();

        // Restaurer le bouton
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Alternative: Redirection vers WhatsApp
        setTimeout(() => {
            const whatsappMessage = `Bonjour, je suis ${formData.name}. ${formData.message}`;
            const whatsappUrl = `https://wa.me/22996000000?text=${encodeURIComponent(whatsappMessage)}`;
            
            if (confirm('Voulez-vous également nous contacter via WhatsApp ?')) {
                window.open(whatsappUrl, '_blank');
            }
        }, 2000);

    }, 1500);
}

// Fonction pour afficher les alertes
function showAlert(message, type = 'info') {
    // Créer l'élément alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.5s ease;
    `;
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Ajouter au body
    document.body.appendChild(alertDiv);

    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Animation CSS pour les alertes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Fonction pour gérer les images de la galerie avec navigation
let currentImageIndex = 0;
const galleryImages = [
    'attached_assets/picture5_1753646596217.jpg',
    'attached_assets/picture6_1753646596182.jpg',
    'attached_assets/picture7_1753646596164.jpg',
    'attached_assets/picture8_1753646596148.jpg',
    'attached_assets/picture9_1753646596126.jpg',
    'attached_assets/picture10_1753646596119.jpg',
    'attached_assets/picture11_1753646596099.jpg',
    'attached_assets/picture12_1753646596086.jpg'
];

function showImage(src) {
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.src = src;
        currentImageIndex = galleryImages.indexOf(src);
    }
}

// Ajouter les boutons de navigation dans le modal
document.addEventListener('DOMContentLoaded', function() {
    const modalBody = document.querySelector('#galleryModal .modal-body');
    if (modalBody) {
        modalBody.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mt-3">
                <button class="btn btn-outline-primary" onclick="previousImage()">
                    <i class="fas fa-chevron-left"></i> Précédent
                </button>
                <span id="imageCounter" class="text-muted"></span>
                <button class="btn btn-outline-primary" onclick="nextImage()">
                    Suivant <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    }
});

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModalImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateModalImage();
}

function updateModalImage() {
    const modalImage = document.getElementById('modalImage');
    const imageCounter = document.getElementById('imageCounter');
    
    if (modalImage) {
        modalImage.src = galleryImages[currentImageIndex];
    }
    
    if (imageCounter) {
        imageCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
}

// Gestion du clavier dans le modal
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('galleryModal');
    if (modal && modal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Fonction pour optimiser le chargement des images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance: Précharger les images importantes
function preloadImages() {
    const importantImages = [
        'attached_assets/picture5_1753646596217.jpg',
        'attached_assets/picture6_1753646596182.jpg',
        'attached_assets/picture7_1753646596164.jpg'
    ];

    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialiser le préchargement
document.addEventListener('DOMContentLoaded', preloadImages);
