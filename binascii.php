<?php
    $title = 'Explore the Link Between <em>Binary</em> and <em>ASCII</em> Codes';
    $subtitle = 'Note how only <em>seven Binary digits</em> (bits) are required for <em>one ASCII character</em>, since basic ASCII values range from <em>0 to 127</em>. Try pressing keys on your <em>keyboard</em> to see the Binary values for each key characters';

    $max = 127;
    include 'common-top.php';

    $base = 2;
    $digits = 8;
    $sizes = [];
    $gaps = [];
    include 'common-explore.php';

    //$base = 16;
    //$digits = 2;
    //$sizes = [4,4];
    //$gaps = [1];
    //include 'common-explore.php';

    include 'common-result.php';
    include 'common-ascii.php';
    include 'common-bottom.php';

?>
