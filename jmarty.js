/**
 * Jmarty JavaScript Template Engine v0.0.2
 * http://code.google.com/p/jmarty/
 *
 * Copyright 2010, iamsujun
 *
 * Date Victor 2010-05-29 19:29:21
 */
(function( window, undefined ){
var jmarty = {
    // Engine name
    name: 'Jmarty',

    // Version
    version: '0.0.1',

    // Template
    tpl: '',

    // Var value list
    valueList: [],

    // Engine set
    ini: function( selector ){
        alert( $.selector );
    },

    // Template set
    setTpl: function( html ){
        var regExp = /\{\s*(\S*?)\s*}/g;
        $.tpl = html.replace( regExp, '{$1}');
        //alert(  $.tpl )
    },

    // Get var RegExp
    getRegExp: function( key ){
        var str = '{\\$' + key + '}';
        var reg = new RegExp( str, "gim" );
        return reg;
    },

    // Assign value
    assign: function( key, value ){
        $.valueList[ key ] = value;
    },

    // Set var
    setVar: function(){
        for ( key in $.valueList )
        {
            var value = $.valueList[ key ];
            var regExp = $.getRegExp( key );
            $.tpl = $.tpl.replace( regExp, value );
        }
    },

    // Set foreach
    setForeach: function(){
        var regExp = /\{\s*foreach\s*from=\s*\$(.*?)\s*item=\s*(.*?)\s*}(.*?)\{\s*\/foreach\s*}/gim;
        //var regExp = new RegExp( '{\s*foreach\s*from=\s*\\$(.*?)\s*item=\s*(.*?)\s*}(.*){\s*\/foreach\s*}', 'gim');
        //RegExp.multiline = true;
        $.tpl = $.tpl.replace( regExp, function( a, b, c, d ){
            var string='', data, value, item, reg;
            data = $.valueList[ b ];
            for( key in data )
            {
                value = data[ key ];
                item = d;
                for( o in value )
                {
                    reg = $.getRegExp(c+'.'+o);
                    item = item.replace( reg, value[ o ] );
                }
                string +=item;
            }
            return string;
        });
    },

    // Display template
    display: function(){
        $.setVar();
        $.setForeach();
        document.write( $.tpl );
    },

    // Debug
    debug: function(){
        $.setTpl( 'Jmarty author is {     $name }- {$name}, { $name }.{ $name}' );
        $.assign( 'name', 'victor' );
        alert( $.tpl );
    },
    assign_1: function( key, value ){
        var reg = new RegExp( key, 'g' );
        $.tpl = $.tpl.replace( reg, value );
    }
};

window.jmarty = window.$ = jmarty;
})( window );
