
self.importScripts("CompteurJetons.js");
var compteur = new CompteurJetons();

self.addEventListener('message', function(e)
{
    // Code à implémenter
    var generateurFonction = compteur.compterJetons(e.data);
    var valeurProgres = undefined;
    do
    {
        valeurProgres = generateurFonction.next().value;
        postMessage([valeurProgres, compteur.getJetons()]);
    }
    while(valeurProgres != undefined)
}, false);