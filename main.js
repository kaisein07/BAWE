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

// Afficher les détails d'une chambre
function showRoomDetails(roomId) {
    const room = currentRooms.find(r => r.id === roomId);
    if (!room) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'roomModal';
    modal.setAttribute('tabindex', '-1');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${room.type}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${room.image}" class="img-fluid rounded mb-3" alt="${room.type}">
                        </div>
                        <div class="col-md-6">
                            <div class="room-price mb-3">${formatPrice(room.price)} ${room.currency}/nuit</div>
                            <p>${room.description}</p>
                            <div class="mb-3">
                                <strong>Capacité:</strong> ${room.capacity} personnes
                            </div>
                            <div class="mb-3">
                                <strong>Équipements:</strong>
                                <ul class="list-unstyled mt-2">
                                    ${room.amenities.map(amenity => `<li><i class="fas fa-check text-success me-2"></i>${amenity}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    <a href="https://wa.me/${currentResidenceInfo.whatsapp.replace(/\s/g, '')}?text=Bonjour, je souhaite réserver une ${room.type}" 
                       class="btn btn-primary" target="_blank">
                        <i class="fab fa-whatsapp me-2"></i>Réserver
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
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
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
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
    document.querySelectorAll('.card, .service-item, .gallery- class="nav-link" href="item').forEach(el => {
        observer.observe(el);
    });
}

// Fonctions utilitaires
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Recherche et filtrage
function filterRooms(criteria) {
    let filteredRooms = currentRooms.filter(room => room.available);
    
    if (criteria.maxPrice) {
        filteredRooms = filteredRooms.filter(room => room.price <= criteria.maxPrice);
    }
    
    if (criteria.minCapacity) {
        filteredRooms = filteredRooms.filter(room => room.capacity >= criteria.minCapacity);
    }
    
    if (criteria.amenities && criteria.amenities.length > 0) {
        filteredRooms = filteredRooms.filter(room => 
            criteria.amenities.every(amenity => 
                room.amenities.some(roomAmenity => 
                    roomAmenity.toLowerCase().includes(amenity.toLowerCase())
                )
            )
        );
    }
    
    return filteredRooms;
}

// Mise à jour des informations de contact
function updateContactInfo() {
    const contactItems = document.querySelectorAll('.contact-item span');
    if (contactItems.length >= 4) {
        contactItems[0].textContent = currentResidenceInfo.address;
        contactItems[1].textContent = currentResidenceInfo.phone;
        contactItems[2].textContent = currentResidenceInfo.whatsapp;
        contactItems[3].textContent = currentResidenceInfo.email;
    }
}

// Performance monitoring
function measurePageLoadTime() {
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log('Page load time:', loadTime, 'ms');
    });
}

// Initialiser la mesure de performance
measurePageLoadTime();

// Gestion des erreurs globales
window.addEventListener('error', function(event) {
    console.error('Erreur JavaScript:', event.error);
});

// Gestion des promesses rejetées
window.addEventListener('unhandledrejection', function(event) {
    console.error('Promesse rejetée:', event.reason);
});

// Export des fonctions pour l'admin
window.roomsManagement = {
    getRooms: () => currentRooms,
    addRoom: (room) => {
        room.id = generateId();
        currentRooms.push(room);
        saveData('roomsData', currentRooms);
        renderRooms();
    },
    updateRoom: (roomId, updates) => {
        const roomIndex = currentRooms.findIndex(r => r.id === roomId);
        if (roomIndex !== -1) {
            currentRooms[roomIndex] = { ...currentRooms[roomIndex], ...updates };
            saveData('roomsData', currentRooms);
            renderRooms();
        }
    },
    deleteRoom: (roomId) => {
        currentRooms = currentRooms.filter(r => r.id !== roomId);
        saveData('roomsData', currentRooms);
        renderRooms();
    }
};

window.servicesManagement = {
    getServices: () => currentServices,
    addService: (service) => {
        service.id = generateId();
        currentServices.push(service);
        saveData('servicesData', currentServices);
        renderServices();
    },
    updateService: (serviceId, updates) => {
        const serviceIndex = currentServices.findIndex(s => s.id === serviceId);
        if (serviceIndex !== -1) {
            currentServices[serviceIndex] = { ...currentServices[serviceIndex], ...updates };
            saveData('servicesData', currentServices);
            renderServices();
        }
    },
    deleteService: (serviceId) => {
        currentServices = currentServices.filter(s => s.id !== serviceId);
        saveData('servicesData', currentServices);
        renderServices();
    }
};

window.galleryManagement = {
    getGallery: () => currentGallery,
    addImage: (image) => {
        image.id = generateId();
        currentGallery.push(image);
        saveData('galleryData', currentGallery);
        renderGallery();
    },
    updateImage: (imageId, updates) => {
        const imageIndex = currentGallery.findIndex(i => i.id === imageId);
        if (imageIndex !== -1) {
            currentGallery[imageIndex] = { ...currentGallery[imageIndex], ...updates };
            saveData('galleryData', currentGallery);
            renderGallery();
        }
    },
    deleteImage: (imageId) => {
        currentGallery = currentGallery.filter(i => i.id !== imageId);
        saveData('galleryData', currentGallery);
        renderGallery();
    }
};

window.contactsManagement = {
    getContacts: () => currentContacts,
    updateContactStatus: (contactId, status) => {
        const contactIndex = currentContacts.findIndex(c => c.id === contactId);
        if (contactIndex !== -1) {
            currentContacts[contactIndex].status = status;
            saveData('contactsData', currentContacts);
        }
    },
    deleteContact: (contactId) => {
        currentContacts = currentContacts.filter(c => c.id !== contactId);
        saveData('contactsData', currentContacts);
    }
};