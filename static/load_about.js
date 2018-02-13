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

/* makes a Rest call to the backend to get the data in Json */
function getCommitsTable()
{
	loadXMLDoc("api/about",function()
			{
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200)
			{
				var myArr = JSON.parse(this.responseText);
				loadData(myArr);
			}
		}
			});
}

/* Load github api data */
function loadData(arr) {
	var x, y, i, xmlDoc;
	// load the table
	var total_commits = document.getElementById("total_commits");
	total_commits.innerHTML = arr.total.commits;
	var total_issues = document.getElementById("total_issues");
	total_issues.innerHTML = arr.total.issues;

	var abel_commits = document.getElementById("abel_commits");
	abel_commits.innerHTML = "Number of Commits: " + arr.individual.abelhtt.commits ;
	var abel_issues = document.getElementById("abel_issues");
	abel_issues.innerHTML = "Number of Issues: " + arr.individual.abelhtt.issues;
}
