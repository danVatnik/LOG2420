
var working = false;

$(function(){

    var checkForText = function (){

        if( $("#inputText").val() != "" && !working){
            $("#commencer").removeClass("disabled");
            $("#commencer").prop('disabled', false);
            //$("#commencer").click(startWorking);
        }
        else{
            $("#commencer").addClass("disabled");
            $("#commencer").prop('disabled', true);
            //$("#commencer").off("click");
        }
    }
    
    
    checkForText();

    
    
    var compteurDeJetons;
    var startWorking = function()
    {
        //On met à jour les événements pour cliquer sur les boutons.
        
        //Changer le visuel des boutons
        working = true;
        $("#commencer").prop('disabled', true);
        $("#commencer").addClass("disabled");
        
        $("#arreter").removeClass("disabled");
        $("#arreter").prop('disabled', false);


        //On part la tâche
        compteurDeJetons = new Worker("worker.js");
        compteurDeJetons.postMessage($("#inputText").val());
        compteurDeJetons.onmessage = function(e)
        {
            //On met à jour le nombre de jetons et la progressBar
            $("#result").val(e.data[1]);
            $("#myProgress").css("width", e.data[0] + "%");
            if(e.data[0] >= 10)
                $("#myProgress").html(e.data[0] + "%");
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

        
        //Changer le visuel des boutons
        working = false;
        $("#commencer").prop('disabled', false);
        $("#commencer").removeClass("disabled");
        
        $("#arreter").addClass("disabled");
        $("#arreter").prop('disabled', true);
    }

    //On active notre bouton pour lancer le travail.
    $("#commencer").click(startWorking);
    $("#arreter").click(stopWorking);
    
    $("#inputText").keyup(checkForText);
    $("#inputText").mouseout(checkForText);
    
});