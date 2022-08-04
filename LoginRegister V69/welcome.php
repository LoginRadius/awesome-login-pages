<?php 

session_start();

if (!isset($_SESSION['username'])) {
    header("Location: index.php");
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Concertul Zambilica</title>
    <link rel="icon" type="image/jpg" href="images/favicon.jpg">
</head>
<body>
    <div class="jumbotron jumbotron-fluid text-center">
        <div class="container">
            <h1>Informatii Concertul Zambilica</h1>
            <?php echo "<h6>Welcome " . $_SESSION['username'] . "</h6>"; ?> 
            <a href="logout.php">Logout</a>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-sm-4 text-center">
                <h1>Bilete</h1>
                <h5>Biletele sunt la jumate de pret!</h5>
                <h5> <s>400 lei</s> 200 lei</h6>
            </div>
            <div class="col-sm-4 text-center">
                <h1>Caritate</h1>
                <h5>Donam 2.5% din banii pe care ii primim spre cancer research!</h5>
            </div>
            <div class="col-sm-4 text-center">
                <h1>Merchandise</h1>
                <h5>Cost doar 50 de lei ca sa ne cumperi un tricou!</h5>
            </div>
        </div>
    </div>
</body>
</html>