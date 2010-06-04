/**
 * 简便Ajax请求
 *
 * @param varchar url  请求地址
 * @param varchar type 请求类型post,get
 * @param boolean sync 请求是否异步
 */
var httpRequest, callback;
function createXMLHttpRequest ()
{
	if( document.all )
	{
		httpRequest = new window.ActiveXObject("Microsoft.XMLHTTP");
	}
	else
	{
		httpRequest = new window.XMLHttpRequest();
	}
}
function ajax ( url, fun )
{
	callback = fun;
	createXMLHttpRequest ();
	httpRequest.onreadystatechange = handleStateChange;
	httpRequest.open( 'get', url, true );
	httpRequest.send( null );
}

function handleStateChange ( )
{
	if ( httpRequest.readyState == 4 )//描述一种"已加载"状态；此时，响应已经被完全接收。
	{
		if ( httpRequest.status == 200 )////200表示成功收到
		{
			var data = httpRequest.responseText;
			callback( data );
		}
	}
}