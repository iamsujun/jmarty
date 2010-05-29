(function( window, undefined ){
var jmarty = {
    ini: function( selector ){
        alert( $.selector );
    },
    name: 'Jmarty',
    version: '0.0.1',
    tpl: '',
    valueList: [],

    setTpl: function( tpl ){
        var regExp = /\{\s*(\S*?)\s*}/g;
        $.tpl = tpl.replace( regExp, '{$1}');
    },
    getVar: function( key ){
        var str = '{\\$' + key + '}';
        var reg = new RegExp( str, "gim" );
        return reg;
    },
    assign: function( key, value ){
        $.valueList[ key ] = value;
    },
    setVar: function(){
        for ( key in $.valueList )
        {
            var value = $.valueList[ key ];
            var regExp = $.getVar( key );
            $.tpl = $.tpl.replace( regExp, value );
        }
    },
    setForeach: function(){
        var regExp = /\{\s*foreach\s*from=\s*\$(.*?)\s*item=\s*(.*?)\s*}(.*)\{\s*\/foreach\s*}/gim;
        //var regExp = new RegExp( '{foreach from=\\$(.*?) item=(.*?)}(.*){\/foreach}', 'gim');
        //var regExp = new RegExp( '{\s*foreach\s*from=\s*\\$(.*?)\s*item=\s*(.*?)\s*}(.*){\s*\/foreach\s*}', 'gim');
        //RegExp.multiline = true;
        $.tpl = $.tpl.replace( regExp, function( a, b, c, d ){
            var string='', data, value, item, reg;
            //data = eval( b );
            //alert( d.length )
            data = $.valueList[ b ];
            for( key in data )
            {
                value = data[ key ];
                item = d;
                for( o in value )
                {
                    reg = $.getVar(c+'.'+o);
                    item = item.replace( reg, value[ o ] );
                }
                string +=item;
            }
            return string;
        });
    },
    display: function(){
        $.setVar();
        $.setForeach();
        document.write( $.tpl );
    },
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
