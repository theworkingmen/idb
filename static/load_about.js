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

	var mitchell_commits = document.getElementById("mitchell_commits");
	mitchell_commits.innerHTML = "Number of Commits: " + arr.individual.traylor1.commits ;
	var mitchell_issues = document.getElementById("mitchell_issues");
	mitchell_issues.innerHTML = "Number of Issues: " + arr.individual.traylor1.issues;

	var neal_commits = document.getElementById("neal_commits");
	neal_commits.innerHTML = "Number of Commits: " + arr.individual.NealFM.commits ;
	var neal_issues = document.getElementById("neal_issues");
	neal_issues.innerHTML = "Number of Issues: " + arr.individual.NealFM.issues;

	var sup_commits = document.getElementById("sup_commits");
	sup_commits.innerHTML = "Number of Commits: " + arr.individual.smcw66.commits ;
	var sup_issues = document.getElementById("sup_issues");
	sup_issues.innerHTML = "Number of Issues: " + arr.individual.smcw66.issues;

	var christian_commits = document.getElementById("christian_commits");
	christian_commits.innerHTML = "Number of Commits: " + arr.individual.christian-onuogu.commits ;
	var christian_issues = document.getElementById("christian_issues");
	christian_issues.innerHTML = "Number of Issues: " + arr.individual.christian-onuogu.issues;
}
