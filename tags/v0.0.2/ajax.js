/**
 * 简便Ajax请求
 *
 * @param varchar url  请求地址
 * @param varchar type 请求类型post,get
 * @param boolean sync 请求是否异步
 */
function ajax ( url, type, sync )
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
		data = httpRequest.responseText;
		httpRequest = null;
		return data;
	}
	else
	{
		alert( 'Ajax 请求出错！' );
		return false;
	}
}