/* Shared nav + footer, injected on every page */
(function () {
  const page = location.pathname.split("/").pop() || "index.html";

  const navHTML = `
  <nav class="navbar">
    <div class="nav-inner">
      <a class="brand" href="index.html">
        <span class="logo">🚸</span>
        <span>Cupertino Safe Streets<br><small>YPSI Transportation Safety Initiative</small></span>
      </a>
      <button class="hamburger" aria-label="Menu" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html" data-page="index.html">Home</a></li>
        <li><a href="about.html" data-page="about.html">About</a></li>
        <li><a href="map.html" data-page="map.html">Hazard Map</a></li>
        <li class="dropdown">
          <button class="drop-btn">Data ▾</button>
          <ul class="dropdown-menu">
            <li><a href="rankings.html" data-page="rankings.html">Hazard Rankings</a></li>
            <li><a href="dashboard.html" data-page="dashboard.html">Research Dashboard</a></li>
            <li><a href="analytics.html" data-page="analytics.html">Analytics</a></li>
            <li><a href="survey.html" data-page="survey.html">Community Survey</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <button class="drop-btn">Community ▾</button>
          <ul class="dropdown-menu">
            <li><a href="interviews.html" data-page="interviews.html">Interviews</a></li>
            <li><a href="bikefest.html" data-page="bikefest.html">BikeFest 🚴</a></li>
            <li><a href="education.html" data-page="education.html">Safety Education</a></li>
            <li><a href="news.html" data-page="news.html">News & Updates</a></li>
          </ul>
        </li>
        <li><a href="team.html" data-page="team.html">Our Team</a></li>
        <li><a href="contact.html" data-page="contact.html">Contact</a></li>
        <li><a href="report.html" class="cta-report" data-page="report.html">⚠ Report a Hazard</a></li>
      </ul>
    </div>
  </nav>`;

  const footerHTML = `
  <footer>
    <div class="footer-inner">
      <div>
        <h4>🚸 Cupertino Safe Streets</h4>
        <p style="font-size:0.9rem">A student-led YPSI initiative building safer streets through community hazard reporting, data analysis, and public education. Summer 2026.</p>
      </div>
      <div>
        <h4>Take Action</h4>
        <a href="report.html">Report a Hazard</a>
        <a href="map.html">View Hazard Map</a>
        <a href="survey.html">Take the Survey</a>
        <a href="bikefest.html">Join BikeFest</a>
      </div>
      <div>
        <h4>Learn</h4>
        <a href="education.html">Safety Education</a>
        <a href="dashboard.html">Research Dashboard</a>
        <a href="interviews.html">Community Voices</a>
        <a href="news.html">News & Updates</a>
      </div>
      <div>
        <h4>Connect</h4>
        <a href="about.html">About the Project</a>
        <a href="team.html">Our Team</a>
        <a href="contact.html">Contact Us</a>
      </div>
    </div>
    <div class="footer-bottom">© 2026 YPSI Transportation Safety & Hazard Reporting Initiative · Cupertino, CA · Built by students, for the community</div>
  </footer>`;

  document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("afterbegin", navHTML);
    document.body.insertAdjacentHTML("beforeend", footerHTML);
    document.querySelectorAll('.nav-links a[data-page="' + page + '"]').forEach(a => {
      if (!a.classList.contains("cta-report")) a.classList.add("active");
    });
  });
})();
