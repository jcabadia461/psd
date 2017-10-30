<?php
    header("Content-Type: text/event-stream");
    header("Cache-Control: no-cache");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: *");
$valor = "k";
echo "data: " . $valor . "\n\n";
    flush();
?>