// Variables globales pour l'administration
let currentSection = 'dashboard';
let currentContactId = null;
let currentRoomId = null;
let currentImageId = null;
let currentServiceId = null;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    loadDashboard();
    initializeNavigation();
    initializeModals();
});

// Initialiser l'interface d'administration
function initializeAdmin() {
    // Mettre à jour les statistiques
    updateStats();
    
    // Charger les données initiales
    loadRecentContacts();
    loadRoomsTable();
    loadContactsTable();
    loadGalleryManagement();
    loadSettings();
}

// Initialiser la navigation
function initializeNavigation() {
    // Gestion des liens de navigation
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const section = this.getAttribute('href').substring(1);
                if (section !== 'dashboard') {
                    showSection(section);
                }
            }
        });
    });
}

// Afficher une section spécifique
function showSection(sectionName) {
    // Cacher toutes les sections
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'dashboard') {
            section.style.display = 'none';
        }
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        if (sectionName === 'dashboard') {
            targetSection.style.display = 'block';
            loadDashboard();
        } else {
            targetSection.style.display = 'block';
        }
    }
    
    // Mettre à jour la navigation active
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[href="#${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    currentSection = sectionName;
    
    // Charger les données spécifiques à chaque section
    switch(sectionName) {
        case 'rooms':
            loadRoomsTable();
            break;
        case 'contacts':
            loadContactsTable();
            break;
        case 'gallery':
            loadGalleryManagement();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Charger le dashboard
function loadDashboard() {
    document.getElementById('dashboard').style.display = 'block';
    updateStats();
    loadRecentContacts();
}

// Mettre à jour les statistiques
function updateStats() {
    const rooms = loadData('roomsData', roomsData);
    const contacts = loadData('contactsData', contactsData);
    const stats = loadData('adminStats', adminStats);
    
    const availableRooms = rooms.filter(room => room.available).length;
    const occupancyRate = ((rooms.length - availableRooms) / rooms.length * 100).toFixed(0);
    
    document.getElementById('totalRooms').textContent = rooms.length;
    document.getElementById('availableRooms').textContent = availableRooms;
    document.getElementById('totalContacts').textContent = contacts.length;
    document.getElementById('averageRating').textContent = stats.averageRating;
    document.getElementById('monthlyRevenue').textContent = formatPrice(stats.monthlyRevenue) + ' FCFA';
    document.getElementById('totalGuests').textContent = stats.totalGuests;
    document.getElementById('occupancyRate').textContent = occupancyRate + '%';
}

// Charger les contacts récents
function loadRecentContacts() {
    const contacts = loadData('contactsData', contactsData);
    const recentContacts = contacts.slice(-5).reverse();
    
    const container = document.getElementById('recentContacts');
    container.innerHTML = '';
    
    recentContacts.forEach(contact => {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'border-bottom pb-2 mb-2';
        contactDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>${contact.name}</strong><br>
                    <small class="text-muted">${contact.subject}</small>
                </div>
                <div class="text-end">
                    <span class="badge bg-${getStatusColor(contact.status)}">${getStatusLabel(contact.status)}</span><br>
                    <small class="text-muted">${formatDate(contact.created_at)}</small>
                </div>
            </div>
        `;
        container.appendChild(contactDiv);
    });
}

// Charger la table des chambres
function loadRoomsTable() {
    const rooms = loadData('roomsData', roomsData);
    const tbody = document.getElementById('roomsTable');
    
    tbody.innerHTML = '';
    
    rooms.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${room.type}</td>
            <td>${formatPrice(room.price)} FCFA</td>
            <td>${room.capacity} personnes</td>
            <td>
                <span class="badge bg-${room.available ? 'success' : 'danger'}">
                    ${room.available ? 'Disponible' : 'Indisponible'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editRoom(${room.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteRoom(${room.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Charger la table des contacts
function loadContactsTable() {
    const contacts = loadData('contactsData', contactsData);
    const tbody = document.getElementById('contactsTable');
    
    tbody.innerHTML = '';
    
    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(contact.created_at)}</td>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${getSubjectLabel(contact.subject)}</td>
            <td>
                <span class="badge bg-${getStatusColor(contact.status)}">
                    ${getStatusLabel(contact.status)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-2" onclick="viewContact(${contact.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteContact(${contact.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Charger la gestion de la galerie
function loadGalleryManagement() {
    const gallery = loadData('galleryData', galleryData);
    const container = document.getElementById('galleryManagement');
    
    container.innerHTML = '';
    
    gallery.forEach(image => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card">
                <img src="${image.url}" class="card-img-top" alt="${image.caption}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h6 class="card-title">${image.caption}</h6>
                    <p class="card-text">
                        <small class="text-muted">Catégorie: ${image.category}</small><br>
                        <span class="badge bg-${image.active ? 'success' : 'danger'}">
                            ${image.active ? 'Active' : 'Inactive'}
                        </span>
                    </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="editImage(${image.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteImage(${image.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Charger les paramètres
function loadSettings() {
    const residenceInfo = loadData('residenceInfo', residenceInfo);
    const services = loadData('servicesData', servicesData);
    
    // Remplir le formulaire d'informations de contact
    document.getElementById('residenceName').value = residenceInfo.name || '';
    document.getElementById('residencePhone').value = residenceInfo.phone || '';
    document.getElementById('residenceWhatsapp').value = residenceInfo.whatsapp || '';
    document.getElementById('residenceEmail').value = residenceInfo.email || '';
    document.getElementById('residenceAddress').value = residenceInfo.address || '';
    document.getElementById('residenceDescription').value = residenceInfo.description || '';
    
    // Charger la liste des services
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = '';
    
    services.forEach(service => {
        const serviceDiv = document.createElement('div');
        serviceDiv.className = 'mb-3 p-3 border rounded';
        serviceDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <i class="${service.icon} me-2"></i>
                    <strong>${service.name}</strong>
                    <br><small class="text-muted">${service.description}</small>
                </div>
                <div>
                    <span class="badge bg-${service.active ? 'success' : 'danger'} me-2">
                        ${service.active ? 'Actif' : 'Inactif'}
                    </span>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editService(${service.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteService(${service.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        servicesList.appendChild(serviceDiv);
    });
}

// Fonctions pour les chambres
function editRoom(roomId) {
    const rooms = loadData('roomsData', roomsData);
    const room = rooms.find(r => r.id === roomId);
    
    if (room) {
        currentRoomId = roomId;
        document.getElementById('roomId').value = roomId;
        document.getElementById('roomType').value = room.type;
        document.getElementById('roomPrice').value = room.price;
        document.getElementById('roomCapacity').value = room.capacity;
        document.getElementById('roomAvailable').value = room.available.toString();
        document.getElementById('roomDescription').value = room.description;
        document.getElementById('roomImage').value = room.image;
        document.getElementById('roomAmenities').value = room.amenities.join('\n');
        
        const modal = new bootstrap.Modal(document.getElementById('roomModal'));
        modal.show();
    }
}

function saveRoom() {
    const roomId = document.getElementById('roomId').value;
    const roomData = {
        type: document.getElementById('roomType').value,
        price: parseInt(document.getElementById('roomPrice').value),
        capacity: parseInt(document.getElementById('roomCapacity').value),
        available: document.getElementById('roomAvailable').value === 'true',
        description: document.getElementById('roomDescription').value,
        image: document.getElementById('roomImage').value,
        amenities: document.getElementById('roomAmenities').value.split('\n').filter(a => a.trim()),
        currency: 'FCFA'
    };
    
    let rooms = loadData('roomsData', roomsData);
    
    if (roomId) {
        // Modifier une chambre existante
        const roomIndex = rooms.findIndex(r => r.id == roomId);
        if (roomIndex !== -1) {
            rooms[roomIndex] = { ...rooms[roomIndex], ...roomData };
        }
    } else {
        // Ajouter une nouvelle chambre
        roomData.id = generateId();
        rooms.push(roomData);
    }
    
    saveData('roomsData', rooms);
    loadRoomsTable();
    updateStats();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('roomModal'));
    modal.hide();
    
    // Réinitialiser le formulaire
    document.getElementById('roomForm').reset();
    document.getElementById('roomId').value = '';
    currentRoomId = null;
}

function deleteRoom(roomId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
        let rooms = loadData('roomsData', roomsData);
        rooms = rooms.filter(r => r.id !== roomId);
        saveData('roomsData', rooms);
        loadRoomsTable();
        updateStats();
    }
}

// Fonctions pour les contacts
function viewContact(contactId) {
    const contacts = loadData('contactsData', contactsData);
    const contact = contacts.find(c => c.id === contactId);
    
    if (contact) {
        currentContactId = contactId;
        const detailsDiv = document.getElementById('contactDetails');
        detailsDiv.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Informations personnelles</h6>
                    <p><strong>Nom:</strong> ${contact.name}</p>
                    <p><strong>Email:</strong> ${contact.email}</p>
                    <p><strong>Téléphone:</strong> ${contact.phone || 'Non renseigné'}</p>
                    <p><strong>Sujet:</strong> ${getSubjectLabel(contact.subject)}</p>
                    <p><strong>Date:</strong> ${formatDate(contact.created_at)}</p>
                    <p><strong>Statut:</strong> 
                        <span class="badge bg-${getStatusColor(contact.status)}">
                            ${getStatusLabel(contact.status)}
                        </span>
                    </p>
                </div>
                <div class="col-md-6">
                    <h6>Message</h6>
                    <div class="border p-3 rounded bg-light">
                        ${contact.message}
                    </div>
                </div>
            </div>
        `;
        
        const modal = new bootstrap.Modal(document.getElementById('contactModal'));
        modal.show();
    }
}

function markAsRead() {
    if (currentContactId) {
        let contacts = loadData('contactsData', contactsData);
        const contactIndex = contacts.findIndex(c => c.id === currentContactId);
        if (contactIndex !== -1) {
            contacts[contactIndex].status = 'read';
            saveData('contactsData', contacts);
            loadContactsTable();
            loadRecentContacts();
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            modal.hide();
        }
    }
}

function deleteContact(contactId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
        let contacts = loadData('contactsData', contactsData);
        contacts = contacts.filter(c => c.id !== contactId);
        saveData('contactsData', contacts);
        loadContactsTable();
        loadRecentContacts();
        updateStats();
    }
}

// Fonctions pour la galerie
function editImage(imageId) {
    const gallery = loadData('galleryData', galleryData);
    const image = gallery.find(i => i.id === imageId);
    
    if (image) {
        currentImageId = imageId;
        document.getElementById('imageId').value = imageId;
        document.getElementById('imageCaption').value = image.caption;
        document.getElementById('imageUrl').value = image.url;
        document.getElementById('imageCategory').value = image.category;
        document.getElementById('imageActive').value = image.active.toString();
        
        const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
        modal.show();
    }
}

function saveImage() {
    const imageId = document.getElementById('imageId').value;
    const imageData = {
        caption: document.getElementById('imageCaption').value,
        url: document.getElementById('imageUrl').value,
        category: document.getElementById('imageCategory').value,
        active: document.getElementById('imageActive').value === 'true'
    };
    
    let gallery = loadData('galleryData', galleryData);
    
    if (imageId) {
        // Modifier une image existante
        const imageIndex = gallery.findIndex(i => i.id == imageId);
        if (imageIndex !== -1) {
            gallery[imageIndex] = { ...gallery[imageIndex], ...imageData };
        }
    } else {
        // Ajouter une nouvelle image
        imageData.id = generateId();
        gallery.push(imageData);
    }
    
    saveData('galleryData', gallery);
    loadGalleryManagement();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('galleryModal'));
    modal.hide();
    
    // Réinitialiser le formulaire
    document.getElementById('galleryForm').reset();
    document.getElementById('imageId').value = '';
    currentImageId = null;
}

function deleteImage(imageId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
        let gallery = loadData('galleryData', galleryData);
        gallery = gallery.filter(i => i.id !== imageId);
        saveData('galleryData', gallery);
        loadGalleryManagement();
    }
}

// Fonctions pour les services
function editService(serviceId) {
    const services = loadData('servicesData', servicesData);
    const service = services.find(s => s.id === serviceId);
    
    if (service) {
        currentServiceId = serviceId;
        document.getElementById('serviceId').value = serviceId;
        document.getElementById('serviceName').value = service.name;
        document.getElementById('serviceDescription').value = service.description;
        document.getElementById('serviceIcon').value = service.icon;
        document.getElementById('serviceActive').value = service.active.toString();
        
        const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
        modal.show();
    }
}

function saveService() {
    const serviceId = document.getElementById('serviceId').value;
    const serviceData = {
        name: document.getElementById('serviceName').value,
        description: document.getElementById('serviceDescription').value,
        icon: document.getElementById('serviceIcon').value,
        active: document.getElementById('serviceActive').value === 'true'
    };
    
    let services = loadData('servicesData', servicesData);
    
    if (serviceId) {
        // Modifier un service existant
        const serviceIndex = services.findIndex(s => s.id == serviceId);
        if (serviceIndex !== -1) {
            services[serviceIndex] = { ...services[serviceIndex], ...serviceData };
        }
    } else {
        // Ajouter un nouveau service
        serviceData.id = generateId();
        services.push(serviceData);
    }
    
    saveData('servicesData', services);
    loadSettings();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('serviceModal'));
    modal.hide();
    
    // Réinitialiser le formulaire
    document.getElementById('serviceForm').reset();
    document.getElementById('serviceId').value = '';
    currentServiceId = null;
}

function deleteService(serviceId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
        let services = loadData('servicesData', servicesData);
        services = services.filter(s => s.id !== serviceId);
        saveData('servicesData', services);
        loadSettings();
    }
}

// Initialiser les modals
function initializeModals() {
    // Réinitialiser les formulaires quand les modals se ferment
    document.getElementById('roomModal').addEventListener('hidden.bs.modal', function() {
        document.getElementById('roomForm').reset();
        document.getElementById('roomId').value = '';
        currentRoomId = null;
    });
    
    document.getElementById('galleryModal').addEventListener('hidden.bs.modal', function() {
        document.getElementById('galleryForm').reset();
        document.getElementById('imageId').value = '';
        currentImageId = null;
    });
    
    document.getElementById('serviceModal').addEventListener('hidden.bs.modal', function() {
        document.getElementById('serviceForm').reset();
        document.getElementById('serviceId').value = '';
        currentServiceId = null;
    });
    
    // Gérer la soumission du formulaire d'informations de contact
    document.getElementById('contactInfoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const updatedInfo = {
            name: document.getElementById('residenceName').value,
            phone: document.getElementById('residencePhone').value,
            whatsapp: document.getElementById('residenceWhatsapp').value,
            email: document.getElementById('residenceEmail').value,
            address: document.getElementById('residenceAddress').value,
            description: document.getElementById('residenceDescription').value
        };
        
        let residenceInfo = loadData('residenceInfo', residenceInfo);
        residenceInfo = { ...residenceInfo, ...updatedInfo };
        saveData('residenceInfo', residenceInfo);
        
        alert('Informations mises à jour avec succès !');
    });
}

// Fonctions utilitaires
function getStatusColor(status) {
    switch(status) {
        case 'new': return 'primary';
        case 'read': return 'info';
        case 'replied': return 'success';
        default: return 'secondary';
    }
}

function getStatusLabel(status) {
    switch(status) {
        case 'new': return 'Nouveau';
        case 'read': return 'Lu';
        case 'replied': return 'Répondu';
        default: return 'Inconnu';
    }
}

function getSubjectLabel(subject) {
    switch(subject) {
        case 'reservation': return 'Réservation';
        case 'information': return 'Information';
        case 'complaint': return 'Réclamation';
        case 'other': return 'Autre';
        default: return subject;
    }
}

// Ajouter des écouteurs d'événements pour les boutons d'ajout
document.addEventListener('DOMContentLoaded', function() {
    // Bouton d'ajout de chambre
    document.querySelector('[data-bs-target="#roomModal"]').addEventListener('click', function() {
        document.getElementById('roomForm').reset();
        document.getElementById('roomId').value = '';
        currentRoomId = null;
    });
    
    // Bouton d'ajout d'image
    document.querySelector('[data-bs-target="#galleryModal"]').addEventListener('click', function() {
        document.getElementById('galleryForm').reset();
        document.getElementById('imageId').value = '';
        currentImageId = null;
    });
    
    // Bouton d'ajout de service
    document.querySelector('[data-bs-target="#serviceModal"]').addEventListener('click', function() {
        document.getElementById('serviceForm').reset();
        document.getElementById('serviceId').value = '';
        currentServiceId = null;
    });
});