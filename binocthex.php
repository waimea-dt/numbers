<?php
    $title = 'Explore the Link Between <em>Binary</em>, <em>Octal</em> and <em>Hex</em>';
    $max = 255;
    include 'common-top.php';

    $base = 2;
    $digits = 8;
    include 'common-explore.php';

    $base = 8;
    $digits = 3;
    $sizes = [3,3,2];
    include 'common-explore.php';

    $base = 16;
    $digits = 2;
    $sizes = [4,4];
    include 'common-explore.php';

    include 'common-result.php';
    include 'common-bottom.php';

?>
