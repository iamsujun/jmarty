<?
class Jmarty
{
	var $jsName = 'jmarty.js';
	var $jsPath = './';
	var $templatePath = './';
	var $html = '';
	var $debug = true;
	function __construct()
	{
	}

	function assign( $varial, $value )
	{
		$this->html .= sprintf( "jmarty.assign( '%s', %s );", $varial, json_encode($value) );
	}

	function display( $tempName )
	{
		$js = $this->jsPath.$this->jsName;
		$template = $this->templatePath.$tempName;
		echo '<script type="text/javascript" src="'.$js.'"></script>';
		echo '<script>jmarty.setTpl( "'.$template.'" );'.$this->html.'jmarty.display();</script>';
	}

	function __destruct()
	{
	}
}
?>