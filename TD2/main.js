$(function()
{
	var estActive = false;
    var compteurDeJetons;
    var startWorking = function()
    {
		arreterVerificationAffichage();
		
        //On met à jour le bouton start
		$("#commencer").off("click");
		$("#commencer").addClass("disabled");
		
		//On met à jour le bouton stop
		$("#arreter").removeClass("disabled");
        $("#arreter").click(stopWorking);
        
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
                $("#arreter").off("click");
                commencerVerificationAffichage();
            }
        }
    }

    var stopWorking = function()
    {
        //On arrête le travail et on change les événements des boutons.
        compteurDeJetons.terminate();
        $("#result").val("Annulé");
        $("#arreter").off("click");
		commencerVerificationAffichage();
    }

    var commencerVerificationAffichage = function()
	{
		estActive = false;
		$("#commencer").addClass("disabled");
		$("#arreter").addClass("disabled");
		
		checkForText();
		$("#inputText").keyup(checkForText);
		$("#inputText").on("paste", waitBeforeCheck);
		$("#inputText").on("cut", waitBeforeCheck);
	}
	
	var arreterVerificationAffichage = function()
	{
		$("#inputText").off("keyup");
		$("#inputText").off("paste");
		$("#inputText").off("cut");
	}
    
    var waitBeforeCheck = function()
	{
		setTimeout(checkForText, 100);
	}
    
    var checkForText = function()
	{
		if($("#inputText").val() != "" && !estActive)
		{
			estActive = true;
			$("#commencer").removeClass("disabled");
			$("#commencer").click(startWorking);
		}
		else if($("#inputText").val() == "" && estActive)
		{
			estActive = false;
			$("#commencer").addClass("disabled");
			$("#commencer").off("click");
		}
	}
    
    //On vérifie s'il y a du texte dans la boîte de texte.
    commencerVerificationAffichage();
});