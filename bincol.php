<?php
    $title = 'Explore the Link Between <em>Binary</em> and <em>Colour</em>';
    $subtitle = 'Note that most computer displays and stored images use <em>24-bit colour</em>, using <em>1 byte each for red, green and blue</em> levels (3 bytes is 24 bits). Adjust the red, green and blue values and see how the <em>Hex colour code</em> and <em>Decimal RGB</em> values change.';

    include 'common-top.php';

    $label = 'Red';
    $id = 1;
    $base = 2;
    $digits = 8;
    $sizes = [];
    $gaps = [];
    include 'common-explore.php';

    $label = 'Green';
    $id = 2;
    $base = 2;
    $digits = 8;
    $sizes = [];
    $gaps = [];
    include 'common-explore.php';

    $label = 'Blue';
    $id = 3;
    $base = 2;
    $digits = 8;
    $sizes = [];
    $gaps = [];
    include 'common-explore.php';

    include 'common-colour.php';
    include 'common-bottom.php';

?>
