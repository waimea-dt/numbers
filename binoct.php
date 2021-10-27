<?php
    $title = 'Explore the Link Between <em>Binary</em> and <em>Octal</em>';
    $subtitle = 'Note how <em>three Binary digits</em> (bits) relate to exactly <em>one Octal digit</em>. This means it is <em>very easy to convert between Binary and Octal</em> (much easier than between Binary and Decimal).';

    $max = 255;
    include 'common-top.php';

    $base = 2;
    $digits = 8;
    $sizes = [];
    $gaps = [6,3];
    include 'common-explore.php';

    $base = 8;
    $digits = 3;
    $sizes = [3,3,2];
    $gaps = [2,1];
    include 'common-explore.php';

    include 'common-result.php';
    include 'common-bottom.php';

?>
