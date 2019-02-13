# ValueJob

Maquette : https://whimsical.co/F9EopkEHmiam786HRA4sTe

## Brief

### Objectif

ValueJob a pour but de vous faire découvrir votre véritable valeur sur le marché du travail.

Pour cela une application mobile qui se veut le plus simple et complet possible. Grâce à notre outil vous pourrez rechercher n'importe  quel métier et découvrir : 
- le salaire par rapport à d'expérience, la spécialisation et la localisation basé sur les données du marché du travail
- Description
- Compétences 
- Formation
- Responsabilités et évolution
(Les 4 derniers seront éditables par la communauté)

Mais ce n'est pas tout, une page réunissant l'ensemble des statistiques sera disponible à tous. On pourra notamment y retrouver le métier le mieux payé, le plus populaire etc. Dans l'avenir ses statistiques pourraient être plus complète et précise (les études, formation pour s'améliorer, spécialité du pays).
Ce qui ne pourra pas être développé : un forum sera disponible pour que la communauté puisse échanger et s'entraider autour de nombreux sujets comme les secteurs d'avenirs, l'évolution des métiers, conseils sur les entretiens, liste des aides de l'état, les soucis juridiques, etc. Un blog viendra compléter le forum où les meilleurs pourront rédiger des articles sur un résumé des meilleurs conseils perdus dans le forum (des rédacteurs pourront par la suite en réaliser).

*"les données du marché du travail"
Les statistiques seront basées sur les sites concurrents, les api, sur nos utilisateurs inscrits mais aussi sur les offres d'emploi que nous mettrons à disposition.

### Cible

Principalement les actifs. Puis, par la suite, inclure les chômeurs, stagiaire, alternant etc.

### Business Model

Le don. Un peu comme Wikipédia le but est de renseigner pour un monde meilleur.

### Etape de production

1/ Statistique lié à un métier (système d'edition basée sur les votes de la communauté et disparition des votes les plus datés pour par exemple la définition du poste qui peut évoluer dans le temps)(Déterminer comment une personne peut prouver quelle fait ce métier. Gestion des données RGPD etc.)

Inspiration Chooseyourbooss : 

<img src="https://zupimages.net/up/19/07/4111.png"  width="743" height="614" />

2/ Statistique Global (Région, métiers etc)

3/ Offre d'emploi (Gestion des entreprises et des demandeurs d'emplois, filtres)

Extension :

4/ Forum

5/ Blog


## Techno

L'application doit être disponible sur Android et IOS pour couvrir un maximum d'utilisateurs. N'étant pas développeur Swift et Java je m'oriente naturellement vers des langages web et actuellement la meilleure solution me paraît être NativeScript pour moi car je me sens plus à l'aise avec VueJs qu'avec ReactNative. J'aurai pu très bien partir sur une pwa mais j'ai envie de pousser l'application le plus loin possible en utilisant une techno qui m'ouvrir le plus de porte possible et ne pas me retrouver limité plus tard.

Côté serveur je vais utiliser aussi du JavaScript : NodeJS. Je connais assez mal Express mais j'ai vraiment envie de découvrir ces technos et tout ce qui si rattache (notamment GraphQL et MongoDB couplé avec Node).
Cette application est pour moi l'occasion de découvrir des technos que je n'ai qu'effleurer et dont la maîtrise en fin d'année serait un énorme plus pour moi.

Pour la captation des données je me donne plusieurs portes d'entrée comme cité plus haut mais je vais principalement scraper et utiliser des api pour avoir un bon début.


#### Front-end

- HTML/CSS
- NativeScript VueJS

#### Back-End

- Webpack (Yarn)
- NodeJS
- Express
- Mongoose 

#### BDD

- MongoDB (Atlas)

#### Scrap 

- https://slimerjs.org/
- Api pole emploi (demande réussi) https://api.gouv.fr/
- Autres (A déterminer)
