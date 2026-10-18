# Claire & Daniel — mise à jour du site

## Installer les fichiers
1. Téléversez à la racine du dépôt GitHub `index.html`, `styles.css` et `script.js`.
2. Conservez votre dossier `assets/` existant, avec notamment `signature-tandem.png`, `illustration-tandem.png`, `illustration-domaine.png`, `photokitcat.png` et **`Japan.jpg`**. Attention à la casse : le site appelle exactement `assets/Japan.jpg` (J majuscule, le reste en minuscules). Supprimez ou archivez l’ancien `japan-illustrations.svg` si vous n’en avez plus besoin.
3. `Google-Apps-Script-RSVP.gs` est un exemple à copier dans Google Apps Script ; ne le mettez pas sur le site public.
4. Vérifiez le site après le déploiement GitHub Pages. Si l’image du Japon ne s’affiche toujours pas, contrôlez que le fichier se trouve bien dans `assets/` et que son nom exact est `Japan.jpg` (pas `Japan.JPG`, `Japon.jpg` ou `japan.jpg`).

## RSVP détaillé : une ligne par personne dans Google Sheets
Le formulaire permet à une famille d’envoyer une seule réponse, puis d’ajouter une fiche pour chaque adulte et chaque enfant. Chaque fiche contient prénom, nom, présence le samedi et/ou dimanche (ou absence), régime/allergies/besoins ; les enfants indiquent leur âge, et chaque adulte doit renseigner son e-mail et son téléphone. Une colonne « Famille / référent » permet de regrouper les personnes d’un même foyer.

### Mise en place
1. Créez un Google Sheet privé, par exemple `RSVP mariage Claire & Daniel`.
2. Dans le tableur, ouvrez **Extensions > Apps Script**.
3. Remplacez le code présent par le contenu de `Google-Apps-Script-RSVP.gs`, puis enregistrez.
4. Cliquez **Déployer > Nouveau déploiement > Application Web**. Exécuter en tant que : **vous-même**. Accès : **Toute personne** si cette option est proposée. Autorisez le script.
5. Copiez l’URL qui se termine par `/exec`.
6. Dans `script.js`, remplacez `googleSheetEndpoint: ""` par l’URL obtenue, entre guillemets, puis publiez ce fichier sur GitHub.
7. Faites un envoi test avec au moins un adulte et un enfant. Vérifiez dans Google Sheets qu’une ligne est créée par personne et que les colonnes sont bien remplies avant de partager le site aux invités.

**À savoir :** le formulaire envoie les réponses par une requête navigateur en mode `no-cors`, donc la page ne peut pas vérifier avec certitude que Google a enregistré les données. Le test dans le tableur est indispensable. Gardez le Google Sheet privé et partagez-le uniquement avec les personnes qui organisent le mariage. Le lien Apps Script reçoit les réponses, alors ne publiez pas de données sensibles dans le champ message.

### Organisation des données
Les colonnes sont : Reçu le, Famille / référent, Prénom, Nom, Type, Âge enfant, E-mail adulte, Téléphone adulte, Présence, Régime / allergies / besoins, Message famille. Les coordonnées sont demandées pour chaque adulte ; les champs de contact ne sont pas affichés pour les enfants. Si plusieurs adultes d’une famille viennent, ajoutez une fiche pour chacun et indiquez leurs coordonnées respectives.

## Cagnotte
Créez une cagnotte auprès du prestataire de votre choix et comparez les frais, conditions de retrait et éventuels frais de paiement. Dans `script.js`, remplacez `potUrl: "#"` par le lien public de votre cagnotte, puis republiez le fichier. Testez le bouton « Participer à la cagnotte ». Le site ne collecte pas lui-même les paiements.

## Nom de domaine personnalisé
1. Achetez le nom souhaité chez un registrar et vérifiez le prix de renouvellement.
2. Dans GitHub : dépôt **Settings > Pages > Custom domain**, saisissez le domaine (par exemple `www.claireetdaniel.fr`) et enregistrez avant de modifier le DNS.
3. Chez le registrar, créez un enregistrement **CNAME** : nom `www`, cible `danienleuve.github.io` (sans `https://` et sans chemin de dépôt).
4. Pour utiliser aussi le domaine racine (sans `www`), ajoutez les enregistrements **A** vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153` et `185.199.111.153`.
5. Attendez la propagation DNS (parfois jusqu’à 24 h), puis activez **Enforce HTTPS** dans GitHub Pages quand l’option est disponible. Ne supprimez pas les éventuels enregistrements DNS utilisés pour votre messagerie.

Documentation officielle :
- GitHub Pages — domaine personnalisé : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- Google Apps Script — applications Web : https://developers.google.com/apps-script/guides/web
