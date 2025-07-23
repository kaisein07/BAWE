# Résidences Parakou - Site Web Statique

## Description
Site web vitrine pour les Résidences Parakou, un établissement d'hébergement moderne situé dans le quartier Bawé à Parakou, Bénin. Le site propose une interface complète pour présenter les chambres, services, galerie photo et permettre aux clients de contacter l'établissement.

## Fonctionnalités

### Site Principal (index.html)
- **Page d'accueil** avec section hero attractive
- **Catalogue des chambres** avec détails, prix et équipements
- **Services offerts** par l'établissement
- **Galerie photo** avec modal pour agrandir les images
- **Formulaire de contact** avec sauvegarde locale
- **Intégration WhatsApp** pour réservations directes
- **Design responsive** optimisé pour mobile et desktop

### Panel d'Administration (admin.html)
- **Dashboard** avec statistiques et aperçu
- **Gestion des chambres** (ajout, modification, suppression)
- **Gestion des contacts** reçus via le formulaire
- **Gestion de la galerie photo**
- **Gestion des services** proposés
- **Paramètres** de l'établissement

## Structure des Fichiers

```
static_site/
├── index.html          # Page principale du site
├── admin.html          # Panel d'administration
├── css/
│   └── style.css       # Styles CSS personnalisés
├── js/
│   ├── data.js         # Données et configuration
│   ├── main.js         # Logique du site principal
│   └── admin.js        # Logique d'administration
└── README.md           # Ce fichier
```

## Installation et Utilisation

### Installation
1. Téléchargez et décompressez le fichier ZIP
2. Placez tous les fichiers dans un dossier sur votre serveur web
3. Aucune installation de base de données requise (utilise localStorage)

### Utilisation
1. **Site principal** : Ouvrez `index.html` dans votre navigateur
2. **Administration** : Ouvrez `admin.html` pour gérer le contenu

### Configuration
1. Modifiez les données dans `js/data.js` pour personnaliser :
   - Informations de contact (téléphone, WhatsApp, email, adresse)
   - Chambres disponibles
   - Services proposés
   - Images de la galerie

2. Personnalisez le design en modifiant `css/style.css`

## Fonctionnalités Avancées

### Sauvegarde des Données
- Utilise le localStorage du navigateur pour sauvegarder les données
- Les modifications depuis l'admin sont persistantes
- Les contacts soumis via le formulaire sont sauvegardés

### Intégration WhatsApp
- Liens directs vers WhatsApp pour réservations
- Messages pré-remplis avec informations du contact
- Bouton flottant pour contact rapide

### Responsive Design
- Compatible mobile, tablette et desktop
- Navigation adaptive
- Images optimisées pour tous les écrans

## Personnalisation

### Couleurs et Styles
Modifiez les variables CSS dans `css/style.css` :
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    /* Autres couleurs... */
}
```

### Données de Base
Modifiez les objets dans `js/data.js` :
- `residenceInfo` : Informations de contact
- `roomsData` : Chambres disponibles
- `servicesData` : Services proposés
- `galleryData` : Images de la galerie

## Compatibilité
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Responsive design pour tous les appareils
- Aucune dépendance serveur requise

## Support et Maintenance
- Code entièrement commenté et documenté
- Structure modulaire pour faciliter les modifications
- Système de sauvegarde local robuste

## Technologies Utilisées
- HTML5 sémantique
- CSS3 avec Flexbox/Grid
- JavaScript ES6+ (Vanilla)
- Bootstrap 5.3.0 pour la mise en page
- Font Awesome 6.4.0 pour les icônes
- Google Fonts (Poppins) pour la typographie

## Licence
Ce projet est fourni tel quel pour usage commercial par les Résidences Parakou.

---

Pour toute question ou assistance, consultez le code source commenté ou contactez le développeur.