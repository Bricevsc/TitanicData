Semaine projet 

L'objectif de l'application et d'afficher les survivants du Titanic en fonction du sex, de l'age et de la classe des billets.

Vous apporterez un soin particulier au rendu des statistiques.

La piste graphique à suivre est le design Web de l'application kaggle.com.

Analyse des données & pages à réalisées
Vous pouvez utiliser MongoDB, pour analyser les données. Suivez dans ce cas les étapes ci-dessous.

Importez les données au format CSV à l'adresse suivante : https://raw.githubusercontent.com/hkacmaz/Titanic-Passenger-Survivors/master/train.csv

Puis tapez la ligne de commande suivante, notez l'option headerline qui indique les clés des valeurs du Dataset.

mongoimport --db titanic --collection passengers --type=csv --headerline --file train.csv --drop


Créez la page de login, page principale de l'application. Une fois connecté on sera redirigé vers la page pour lancer les analyses statistiques.

Créez la page de recherche à proprement parlée, elle comportera un menu principale permettant de se connecter et déconnecter.

Sex : [] Age : [] Classe []
[Analyser]


Une fois la recherche effectuée vous redirigerez l'utilisateur vers une page proposant un graphique de votre choix pour expliciter chacun des résultats. Un bouton Reset permettra d'effacer la recherche et de revenir à la page précédente.

Graphique

[Reset]


Améliorez maintenant l'analyse des données

Introduisez les éléments suivants dans la rechercher

La moyenne

L'écart type

Proposez une autre recherche sur l'analyse de ses données.