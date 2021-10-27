<?php
    require_once 'common-defs.php';

    if( !isset( $title ) ) {
        $title = isset( $base ) ? 'Explore <em>'.$baseNames[$base]['long'].'</em> (Base <em>'.$base.'</em>) Numbers' : 'ERROR';
    }

    $navID = isset( $bodyclass ) && $bodyclass == 'home' ? "homenav" : "mainnav";
?>

<!doctype html>

<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>DT @ Waimea College - <?= strip_tags( $title ) ?></title>
        <link rel="stylesheet" href="css/styles.css">
        <script src="scripts/numbers.js"></script>
    </head>

    <body class="<?= $bodyclass ?>" onload="resetValue();">

        <header id="mainheader">
            <h1><?= $title ?></h1>

            <nav id="<?= $navID ?>">
                <label for="menutoggle">&#9776;</label>
                <input id="menutoggle" type="checkbox">

                <ul>
                    <?php
                        if( !isset( $bodyclass ) || $bodyclass != 'home' ) {
                            echo '<li><label for="menutoggle">&#10005;</label></li>';
                            echo '<li><a href="./">Numbers <em>Home</em></a>';
                        }

                        foreach( $baseNames as $numbase => $name ) {
                            echo '<li><a href="'.strtolower( $name['long'] ).'.php"><em>'.$name['long'].'</em> (Base <em>'.$numbase.'</em>) Numbers</a>';
                        }
                    ?>
                    <li><a href="binoct.php">The Link Between <em>Binary</em> and <em>Octal</em></a>
                    <li><a href="binhex.php">The Link Between <em>Binary</em> and <em>Hex</em></a>
                    <li><a href="binascii.php">The Link Between <em>Binary</em> and <em>ASCII</em></a>
                    <li><a href="bincol.php">The Link Between <em>Binary</em> and <em>Colour</em></a>
                </ul>
            </nav>

            <?php
                if( isset( $subtitle ) ) echo '<h3>'.$subtitle.'</h3>';
            ?>
        </header>

        <main>
