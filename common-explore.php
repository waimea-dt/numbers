<?php
    $index = 1;
    $unlinked = false;

    if( isset( $id ) ) {
        $index = $id;
        $unlinked = true;
    }
?>

<section class="explore">

    <header>

<?php
    if( isset( $label ) ) {
        echo '<h2 class="'.$label.'">'.$label.'</h2>';
        echo '<h3>'.$baseNames[$base]['short'].'</h3>';
    }
    else {
        echo '<h2>'.$baseNames[$base]['short'].'</h2>';
        echo '<h3>(Base <em>'.$base.'</em>)</h3>';
    }
?>

        <p class="note">Click a digit to change it...</p>
    </header>

    <div class="value">
        <div class="explore-labels" id="explore-labels-<?= $base ?>-<?= $index ?>">
<?php
    for( $power = $digits - 1; $power >= 0; $power-- ) {
        $size = isset( $sizes[$power] ) ? $sizes[$power] : 1;

        echo '<label id="label-'.$base.'-'.$index.'-'.$power.'" data-width="'.$size.'">';
        echo     number_format( pow( $base, $power ) );
        echo     ' <span class="power">'.$base.'<sup>'.$power.'</sup></span>';
        echo '</label>';

        if( isset( $gaps ) && in_array( $power, $gaps ) ) echo '<label class="gap"></label>';
    }

    $maxValue = isset( $max ) ? $max : pow( $base, $digits ) - 1;
?>
        </div>

        <div class="explore-digits"
             id="explore-digits-<?= $base ?>-<?= $index ?>"
             data-max="<?= $maxValue ?>"
             data-unlinked="<?= $unlinked ?>">
<?php
    for( $power = $digits - 1; $power >= 0; $power-- ) {
        $size = isset( $sizes[$power] ) ? $sizes[$power] : 1;
        $offset = pow( $base, $power );

        echo '<div class="digitblock" data-width="'.$size.'">';
        echo   '<div class="control up" id="digit-'.$base.'-'.$index.'-'.$power.'-up" ';
        echo        'onclick="changeValue( '.$base.', '.$index.', '.$offset.' );">▲</div>';

        echo   '<div class="digit" id="digit-'.$base.'-'.$index.'-'.$power.'">0</div>';

        echo   '<div class="control down" id="digit-'.$base.'-'.$index.'-'.$power.'-down" ';
        echo        'onclick="changeValue( '.$base.', '.$index.', -'.$offset.' );">▼</div>';
        echo '</div>';

        if( isset( $gaps ) && in_array( $power, $gaps ) ) echo '<div class="digitblock gap"></div>';
    }
?>
        </div>
    </div>

    <div class="controls">
        <div class="control max"  onclick="changeValue( <?= $base ?>, <?= $index ?>,  99999 );">Max<span class="symbol">▲</span></div>
        <div class="control down" onclick="changeValue( <?= $base ?>, <?= $index ?>, -99999 );"><span class="symbol">▼</span>Min</div>
    </div>

</section>
