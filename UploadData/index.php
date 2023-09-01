<?php
$target_dir = "./Data/";
$objFileName = round(rand(1, 10000));
$fileName = $objFileName . basename($_FILES["objfile"]["name"]);
$target_file = $target_dir . $objFileName . basename($_FILES["objfile"]["name"]);

if (move_uploaded_file($_FILES["objfile"]["tmp_name"], $target_file)) {
    print "
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Tooth Project</title>
        <link rel='stylesheet' href='../style/bootstrap.min.css'>
        <link rel='stylesheet' href='../style/style.css'>
    </head>
    <body>
        <div class='fluid-container'>
            <div class='dark-menu2'>
            <b>Tooth 3d App</b>  
            <hr>
            <div class='row' style='direction: ltr; text-align: center;'>
                <h1>Your model has been successfully uploaded. We are moving to the page $fileName.</h1>
            </div>
            </div>
        </div>
    </body>
    <script src='./script/query.min.js'></script>
    <script src='./script/bootstrap.min.js'></script>
    <script>
        localStorage.setItem('indexObj', $objFileName);
    </script>
    </html>
    ";
    
    header("Location: ../App?project=$fileName&lang=EN&method");
    die();
}

?>