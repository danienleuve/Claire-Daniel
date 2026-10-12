# Claire & Daniel — mise à jour du site

## Fichiers à publier
Téléversez à la racine du dépôt GitHub (sans dossier parent) : `index.html`, `styles.css`, `script.js`. Le fichier `Google-Apps-Script-RSVP.gs` est un exemple à copier dans Google Apps Script, il ne doit pas être mis sur le site public.

## Assets à conserver dans votre dossier `assets/`
Le ZIP ne remplace pas vos images. Vérifiez que les fichiers suivants existent avec exactement ces noms (majuscules/minuscules comprises) :
- `photokitcat.png` — photo de Kit cat
- `Japon.jpg` — votre nouveau visuel Japon
- `signature-tandem.png` — logo tandem C&D utilisé en en-tête et pied de page
- `illustration-tandem.png`, `illustration-domaine.png`, `claire-daniel-tandem.jpg`, `favicon.png`

## Connecter le RSVP à Google Sheets
1. Créez un Google Sheet, par exemple `RSVP mariage Claire & Daniel`.
2. Renommez le premier onglet `Réponses` (respectez l'accent). Vous pouvez ajouter une ligne de titres : Date de réception | Nom | Présence | Adultes | Enfants | Allergies/besoins | Message.
3. Dans le Sheet, ouvrez **Extensions > Apps Script**. Remplacez le contenu de l'éditeur par le contenu de `Google-Apps-Script-RSVP.gs`, puis Enregistrer.
4. Cliquez **Déployer > Nouveau déploiement**. Type : **Application Web**. Exécuter en tant que : **Moi**. Accès : **Tout le monde** (l'intitulé peut varier selon le compte). Déployer et autoriser les accès demandés.
5. Copiez l'URL de l'application web qui se termine par `/exec`.
6. Dans `script.js`, remplacez `googleSheetEndpoint: ""` par cette URL, entre guillemets. Exemple : `googleSheetEndpoint: "https://script.google.com/macros/s/VOTRE_ID/exec"`.
7. Publiez `script.js` sur GitHub. Faites un test avec une réponse fictive, puis vérifiez qu'une nouvelle ligne apparaît dans l'onglet `Réponses`.

**Important :** le déploiement rend ce point d'entrée accessible publiquement pour recevoir des réponses. Ne placez aucune donnée sensible dans le script. Limitez l'accès au Google Sheet lui-même aux personnes qui gèrent le mariage. Si vous modifiez le code Apps Script après le déploiement, gérez le déploiement via **Déployer > Gérer les déploiements**. Le navigateur ne peut pas confirmer la réponse du serveur avec le mode d'envoi utilisé ; testez impérativement l'arrivée d'une ligne avant de diffuser le site.

## Connecter la cagnotte
1. Choisissez votre prestataire de cagnotte et créez la cagnotte. Comparez les frais et les conditions de versement avant de valider.
2. Copiez le lien public de contribution fourni par le prestataire.
3. Dans `script.js`, remplacez `potUrl: "#"` par ce lien, entre guillemets.
4. Publiez `script.js`, puis cliquez sur **Participer à la cagnotte** depuis le site pour tester.

Le site n'encaisse pas lui-même d'argent : le bouton redirige les invités vers la plateforme choisie. Ne mettez jamais d'identifiants bancaires dans le site.

## Acheter un nom de domaine et le relier à GitHub Pages
1. Choisissez un nom disponible, par exemple `claireetdaniel.fr` ou une variante que vous aimez. Vérifiez la disponibilité chez un bureau d'enregistrement de domaines reconnu. Comparez surtout le prix de renouvellement annuel, pas seulement la promotion de la première année, et activez le renouvellement automatique si souhaité.
2. Achetez le domaine auprès du registrar. Vous n'avez pas besoin de changer d'hébergeur : GitHub Pages continuera d'héberger le site.
3. Dans le dépôt GitHub, ouvrez **Settings > Pages > Custom domain**. Saisissez le domaine choisi (par exemple `www.claireetdaniel.fr`) et enregistrez.
4. Chez le registrar, ouvrez la gestion DNS. Pour `www`, créez un enregistrement **CNAME** vers `danienleuve.github.io` (sans `https://` ni chemin). Pour un domaine racine comme `claireetdaniel.fr`, suivez les valeurs A/AAAA indiquées dans la documentation GitHub Pages ; certains registrars proposent ALIAS/ANAME. Ne supprimez pas les enregistrements e-mail existants si vous en utilisez.
5. Attendez la propagation DNS, qui peut prendre jusqu'à 24 heures (parfois davantage). Retournez dans **Settings > Pages** et activez **Enforce HTTPS** lorsque l'option devient disponible.
6. Testez le domaine avec et sans `www`. Dans GitHub, gardez le fichier `CNAME` éventuel géré par Pages et évitez d'enregistrer des DNS différents de ceux recommandés par GitHub.

Documentation officielle :
- GitHub Pages : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- DNS et domaines : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

## Publier les changements
Dans GitHub > dépôt > **Code > Add file > Upload files**, téléversez `index.html`, `styles.css` et `script.js` à la racine, puis **Commit changes**. Ne remplacez pas le dossier `assets/` : gardez vos images actuelles et vérifiez simplement les noms ci-dessus. Après le commit, attendez quelques minutes et rechargez le site.
