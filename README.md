#Bienvenue dans ce projet passionnant de codage d'une application météo !


L'objectif de ce projet est de créer une application qui utilise l'API OpenWeatherMap pour récupérer les données météorologiques et les afficher sur une interface utilisateur. Pour commencer, j'ai créé une interface basique qui contient les éléments clés à remplir avec JavaScript.

Ensuite, j'ai récupéré la localisation de l'utilisateur en utilisant la latitude et la longitude. Pour ce faire, j'ai utilisé l'API de géolocalisation de JavaScript, navigator.geolocation. Si cette fonction est disponible, elle récupère les coordonnées de l'utilisateur.

J'ai ensuite écrit une fonction asynchrone pour obtenir les données météorologiques. Cependant, la tâche n'était pas si simple, car l'API OpenWeatherMap a modifié ses conditions d'utilisation et les prévisions à 7 jours sont devenues payantes. J'ai donc dû utiliser une deuxième API, open-meteo, pour obtenir les prévisions à 7 jours. Cela a rendu l'hydratation des prévisions plus complexe, mais j'ai pu récupérer les informations nécessaires en utilisant les paramètres appropriés dans les URL de l'API.

Enfin, j'ai dû afficher les prévisions du jour et de la semaine dans deux onglets différents. Pour les prévisions du jour, j'ai récupéré l'heure actuelle et j'ai incrémenté cette valeur de 3 heures pour chaque section, en y ajoutant la température correspondante. Pour les prévisions à 7 jours, j'ai créé un tableau contenant les jours de la semaine, puis j'ai identifié le jour actuel pour y ajouter les températures correspondantes.

En somme, ce projet a été un excellent moyen de mettre en pratique mes compétences en programmation JavaScript et de travailler avec des APIs pour obtenir des données en temps réel.
