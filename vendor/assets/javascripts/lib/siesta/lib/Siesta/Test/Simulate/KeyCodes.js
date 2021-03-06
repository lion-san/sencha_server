/*

Siesta 3.0.2
Copyright(c) 2009-2015 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Test.Simulate.KeyCodes
@singleton

This is a singleton class, containing the mnemonical names for various advanced key codes. You can use this names in the {@link Siesta.Test.Browser#type} method, like this:

    t.type(el, 'Foo bar[ENTER]', function () {
        ...
    })

Below is the full list:

 - `BACKSPACE`

 - `TAB`

 - `RETURN`
 - `ENTER`

 - `SHIFT`
 - `CTRL`
 - `ALT`

 - `PAUSE-BREAK`
 - `CAPS`
 - `ESCAPE`
 - `NUM-LOCK`
 - `SCROLL-LOCK`
 - `PRINT`

 - `PAGE-UP`
 - `PAGE-DOWN`
 - `END`
 - `HOME`
 - `LEFT`
 - `UP`
 - `RIGHT`
 - `DOWN`
 - `INSERT`
 - `DELETE`


 - `NUM0`
 - `NUM1`
 - `NUM2`
 - `NUM3`
 - `NUM4`
 - `NUM5`
 - `NUM6`
 - `NUM7`
 - `NUM8`
 - `NUM9`

 - `F1`
 - `F2`
 - `F3`
 - `F4`
 - `F5`
 - `F6`
 - `F7`
 - `F8`
 - `F9`
 - `F10`
 - `F11`
 - `F12`

 */
Singleton('Siesta.Test.Simulate.KeyCodes', {

    methods : {
        isNav : function (k) {
            var keys = this.keys

            return (k >= 33 && k <= 40) ||
                k == keys.RETURN ||
                k == keys.TAB ||
                k == keys.ESCAPE;
        },

        isSpecial : function (k) {

            return (k === this.keys.BACKSPACE) ||
                (k >= 16 && k <= 20) ||
                (k >= 44 && k <= 46);
        },

        fromCharCode : function (code, readableForm) {
            var keys    = this.keys
            
            for (var key in keys) if (keys[ key ] === code && (!readableForm || key.length > 1)) return key;
        }
    },

    has : {
        // FROM Syn library by JupiterJS, MIT License. www.jupiterjs.com

        // key codes
        keys : {

            init : {
                //backspace
                '\b'          : 8,
                'BACKSPACE'   : 8,

                //tab
                '\t'          : 9,
                'TAB'         : 9,

                //enter
                '\r'          : 13,
                'RETURN'      : 13,
                'ENTER'       : 13,

                //special
                'SHIFT'       : 16,
                'CTRL'        : 17,
                'ALT'         : 18,

                //weird
                'PAUSE-BREAK' : 19,
                'CAPS'        : 20,
                'ESCAPE'      : 27,
                'NUM-LOCK'    : 144,
                'SCROLL-LOCK' : 145,
                'PRINT'       : 44,

                //navigation
                'PAGE-UP'     : 33,
                'PAGE-DOWN'   : 34,
                'END'         : 35,
                'HOME'        : 36,
                'LEFT'        : 37,
                'UP'          : 38,
                'RIGHT'       : 39,
                'DOWN'        : 40,
                'INSERT'      : 45,
                'DELETE'      : 46,

                //normal characters
                ' '           : 32,
                '0'           : 48,
                '1'           : 49,
                '2'           : 50,
                '3'           : 51,
                '4'           : 52,
                '5'           : 53,
                '6'           : 54,
                '7'           : 55,
                '8'           : 56,
                '9'           : 57,
                'A'           : 65,
                'B'           : 66,
                'C'           : 67,
                'D'           : 68,
                'E'           : 69,
                'F'           : 70,
                'G'           : 71,
                'H'           : 72,
                'I'           : 73,
                'J'           : 74,
                'K'           : 75,
                'L'           : 76,
                'M'           : 77,
                'N'           : 78,
                'O'           : 79,
                'P'           : 80,
                'Q'           : 81,
                'R'           : 82,
                'S'           : 83,
                'T'           : 84,
                'U'           : 85,
                'V'           : 86,
                'W'           : 87,
                'X'           : 88,
                'Y'           : 89,
                'Z'           : 90,

                //NORMAL-CHARACTERS, NUMPAD
                'NUM0'        : 96,
                'NUM1'        : 97,
                'NUM2'        : 98,
                'NUM3'        : 99,
                'NUM4'        : 100,
                'NUM5'        : 101,
                'NUM6'        : 102,
                'NUM7'        : 103,
                'NUM8'        : 104,
                'NUM9'        : 105,
                '*'           : 106,
                '+'           : 107,
                '-'           : 109,
                '.'           : 110,

                //normal-characters, others
                '/'           : 111,
                ';'           : 186,
                '='           : 187,
                ','           : 188,
                '-'           : 189,
                '.'           : 190,
                '/'           : 191,
                '`'           : 192,
                '['           : 219,
                '\\'          : 220,
                ']'           : 221,
                "'"           : 222,

                'F1'  : 112,
                'F2'  : 113,
                'F3'  : 114,
                'F4'  : 115,
                'F5'  : 116,
                'F6'  : 117,
                'F7'  : 118,
                'F8'  : 119,
                'F9'  : 120,
                'F10' : 121,
                'F11' : 122,
                'F12' : 123
            }
        }
        // eof key codes
    }
    // eof has
});