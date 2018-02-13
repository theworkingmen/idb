var xmlhttp;

/* actual rest call */
function loadXMLDoc(url,cfunc)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=cfunc;
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

/* makes a Rest call to the backend to get the data in XML */
function getCommitsTable()
{
	loadXMLDoc("api/about",function()
			{
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200)
			{
				var myArr = JSON.parse(this.responseText);
				loadTable(myArr);
			}
		}
			});
}

/* Load the rows in the html table */
function loadTable(arr) {
	var x, y, i, xmlDoc;
	// load the table
	var table = document.getElementById("commitTable");

	// get the response xml
	//xmlDoc = xmlhttp.responseXML;
	//x = xmlDoc.getElementsByTagName("name");
	//y = xmlDoc.getElementsByTagName("meetingNum");

	/* load the table using the xml */
	//for (i = 0; (i < x.length) && (i < y.length); i++)
	for (i = 0; i < arr.length; i++)
	{
		/* add new row */
		var row = table.insertRow(i+1);
		var cell1 = row.insertCell(1);
		//var cell2 = row.insertCell(1);
		/* add the new values to the row */
		cell1.innerHTML = arr[i].name;
		//cell2.innerHTML = arr[i].commits;
	}
}
