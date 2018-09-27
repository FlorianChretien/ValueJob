# ValueJob

Maquette : https://www.figma.com/file/TbB8v0gDWOqCq9O48iKvXuik/How-much-i-have-to-be-paid

## Brief

### Objectif

1/ Le but est de donner une fourchette de salaire par Job, metier secteur en s'adaptant aux particularités du pays (exemple France province Idf régions etc), assez précis donc deux méthodes. Scrapper les site d'offres en ligne et/ou le faire remplir par les utilisateurs et/ou utiliser l'api de linkedin. (système d'edition basée sur les votes de la communauté et disparition des votes les plus datés pour par exemple la définition du poste qui peut évoluer dans le temps)

2/Pouvoir créer des statistiques de tout et n'importe quoi (métier le plus populaire, le mieux payé, par ville etc).

3/ Centraliser les offres d'emploi : ajouter/modifier/supprimer.

Déterminer comment une personne peut prouver quelle fait ce métier. Gestion des données RGPD etc.

Inspiration Chooseyourbooss : 

<img src="http://florian-chretien.fr/img/howpaidproject.png"  width="800" height="532" />

Extension :

4/ Forum avec des catégories par secteurs, métiers, villes, prud'homme, chômage etc

5/ Blog sur des conseils sur l'évolution des metiers, des secteurs d'avenir, des formations, liste des aides de l'état si on est au chomage/alternance/etc, conseil pour les chômeurs.

### Cible

Principalement les actifs. Puis, par la suite, inclure les chômeurs, stagiaire, alternant etc.

## Techno

#### Front-end

- HTML/CSS
- React-native

#### Back-End

- Webpack (Yarn)
- NodeJS
- Express
- GraphQL
- ElasticSearch
- Mongoose 

#### BDD

- MongoDB (Atlas)

#### Scrap 

- https://slimerjs.org/
- Api pole emploi (demande réussi) https://api.gouv.fr/
