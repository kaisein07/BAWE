
// Données pour les chambres
const roomsData = [
    {
        id: 1,
        type: "Chambre Standard",
        price: 15000,
        currency: "FCFA",
        description: "Chambre confortable avec toutes les commodités de base pour un séjour agréable.",
        amenities: [
            "Climatisation",
            "Télévision satellite",
            "Wifi gratuit",
            "Salle de bain privée",
            "Eau chaude",
            "Réfrigérateur",
            "Ventilateur de plafond"
        ],
        image: "picture1_1753290700856.jpg",
        available: true,
        capacity: 2
    },
    {
        id: 2,
        type: "Chambre Deluxe",
        price: 25000,
        currency: "FCFA",
        description: "Chambre spacieuse avec équipements modernes et vue sur la ville.",
        amenities: [
            "Climatisation",
            "Télévision LED 42\"",
            "Wifi haut débit",
            "Salle de bain premium",
            "Eau chaude",
            "Mini-bar",
            "Coffre-fort",
            "Bureau de travail",
            "Balcon privé"
        ],
        image: "picture2_1753290700855.jpg",
        available: true,
        capacity: 3
    },
    {
        id: 3,
        type: "Suite Executive",
        price: 40000,
        currency: "FCFA",
        description: "Suite luxueuse avec salon séparé, idéale pour les voyages d'affaires.",
        amenities: [
            "Climatisation double",
            "Télévision LED 55\"",
            "Wifi premium",
            "Salle de bain luxueuse",
            "Jacuzzi",
            "Mini-bar complet",
            "Coffre-fort électronique",
            "Bureau exécutif",
            "Salon privé",
            "Service en chambre 24h",
            "Terrasse privée"
        ],
        image: "picture3_1753290700853.jpg",
        available: true,
        capacity: 4
    }
];

// Données pour les services
const servicesData = [
    {
        id: 1,
        name: "Wifi Gratuit",
        description: "Connexion internet haut débit dans toutes les chambres",
        icon: "fas fa-wifi",
        active: true
    },
    {
        id: 2,
        name: "Parking Gratuit",
        description: "Stationnement sécurisé disponible 24h/24",
        icon: "fas fa-parking",
        active: true
    },
    {
        id: 3,
        name: "Climatisation",
        description: "Toutes les chambres sont climatisées",
        icon: "fas fa-snowflake",
        active: true
    },
    {
        id: 4,
        name: "Service de Blanchisserie",
        description: "Lavage et repassage de vos vêtements",
        icon: "fas fa-tshirt",
        active: true
    },
    {
        id: 5,
        name: "Réception 24h/24",
        description: "Personnel d'accueil disponible jour et nuit",
        icon: "fas fa-concierge-bell",
        active: true
    },
    {
        id: 6,
        name: "Sécurité",
        description: "Surveillance et sécurité renforcée",
        icon: "fas fa-shield-alt",
        active: true
    },
    {
        id: 7,
        name: "Petit Déjeuner",
        description: "Petit déjeuner continental inclus",
        icon: "fas fa-coffee",
        active: true
    },
    {
        id: 8,
        name: "Transfert Aéroport",
        description: "Service de navette depuis/vers l'aéroport",
        icon: "fas fa-plane",
        active: true
    }
];

// Données pour la galerie - Utilisation des images du dossier asset
const galleryData = [
    {
        id: 1,
        url: "asset/picture5.jpg",
        caption: "Chambre Standard - Vue intérieure",
        category: "room",
        active: true
    },
    {
        id: 2,
        url: "asset/picture6.jpg",
        caption: "Chambre Deluxe - Confort moderne",
        category: "room",
        active: true
    },
    {
        id: 3,
        url: "asset/picture7.jpg",
        caption: "Suite Executive - Luxe et élégance",
        category: "room",
        active: true
    },
    {
        id: 4,
        url: "asset/picture8.jpg",
        caption: "Salon - Espace détente",
        category: "facility",
        active: true
    },
    {
        id: 5,
        url: "asset/picture9.jpg",
        caption: "Salle de bain - Équipements modernes",
        category: "facility",
        active: true
    },
    {
        id: 6,
        url: "asset/picture10.jpg",
        caption: "Salon VIP - Espace de réception",
        category: "facility",
        active: true
    },
    {
        id: 7,
        url: "asset/picture11.jpg",
        caption: "Chambre familiale - Confort pour tous",
        category: "room",
        active: true
    },
    {
        id: 8,
        url: "asset/picture12.jpg",
        caption: "Kitchenette - Espace cuisine équipé",
        category: "facility",
        active: true
    },
    {
        id: 9,
        url: "asset/picture13.jpg",
        caption: "Espace commun - Détente et convivialité",
        category: "facility",
        active: true
    },
    {
        id: 10,
        url: "asset/picture14.jpg",
        caption: "Chambre Premium - Confort supérieur",
        category: "room",
        active: true
    },
    {
        id: 11,
        url: "asset/picture15.jpg",
        caption: "Terrasse - Vue panoramique",
        category: "facility",
        active: true
    },
    {
        id: 12,
        url: "asset/picture16.jpg",
        caption: "Chambre de luxe - Raffinement absolu",
        category: "room",
        active: true
    }
];

// Données des contacts (pour l'admin)
const contactsData = [
    {
        id: 1,
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        phone: "+229 97 11 22 33",
        subject: "reservation",
        message: "Bonjour, je souhaite réserver une chambre deluxe pour le weekend prochain.",
        created_at: "2024-01-15T10:30:00",
        status: "new"
    },
    {
        id: 2,
        name: "Marie Kone",
        email: "marie.kone@example.com",
        phone: "+229 96 44 55 66",
        subject: "information",
        message: "Avez-vous des tarifs spéciaux pour les séjours de longue durée?",
        created_at: "2024-01-14T14:20:00",
        status: "read"
    },
    {
        id: 3,
        name: "Paul Martin",
        email: "paul.martin@example.com",
        phone: "+229 95 77 88 99",
        subject: "complaint",
        message: "Le service de blanchisserie était très lent lors de mon dernier séjour.",
        created_at: "2024-01-13T09:15:00",
        status: "replied"
    }
];

// Informations de contact de la résidence
const residenceInfo = {
    name: "Résidences Parakou",
    phone: "+229 97 00 00 00",
    whatsapp: "+229 97 00 00 00",
    email: "contact@residences-parakou.com",
    address: "Quartier Bawé, Parakou, Bénin",
    description: "Résidences de voyageurs modernes offrant confort et hospitalité au cœur de Parakou.",
    facebook_url: "https://facebook.com/residences-parakou",
    instagram_url: "https://instagram.com/residences_parakou",
    twitter_url: "https://twitter.com/residences_parakou"
};

// Statistiques pour le dashboard admin
const adminStats = {
    totalRooms: 12,
    occupiedRooms: 8,
    availableRooms: 4,
    totalContacts: 25,
    newContacts: 5,
    monthlyRevenue: 1250000,
    averageRating: 4.8,
    totalGuests: 156
};

// Fonction pour sauvegarder les données dans le localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Fonction pour charger les données depuis le localStorage
function loadData(key, defaultData) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultData;
}

// Initialiser les données dans le localStorage si elles n'existent pas
function initializeData() {
    if (!localStorage.getItem('roomsData')) {
        saveData('roomsData', roomsData);
    }
    if (!localStorage.getItem('servicesData')) {
        saveData('servicesData', servicesData);
    }
    if (!localStorage.getItem('galleryData')) {
        saveData('galleryData', galleryData);
    }
    if (!localStorage.getItem('contactsData')) {
        saveData('contactsData', contactsData);
    }
    if (!localStorage.getItem('residenceInfo')) {
        saveData('residenceInfo', residenceInfo);
    }
    if (!localStorage.getItem('adminStats')) {
        saveData('adminStats', adminStats);
    }
}

// Fonctions utilitaires
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR').format(price);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Initialiser les données au chargement
initializeData();
