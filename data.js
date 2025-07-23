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
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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

// Données pour la galerie
const galleryData = [
    {
        id: 1,
        url: "https://drive.google.com/file/d/114Z9oOyIyzVzschULE4hLM3GtO1IEsND/view?usp=drive_link",
        caption: "Chambre Standard - Vue intérieure",
        category: "room",
        active: true
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        caption: "Chambre Deluxe - Confort moderne",
        category: "room",
        active: true
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        caption: "Suite Executive - Luxe et élégance",
        category: "room",
        active: true
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        caption: "Réception - Accueil chaleureux",
        category: "facility",
        active: true
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        caption: "Salle de bain - Équipements modernes",
        category: "facility",
        active: true
    },
    {
        id: 6,
        url: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        caption: "Façade - Architecture moderne",
        category: "exterior",
        active: true
    },
    {
        id: 7,
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        caption: "Salon - Espace détente",
        category: "facility",
        active: true
    },
    {
        id: 8,
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        caption: "Parking - Stationnement sécurisé",
        category: "exterior",
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