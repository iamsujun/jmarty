/**
 * Jmarty JavaScript Template Engine v0.1.0
 * http://code.google.com/p/jmarty/
 *
 * Copyright 2010, iamsujun
 *
 * Date Victor 2010-09-08 12:38:26
 */
(function( window, undefined ){
var jmarty = {
    // Engine name
    name: 'Jmarty',

    // Version
    version: '0.0.1',

    // Template
	Template: [],
    current_tpl: '',

    // Var value list
    valueList: [],

    // Engine set
    ini: function( selector ){
        alert( $.selector );
    },

    // Template set
    setTpl: function( fileName ){
		var tpl_index = fileName.replace( /\./g, '_' );
		if( !$.Template.tpl_index )
		{
			$.current_tpl = $.ajax( fileName );
			var regExp = /\{\s*(\S*?)\s*}/g;
			$.current_tpl = $.current_tpl.replace( regExp, '{$1}');
			$.Template.tpl_index = $.current_tpl;
		}
		else
		{
			$.current_tpl = $.Template.tpl_index;
		}
        //alert(  $.current_tpl )
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
            $.current_tpl = $.current_tpl.replace( regExp, value );
        }
    },

    // Set foreach
    setForeach: function(){
        var regExp = /\{\s*foreach\s*from=\s*\$(.*?)\s*item=\s*(.*?)\s*}(.*?)\{\s*\/foreach\s*}/gim;
        //var regExp = new RegExp( '{\s*foreach\s*from=\s*\\$(.*?)\s*item=\s*(.*?)\s*}(.*){\s*\/foreach\s*}', 'gim');
        //RegExp.multiline = true;
        $.current_tpl = $.current_tpl.replace(/[\r\t\n]/g, ' ').replace( regExp, function( a, b, c, d ){
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
        document.write( $.current_tpl );
    },

    // Debug
    debug: function(){
        $.setTpl( 'Jmarty author is {     $name }- {$name}, { $name }.{ $name}' );
        $.assign( 'name', 'victor' );
        alert( $.current_tpl );
    },
    assign_1: function( key, value ){
        var reg = new RegExp( key, 'g' );
        $.current_tpl = $.current_tpl.replace( reg, value );
    },

	/**
	 * 简便Ajax请求
	 *
	 * @param varchar url  请求地址
	 * @param varchar type 请求类型post,get
	 * @param boolean sync 请求是否异步
	 */
	ajax: function ( url, type, sync )
	{
		var httpRequest,data;
		var type = type || 'get';
		var sync = sync || true;
		if( document.all )
		{
			httpRequest = new window.ActiveXObject("Microsoft.XMLHTTP");
		}
		else
		{
			httpRequest = new window.XMLHttpRequest();
		}
		//httpRequest.onreadystatechange = showResult;
		httpRequest.open( type, url, false );
		httpRequest.send();
		if ( httpRequest.readyState == 4 && httpRequest.status == 200 )//请求发送成功
		{
			return httpRequest.responseText;
		}
		else
		{
			alert( 'Ajax 请求出错！' );
			return false;
		}
	}

};

window.jmarty = window.$ = jmarty;
})( window );
