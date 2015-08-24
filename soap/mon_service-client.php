  <html>
  <head>
  </head>
  <body>
  <?php

  echo "<h1>appel via WS  </h1>";

  ini_set("soap.wsdl_cache_enabled", 0);
   // create an instance of SoapClient by providing a URL to some WSDL
  $client = new SoapClient("http://localhost/WSLego/soap/mon_service-server.php?wsdl");
  

  echo "<h2>get NB </h2>";
  try{
    $nb = $client->countNBvisiteurs();
    var_dump($nb);
    echo "<h2>$nb</h2>";
  }  catch (SoapFault $fault){
    var_dump($fault);
  }
  
  echo "<h2>set NB + 20</h2>";
  try{
    $nb = $client->logFluxNBvisiteurs(20);
    echo "<h2>$nb</h2>";
  }  catch (SoapFault $fault){
    var_dump($fault);
  }

  echo "<h2>set NB -10</h2>";
  try{
    $nb = $client->logFluxNBvisiteurs(-10);
    echo "<h2>$nb</h2>";
  }  catch (SoapFault $fault){
    var_dump($fault);
  }


  echo "<h2>get NB </h2>";
  try{
    $nb = $client->countNBvisiteurs();
    var_dump($nb);
    echo "<h2>$nb</h2>";
  }  catch (SoapFault $fault){
    var_dump($fault);
  }

  ?>
</body>
</html>
