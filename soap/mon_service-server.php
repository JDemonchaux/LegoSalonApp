<?php
define("HOST","localhost");
define("LOGIN","root");
define("MDP","");
define("BDD","WSbdd");
/*
 * Un Web Service SOAP en PHP a partir d'un fichier WSDL
 */
 ini_set("soap.wsdl_cache_enabled", 0);

// -------------------------------------------    
//definition du service
$soap = new SoapServer('mon_service.wsdl');
var_dump($soap);
// --------------------------------------------
// Contenu du service


function countNBvisiteurs() {

     //début de la journée
    $dateStart = date("Y-m-d")." 00:00:00";
    //maintenant
    $dateEnd = date("Y-m-d H:i:s");
    
    $query = "SELECT sum(lv_nb) as nb from tm_log_visite_lv ";
    $condition = " WHERE lv_date BETWEEN '$dateStart 'AND '$dateEnd' ";

    $conditonIN = " AND lv_sens='IN' ";
    $queryIN = $query.$condition.$conditonIN;

    $conditonOUT = " AND lv_sens='OUT' ";
    $queryOUT = $query.$condition.$conditonOUT;
    
    // connexion au serveur de base de donnée 
    $conn = new mysqli(HOST, LOGIN, MDP, BDD); 

    //envoie de la requete et récupération du résultat
    //var_dump($queryIN);
    $resIN = $conn->query($queryIN) ;
    //var_dump($resIN);
    $ligneIN = $resIN->fetch_object() ;
    //utilisation du résulat
    $intIN = intval($ligneIN->nb);

    //envoie de la requete et récupération du résultat
    $resOUT = $conn->query($queryOUT) ;
    $ligneOUT = $resOUT->fetch_object() ;
    //utilisation du résulat
    $intOUT = intval($ligneOUT->nb);

    return $intIN-$intOUT;
}

function logFluxNBvisiteurs($nb){
    
    $date = date("Y-m-d H:i:s");
    if($nb<0){
        $sens="OUT";
    }else{
        $sens="IN";
    }
    $nb=abs($nb);

    $query="insert into tm_log_visite_lv (lv_nb,lv_sens,lv_date) values ($nb,'$sens','$date')";
    
    // connexion au serveur de base de donnée 
    $conn = new mysqli(HOST, LOGIN, MDP, BDD); 
    //envoie de la requete 
    $res = $conn->query($query) ;

    return $res;
}


// --------------------------------------------
//implémentation des methodes du service
$soap->addFunction("countNBvisiteurs");
$soap->addFunction("logFluxNBvisiteurs");


// mise en place du service
$soap->handle();


