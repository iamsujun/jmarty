# jmarty
Automatically exported from code.google.com/p/jmarty

### Welcome to Jmarty GitHub Pages.
Jmarty是一个用JavaScript?编写的模板引擎，前期参照smarty的功能开发，以后逐渐扩展。

### 引用Jmarty
    <script type='text/javascript' src='jmarty.js'></script>

### 片段
    // Template set
    setTpl: function( tpl ){
        var regExp = /\{\s*(\S*?)\s*}/g;
        $.tpl = tpl.replace( regExp, '{$1}');
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
