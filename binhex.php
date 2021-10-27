<?php
    $title = 'Explore the Link Between <em>Binary</em> and <em>Hex</em>';
    $subtitle = 'Note how <em>four Binary digits</em> (bits) relate to exactly <em>one Hex digit</em>. This means it is <em>very easy to convert between Binary and Hex</em> (much easier than between Binary and Decimal).';

    $max = 255;
    include 'common-top.php';

    $base = 2;
    $digits = 8;
    $sizes = [];
    $gaps = [4];
    include 'common-explore.php';

    $base = 16;
    $digits = 2;
    $sizes = [4,4];
    $gaps = [1];
    include 'common-explore.php';

    include 'common-result.php';
    include 'common-bottom.php';

?>
