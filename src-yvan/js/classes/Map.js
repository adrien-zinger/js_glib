function Map(nom) {
	
	// Création de l'objet XmlHttpRequest
	var xhr = getXMLHttpRequest();
		
	// Chargement du fichier
	xhr.open("GET", './maps/' + nom + '.json', false);
	xhr.send(null);
	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
		throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
	var mapJsonData = xhr.responseText;
	
	// Analyse des données
	var mapData;
	if(JSON) 
		mapData = JSON.parse(mapJsonData);
	else
		eval("mapData = " + mapJsonData);
	this.tileset = new Tileset(mapData.tileset);
	this.terrain = mapData.terrain;
	
	// Liste des personnages présents sur le terrain.
	this.personnages = new Array();
	
	// Pour récupérer la taille (en tiles) de la carte
	this.getHauteur = function() {
		return this.terrain.length;
	}
	this.getLargeur = function() {
		return this.terrain[0].length;
	}
	
	// Pour ajouter un personnage
	this.addPersonnage = function(perso) {
		this.personnages.push(perso);
	}
	
	this.dessinerMap = function(context) {
		for(var i = 0, l = this.terrain.length ; i < l ; i++) {
			var ligne = this.terrain[i];
			var y = i * 32;
			for(var j = 0, k = ligne.length ; j < k ; j++) {
				this.tileset.dessinerTile(ligne[j], context, j * 32, y);
			}
		}
		
		// Dessin des personnages
		for(var i = 0, l = this.personnages.length ; i < l ; i++) {
			this.personnages[i].dessinerPersonnage(context);
		}
	}
}

















