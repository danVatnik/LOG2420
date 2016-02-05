$(function()
{
    var compteurDeJetons;
    var startWorking = function()
    {
        //On met à jour les événements pour cliquer sur les boutons.
        $("#commencer").off("click");
        $("#arreter").click(stopWorking);
        
        //Changer le visuel des boutons
        
        //On part la tâche
        compteurDeJetons = new Worker("worker.js");
        compteurDeJetons.postMessage($("#inputText").val());
        compteurDeJetons.onmessage = function(e)
        {
            //On met à jour le nombre de jetons et la progressBar
            $("#result").val(e.data[1]);
            $("#myProgress").css("width", e.data[0] + "%");
            //On vérifie si le travail est terminé
            if(e.data[0] == 100)
            {
                //Le travail est terminé, on écrit terminé et on change les événements des boutons.
                compteurDeJetons.terminate();
                $("#commencer").click(startWorking);
                $("#arreter").off("click");
                
                //Changer le visuel des boutons
                
            }
        }
    }

    var stopWorking = function()
    {
        //On arrête le travail et on change les événements des boutons.
        compteurDeJetons.terminate();
        $("#result").val("Annulé");
        $("#commencer").click(startWorking);
        $("#arreter").off("click");
        
        //Changer le visuel des boutons
        
    }

    //On active notre bouton pour lancer le travail.
    $("#commencer").click(startWorking);
});