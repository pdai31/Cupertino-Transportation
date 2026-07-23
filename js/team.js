const params = new URLSearchParams(window.location.search);

const teamName = params.get("team");

const team = teams[teamName];

if(!team){

document.body.innerHTML="<h1>Team not found</h1>";

throw new Error("Invalid team");

}

document.getElementById("teamTitle").textContent =
team.icon + " " + team.title;

document.getElementById("teamDescription").textContent =
team.description;

let html="";

team.members.forEach(member=>{

html += `

<div class="card">

<h2>${member.name}</h2>

<h4>${member.role}</h4>

<p>${member.bio}</p>

</div>

`;

});

document.getElementById("members").innerHTML = html;