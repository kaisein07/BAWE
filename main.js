
// Variables globales
let currentRooms = [];
let currentServices = [];
let currentGallery = [];
let currentContacts = [];
let currentResidenceInfo = {};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadDataFromStorage();
    renderRooms();
    renderServices();
    renderGallery();
    initializeContactForm();
    initializeNavigation();
    initializeAnimations();
});

// Charger les données depuis le localStorage
function loadDataFromStorage() {
    currentRooms = loadData('roomsData', roomsData);
    currentServices = loadData('servicesData', servicesData);
    currentGallery = loadData('galleryData', galleryData);
    currentContacts = loadData('contactsData', contactsData);
    currentResidenceInfo = loadData('residenceInfo', residenceInfo);
}

// Rendu des chambres
function renderRooms() {
    const container = document.getElementById('rooms-container');
    if (!container) return;

    container.innerHTML = '';
    
    currentRooms.filter(room => room.available).forEach(room => {
        const roomCard = createRoomCard(room);
        container.appendChild(roomCard);
    });
}

// Créer une carte de chambre
function createRoomCard(room) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    const amenitiesList = room.amenities.map(amenity => 
        `<li><i class="fas fa-check-circle text-success me-2"></i>${amenity}</li>`
    ).join('');
    
    col.innerHTML = `
        <div class="card room-card h-100">
            <div class="card-header">
                <h4 class="mb-0">${room.type}</h4>
            </div>
            <img src="${room.image}" class="card-img-top" alt="${room.type}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <div class="room-price mb-3">${formatPrice(room.price)} ${room.currency}/nuit</div>
                <p class="card-text">${room.description}</p>
                <div class="mb-3">
                    <small class="text-muted">
                        <i class="fas fa-users me-1"></i>Capacité: ${room.capacity} personnes
                    </small>
                </div>
                <h6>Équipements inclus:</h6>
                <ul class="room-amenities">
                    ${amenitiesList}
                </ul>
            </div>
            <div class="card-footer">
                <div class="d-grid gap-2">
                    <a href="https://wa.me/${currentResidenceInfo.whatsapp.replace(/\s/g, '')}?text=Bonjour, je souhaite réserver une ${room.type}" 
                       class="btn btn-primary" target="_blank">
                        <i class="fab fa-whatsapp me-2"></i>Réserver maintenant
                    </a>
                    <button class="btn btn-outline-primary" onclick="showRoomDetails(${room.id})">
                        <i class="fas fa-info-circle me-2"></i>Plus de détails
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Rendu des services
function renderServices() {
    const container = document.getElementById('services-container');
    if (!container) return;

    container.innerHTML = '';
    
    currentServices.filter(service => service.active).forEach(service => {
        const serviceCard = createServiceCard(service);
        container.appendChild(serviceCard);
    });
}

// Créer une carte de service
function createServiceCard(service) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
    
    col.innerHTML = `
        <div class="service-item">
            <i class="${service.icon}"></i>
            <h4>${service.name}</h4>
            <p class="text-muted">${service.description}</p>
        </div>
    `;
    
    return col;
}

// Rendu de la galerie
function renderGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    container.innerHTML = '';
    
    currentGallery.filter(image => image.active).forEach(image => {
        const galleryItem = createGalleryItem(image);
        container.appendChild(galleryItem);
    });
}

// Créer un élément de galerie
function createGalleryItem(image) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    col.innerHTML = `
        <div class="gallery-item" onclick="showImageModal('${image.url}', '${image.caption}')">
            <img src="${image.url}" alt="${image.caption}" class="img-fluid">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        </div>
    `;
    
    return col;
}

// Afficher l'image dans un modal
function showImageModal(imageUrl, caption) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalLabel = document.getElementById('imageModalLabel');
    
    modalImage.src = imageUrl;
    modalImage.alt = caption;
    modalLabel.textContent = caption;
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// Initialiser le formulaire de contact
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', handleContactSubmit);
}

// Gérer la soumission du formulaire de contact
function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        id: generateId(),
        name: formData.get('name') || document.getElementById('name').value,
        email: formData.get('email') || document.getElementById('email').value,
        phone: formData.get('phone') || document.getElementById('phone').value,
        subject: formData.get('subject') || document.getElementById('subject').value,
        message: formData.get('message') || document.getElementById('message').value,
        created_at: new Date().toISOString(),
        status: 'new'
    };
    
    // Validation
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
        showAlert('Veuillez remplir tous les champs obligatoires.', 'warning');
        return;
    }
    
    // Sauvegarder le contact
    currentContacts.push(contactData);
    saveData('contactsData', currentContacts);
    
    // Afficher un message de succès
    showAlert('Votre message a été envoyé avec succès! Nous vous recontacterons bientôt.', 'success');
    
    // Réinitialiser le formulaire
    event.target.reset();
    
    // Rediriger vers WhatsApp
    const whatsappMessage = `Bonjour, je viens d'envoyer un message via le site web. Voici mes informations:
Nom: ${contactData.name}
Email: ${contactData.email}
Sujet: ${contactData.subject}
Message: ${contactData.message}`;
    
    const whatsappUrl = `https://wa.me/${currentResidenceInfo.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Afficher une alerte
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('#contact .container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-dismiss après 5 secondes
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Initialiser la navigation
function initializeNavigation() {
    // Smooth scrolling pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Mettre à jour le lien WhatsApp dans la navigation
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${currentResidenceInfo.whatsapp.replace(/\s/g, '')}?text=Bonjour, je souhaite réserver une chambre`;
    }
}

// Initialiser les animations
function initializeAnimations() {
    // Intersection Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments avec animation
    document.querySelectorAll('.card, .service-item, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}
