let bases = {
    2 : 'Binary',
    8 : 'Octal',
    10 : 'Decimal',
    16 : 'Hexadecimal'
};

let indices = [ 1, 2, 3 ];


let ascii = {
      0 : { 'code' : 'NUL', 'desc' : 'Null Character' },
      1 : { 'code' : 'SOH', 'desc' : 'Start of Header' },
      2 : { 'code' : 'STX', 'desc' : 'Start of Text' },
      3 : { 'code' : 'ETX', 'desc' : 'End of Text' },
      4 : { 'code' : 'EOT', 'desc' : 'End of Transmission' },
      5 : { 'code' : 'ENQ', 'desc' : 'Enquiry' },
      6 : { 'code' : 'ACK', 'desc' : 'Acknowledge' },
      7 : { 'code' : 'BEL', 'desc' : 'Bell / Alert' },
      8 : { 'code' : 'BS',  'desc' : 'Backspace' },
      9 : { 'code' : 'HT',  'desc' : 'Horizontal Tab' },
     10 : { 'code' : 'LF',  'desc' : 'Line Feed' },
     11 : { 'code' : 'VT',  'desc' : 'Vertical Tab' },
     12 : { 'code' : 'FF',  'desc' : 'Form Feed' },
     13 : { 'code' : 'CR',  'desc' : 'Carriage Return' },
     14 : { 'code' : 'SO',  'desc' : 'Shift Out' },
     15 : { 'code' : 'SI',  'desc' : 'Shift In' },
     16 : { 'code' : 'DLE', 'desc' : 'Data Link Escape' },
     17 : { 'code' : 'DCL', 'desc' : 'Device Control 1 (XOn)' },
     18 : { 'code' : 'DC2', 'desc' : 'Device Control 2' },
     19 : { 'code' : 'DC3', 'desc' : 'Device Control 3 (XOff)' },
     20 : { 'code' : 'DC4', 'desc' : 'Device Control 4' },
     21 : { 'code' : 'NAK', 'desc' : 'Negative Acknowledge' },
     22 : { 'code' : 'SYN', 'desc' : 'Synchronous Idle' },
     23 : { 'code' : 'ETB', 'desc' : 'End of Transmission Block' },
     24 : { 'code' : 'CAN', 'desc' : 'Cancel' },
     25 : { 'code' : 'EM',  'desc' : 'End of Medium' },
     26 : { 'code' : 'SUB', 'desc' : 'Substitute' },
     27 : { 'code' : 'ESC', 'desc' : 'Escape' },
     28 : { 'code' : 'FS',  'desc' : 'File Separator' },
     29 : { 'code' : 'GS',  'desc' : 'Group Separator' },
     30 : { 'code' : 'RS',  'desc' : 'Record Separator' },
     31 : { 'code' : 'US',  'desc' : 'Unit Separator' },
     32 : { 'code' : '_',   'desc' : 'Space' },
    127 : { 'code' : 'DEL', 'desc' : 'Delete' }
};


document.addEventListener( 'keypress', (e) => {
    var code = e.keyCode;

    updateAllBases( code );
    updateAllCalcs();
    updateDecimal();
    updateASCII();
} );


document.addEventListener( 'keydown', (e) => {
    //console.log( e.which || e.keyCode );

    var code = e.keyCode;

    if( [8,9,13,27,46].includes( code ) ) {
        code = (code == 46) ? 127 : code;  // Bodge to show Delete (46) as DEL
        updateAllBases( code );
        updateAllCalcs();
        updateDecimal();
        updateASCII();
    }
} );



function resetValue() {
    updateAllBases( 0 );
    updateDecimal();
    updateASCII();
    updateColour();
}


function getNumDigits( base, index ) {
    return document.getElementById( 'explore-digits-' + base + '-' + index ).getElementsByClassName( 'digit' ).length;
}


function getValue( base, index ) {
    let value = 0;
    let numDigits = getNumDigits( base, index );

    // Run through all digits
    for( let power = numDigits - 1; power >=0; power-- ) {
        // Calc binary column value
        let column = Math.pow( base, power );
        // Get the value from the appropriate div
        let digitElement = document.getElementById( 'digit-' + base + '-' + index + '-' + power );
        let digit = parseInt( digitElement.innerHTML, base );

        // Update the value
        value += digit * column;
    }

    return value;
}


function getMax( base, index ) {
    let numDigits = getNumDigits( base, index );
    let setMax = document.getElementById( 'explore-digits-' + base + '-' + index ).dataset.max;
    let maxMax = Math.pow( base, numDigits ) - 1;
    return Math.min( setMax, maxMax );
}


function isLinked( base, index ) {
    let unlinked = document.getElementById( 'explore-digits-' + base + '-' + index ).dataset.unlinked;
    return !unlinked;
}


function changeValue( base, index, offset ) {
    // Deselect any mistaken selections
    window.getSelection().removeAllRanges();

    let decimal = getValue( base, index );
    let max = getMax( base, index );

    decimal += offset;
    if( decimal > max ) decimal = max;
    if( decimal < 0 )   decimal = 0;

    setDigits( base, index, decimal );
    setHighlighting( base, index );

    if( isLinked( base, index ) ) {
        updateAllBases( decimal );
        updateAllCalcs();
        updateDecimal();
    }

    updateASCII();
    updateColour();
}


function getCalc( base, index ) {
    let calc1 = '';
    let calc2 = '';
    let firstOne = true;
    let numDigits = getNumDigits( base, index );

    // Run through all digits
    for( let power = numDigits - 1; power >=0; power-- ) {
        // Calc binary column value
        let column = Math.pow( base, power );
        // Get the value from the appropriate div
        let digitElement = document.getElementById( 'digit-' + base + '-' + index + '-' + power );
        let digit = parseInt( digitElement.innerHTML, base );

        // Is a non-zero digit?
        if( digit != 0 ) {
            // Add label and an equals if it's our first digit
            if( firstOne ) {
                calc1 += '<p>'  + bases[base].substring(0,3) + ' = ';
                calc2 += '<br>' + bases[base].substring(0,3) + ' = ';
            }
            // Add a plus if it's not our first digit
            else {
                calc1 += ' + ';
                calc2 += ' + ';
            }
            firstOne = false;

            calc1 += '(<span class="digit">' + digit + '</span>×<span class="column">' + column + '</span>)';
            calc2 += '<span class="digit">' + (digit * column) + '</span>';
        }
    }

    return calc1 + calc2;
}



function updateAllBases( decimal ) {
    for( let base in bases ) {
        for( let index in indices ) {
            if( document.getElementById( 'explore-digits-' + base + '-' + index ) ) {
                setDigits( base, index, decimal );
                setHighlighting( base, index );
            }
        }
    }
}


function updateAllCalcs() {
    var calculation = document.getElementById( 'result-calc' );

    if( calculation ) {
        let fullCalc = '';

        for( let base in bases ) {
            for( let index in indices ) {
                if( document.getElementById( 'explore-digits-' + base + '-' + index ) ) {
                    fullCalc += getCalc( base, index );
                }
            }
        }

        calculation.innerHTML = fullCalc;
        //calculation.style.display = decimal == 0 ? 'none' : 'block';
    }
}


function updateDecimal() {
    var decimalResult = document.getElementById( 'result-value' );
    var decimal = -1;

    if( decimalResult ) {
        for( let base in bases ) {
            for( let index in indices ) {
                if( document.getElementById( 'explore-digits-' + base + '-' + index ) ) {
                    decimal = getValue( base, index );
                    break;
                }
            }

            if( decimal != -1 ) break;
        }

        if( decimal != -1 ) decimalResult.innerHTML = decimal.toLocaleString( 'en' );
    }
}


function updateASCII() {
    var asciiChar = document.getElementById( 'ascii-character' );
    var asciiDesc = document.getElementById( 'ascii-description' );
    var decimal = -1;

    if( asciiChar && asciiDesc ) {
        for( let base in bases ) {
            for( let index in indices ) {
                if( document.getElementById( 'explore-digits-' + base + '-' + index ) ) {
                    decimal = getValue( base, index );
                    break;
                }
            }

            if( decimal != -1 ) break;
        }

        if( decimal != -1 ) {
            if( decimal > 32 && decimal < 127 ) {
                asciiChar.innerHTML = String.fromCharCode( decimal );
                asciiChar.className = '';
                asciiDesc.innerHTML = '';
            }
            else {
                asciiChar.innerHTML = ascii[decimal].code;
    //            asciiChar.innerHTML = '&#' + (9216 + decimal) + ';';
                asciiChar.className = 'isControl';
                asciiDesc.innerHTML = '(<em>' + ascii[decimal].desc + '</em>)';
            }

            if( decimal == 32 ) {
                asciiChar.className = 'isSpace';
            }
        }
    }
}


function updateColour() {
    var rDec = document.getElementById( 'r-dec-value' );
    var gDec = document.getElementById( 'g-dec-value' );
    var bDec = document.getElementById( 'b-dec-value' );
    var rHex = document.getElementById( 'r-hex-value' );
    var gHex = document.getElementById( 'g-hex-value' );
    var bHex = document.getElementById( 'b-hex-value' );
    var patch = document.getElementById( 'colour-patch' );

    if( rDec && gDec && bDec && rHex && gHex && bHex && patch ) {
        var red   = getValue( 2, 1 );
        var green = getValue( 2, 2 );
        var blue  = getValue( 2, 3 );

        rDec.innerHTML = red.toLocaleString( 'en' );
        gDec.innerHTML = green.toLocaleString( 'en' );
        bDec.innerHTML = blue.toLocaleString( 'en' );

        rHex.innerHTML = Number( red   ).toString( 16 ).padStart( 2, '0' );
        gHex.innerHTML = Number( green ).toString( 16 ).padStart( 2, '0' );
        bHex.innerHTML = Number( blue  ).toString( 16 ).padStart( 2, '0' );

        patch.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
    }
}


function setDigits( base, index, decimal ) {
    var numDigits = getNumDigits( base, index );

    // Run through all digits
    for( let power = numDigits - 1; power >=0; power-- ) {
        // Calc binary column value
        let column = Math.pow( base, power );

        let digit = Math.floor( decimal / column );
        decimal -= digit * column;

        // Add the value to the appropriate div
        let digitElement = document.getElementById( 'digit-' + base + '-' + index + '-' + power );
        digitElement.innerHTML = digit.toString( base ).toUpperCase();

        if( digit > 9 ) {
            digitElement.innerHTML += '<span class="decvalue"> (' + digit + ')</span>';
        }
    }
}


function setHighlighting( base, index ) {
    var numDigits = document.getElementById( 'explore-digits-' + base + '-' + index ).getElementsByClassName( 'digit' ).length;

    // Run through all digits
    for( let power = numDigits - 1; power >=0; power-- ) {
        // Get the value from the appropriate div
        let digitElement = document.getElementById( 'digit-' + base + '-' + index + '-' + power );
        let labelElement = document.getElementById( 'label-' + base + '-' + index + '-' + power );
        let digit = parseInt( digitElement.innerHTML, base );

        // Set styling classes as appropriate
        if( digit != 0 ) {
            digitElement.classList.add( 'isNotZero' );
            labelElement.classList.add( 'isUsed' );
        }
        else {
            digitElement.classList.remove( 'isNotZero' );
            labelElement.classList.remove( 'isUsed' );
        }
    }
}
