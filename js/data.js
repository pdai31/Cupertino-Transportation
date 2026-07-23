/* YPSI Transportation Safety — shared data store.
   Demo hazards are seeded below; user-submitted reports and confirmations
   are stored in localStorage so the site is fully demo-able without a backend. */

const HAZARD_CATEGORIES = [
  "Unsafe Intersection", "Broken Sidewalk", "Bike Lane Problem",
  "Poor Lighting", "Traffic Signal Issue", "Near Miss", "Other"
];

const NEIGHBORHOODS = [
  "Monta Vista", "Rancho Rinconada", "Garden Gate", "Seven Springs",
  "Jollyman", "North De Anza", "City Center", "Creston-Pharlap"
];

const CATEGORY_ICONS = {
  "Unsafe Intersection": "🚸", "Broken Sidewalk": "🧱", "Bike Lane Problem": "🚴",
  "Poor Lighting": "💡", "Traffic Signal Issue": "🚦", "Near Miss": "⚠️", "Other": "📍"
};

/* Seeded demo reports — realistic Cupertino locations */
const DEMO_HAZARDS = [
  { id: "d1", category: "Unsafe Intersection", title: "Crosswalk visibility at McClellan Rd & Bubb Rd",
    description: "Faded crosswalk markings and heavy morning traffic near Monta Vista HS. Drivers frequently fail to yield to students crossing.",
    lat: 37.3105, lng: -122.0492, neighborhood: "Monta Vista", date: "2026-06-18", reports: 17, confirms: 45, severity: "High" },
  { id: "d2", category: "Bike Lane Problem", title: "Bike lane blocked by parked cars on Stevens Creek Blvd",
    description: "Cars regularly park in the bike lane near the Target shopping center, forcing cyclists into traffic.",
    lat: 37.3236, lng: -122.0313, neighborhood: "City Center", date: "2026-06-20", reports: 12, confirms: 31, severity: "High" },
  { id: "d3", category: "Traffic Signal Issue", title: "Short pedestrian signal at De Anza Blvd & Stevens Creek Blvd",
    description: "The walk signal is too short for seniors and families with small children to cross all six lanes.",
    lat: 37.3230, lng: -122.0322, neighborhood: "City Center", date: "2026-06-22", reports: 9, confirms: 28, severity: "High" },
  { id: "d4", category: "Broken Sidewalk", title: "Uplifted sidewalk on Bollinger Rd near Miller Ave",
    description: "Tree roots have raised sidewalk panels by several inches — a trip hazard, especially at night.",
    lat: 37.3110, lng: -122.0060, neighborhood: "Rancho Rinconada", date: "2026-06-25", reports: 6, confirms: 14, severity: "Medium" },
  { id: "d5", category: "Poor Lighting", title: "Dark stretch on Foothill Blvd near Stevens Creek",
    description: "No street lights for a long stretch used by cyclists and joggers in the early morning and evening.",
    lat: 37.3169, lng: -122.0616, neighborhood: "Monta Vista", date: "2026-06-27", reports: 5, confirms: 19, severity: "Medium" },
  { id: "d6", category: "Near Miss", title: "Near-miss hotspot at Homestead Rd & Wolfe Rd",
    description: "Multiple students report close calls with right-turning vehicles while biking to Homestead HS.",
    lat: 37.3378, lng: -122.0147, neighborhood: "North De Anza", date: "2026-06-29", reports: 11, confirms: 26, severity: "High" },
  { id: "d7", category: "Unsafe Intersection", title: "Blind corner at Prospect Rd & Stelling Rd",
    description: "Overgrown hedges block sightlines for drivers and cyclists at this corner near Seven Springs.",
    lat: 37.2932, lng: -122.0335, neighborhood: "Seven Springs", date: "2026-07-01", reports: 4, confirms: 9, severity: "Medium" },
  { id: "d8", category: "Bike Lane Problem", title: "Bike lane gap on McClellan Rd near De Anza College",
    description: "Protected bike lane ends abruptly, merging cyclists into a busy travel lane with no warning signage.",
    lat: 37.3157, lng: -122.0451, neighborhood: "Garden Gate", date: "2026-07-02", reports: 8, confirms: 22, severity: "High" },
  { id: "d9", category: "Traffic Signal Issue", title: "Bike detection not working at Blaney Ave & Bollinger Rd",
    description: "Signal sensor doesn't detect bicycles — riders wait through multiple cycles or cross on red.",
    lat: 37.3113, lng: -122.0179, neighborhood: "Jollyman", date: "2026-07-03", reports: 5, confirms: 12, severity: "Medium" },
  { id: "d10", category: "Broken Sidewalk", title: "Cracked path along Regnart Creek Trail entrance",
    description: "Broken pavement at the trail entrance off Pacifica Dr is hazardous for scooters and strollers.",
    lat: 37.3179, lng: -122.0247, neighborhood: "City Center", date: "2026-07-05", reports: 3, confirms: 7, severity: "Low" },
  { id: "d11", category: "Poor Lighting", title: "Dim crossing at Rainbow Dr & Bubb Rd",
    description: "Pedestrian crossing near Kennedy MS is poorly lit; drivers report not seeing pedestrians until very close.",
    lat: 37.2986, lng: -122.0450, neighborhood: "Seven Springs", date: "2026-07-06", reports: 6, confirms: 16, severity: "Medium" },
  { id: "d12", category: "Near Miss", title: "School pickup congestion on Finch Ave at Sedgwick Elementary",
    description: "Double-parked cars during pickup force children to weave between vehicles. Several near misses reported.",
    lat: 37.3134, lng: -122.0027, neighborhood: "Rancho Rinconada", date: "2026-07-08", reports: 7, confirms: 21, severity: "High" },
  { id: "d13", category: "Unsafe Intersection", title: "Confusing merge at Stevens Creek Blvd & Tantau Ave",
    description: "Lane markings are worn and drivers merge unpredictably near the Apple Park area, endangering cyclists.",
    lat: 37.3238, lng: -122.0080, neighborhood: "Creston-Pharlap", date: "2026-07-10", reports: 5, confirms: 11, severity: "Medium" },
  { id: "d14", category: "Bike Lane Problem", title: "Debris in bike lane on Stelling Rd near Garden Gate",
    description: "Glass and gravel accumulate in the bike lane; cyclists swerve into traffic to avoid flats.",
    lat: 37.3222, lng: -122.0450, neighborhood: "Garden Gate", date: "2026-07-11", reports: 3, confirms: 6, severity: "Low" },
  { id: "d15", category: "Other", title: "Missing wayfinding signs on Don Burnett Bridge approach",
    description: "Cyclists unfamiliar with the area can't find the bike bridge entrance over I-280 from Mary Ave.",
    lat: 37.3346, lng: -122.0450, neighborhood: "Garden Gate", date: "2026-07-12", reports: 2, confirms: 5, severity: "Low" }
];

/* ---------- Store ---------- */
const Store = {
  _key: "ypsi_user_hazards",
  _confirmKey: "ypsi_confirms",

  userHazards() {
    try { return JSON.parse(localStorage.getItem(this._key)) || []; }
    catch (e) { return []; }
  },

  allHazards() {
    const extra = this.getConfirmMap();
    return DEMO_HAZARDS.concat(this.userHazards()).map(h => ({
      ...h,
      confirms: (h.confirms || 0) + (extra[h.id] || 0)
    }));
  },

  addHazard(h) {
    const list = this.userHazards();
    h.id = "u" + Date.now();
    h.reports = 1;
    h.confirms = 0;
    h.severity = h.severity || "Medium";
    list.push(h);
    localStorage.setItem(this._key, JSON.stringify(list));
    return h;
  },

  getConfirmMap() {
    try { return JSON.parse(localStorage.getItem(this._confirmKey)) || {}; }
    catch (e) { return {}; }
  },

  confirm(id) {
    const m = this.getConfirmMap();
    m[id] = (m[id] || 0) + 1;
    localStorage.setItem(this._confirmKey, JSON.stringify(m));
  },

  hasConfirmed(id) {
    return !!sessionStorage.getItem("ypsi_confirmed_" + id);
  },

  markConfirmed(id) {
    sessionStorage.setItem("ypsi_confirmed_" + id, "1");
  }
};

/* Credibility: 1–5 stars from confirmations + reports */
function credibilityScore(h) {
  const score = h.confirms * 1 + h.reports * 2;
  if (score >= 60) return 5;
  if (score >= 40) return 4;
  if (score >= 20) return 3;
  if (score >= 10) return 2;
  return 1;
}
function starString(n) { return "★".repeat(n) + "☆".repeat(5 - n); }
function severityBadge(s) {
  const cls = s === "High" ? "badge-high" : s === "Medium" ? "badge-medium" : "badge-low";
  return '<span class="badge ' + cls + '">' + s + '</span>';
}
const teams = {

  leadership: {
    title : "Advisor & Project Leadership",
    icon : "🧭",
    description : "Overall coordination and project management",

    members: [
      {
        name: "Dr. Peng Dai",
        role : "Advisor",
        bio : "Guides the project, handles coordination with the city"
      }
    ]
  },
  technology: {
    title : "Technology Team",
    icon : "💻",
    description : "Manages the website, database, and user interface",

    members: [
      {
        name: "Kevin Yuan",
        role : "President",
        bio : "Leads the technology team, oversees website development and data management",
      },

      {
        name: "Ted Chu",
        role : "Director for web development",
        bio : "Oversees the development and maintenance of the website and user interface",
      },

      {
        name: "Alexander Liu",
        role : "Vice Director for web development",
        bio : "Assists in web development and ensures the website is user-friendly and functional",
      },

      {
        name: "Ryan Hsueh",
        role : "Director for data collection and analysis",
        bio : "Leads the research team in collecting and analyzing data on transportation hazards",
      },

      {
        name: "Liliana Chai",
        role : "Director for web and graphic design",
        bio : "Responsible for the visual design of the website and graphics used in hazard reporting",
      },

      {
        name: "Lilian Ren",
        role : "Vice Director for graphic design",
        bio : "Assists in graphic design, ensuring the website is visually appealing and accessible",
      }
    ]
  },
  research: {
    title : "Research & Data Team",
    icon : "🔬",
    description : "Conducts research on transportation safety and hazard reporting",

    members: [
    ]
  },
  outreach: {
    title : "Outreach & Media Team",
    icon : "📣",
    description : "Handles community outreach.",

    members: [
      {
        name: "Grant Yuan",
        role : "President",
        bio : "Leads the outreach team, coordinates with local organizations and schools to promote hazard reporting",
      },

      {
        name: "Valdus Cheng",
        role : "Director of Research",
        bio : "Conducts research on public opinion, analyzes data, and prepares reports for the team",
      },

      {
        name: "Haoxuan",
        role : "Director of Research",
        bio : "Conducts research on transportation safety, analyzes data, and prepares reports for the team",
      },

      {
        name: "Liliana Chai",
        role : "Director of Community Outreach",
        bio : "Organizes community events, workshops, and campaigns to raise awareness about transportation hazards and safety",
      },

      {
        name: "Ryan Hsueh",
        role : "Director of Interviews",
        bio : "Conducts interviews with community members, stakeholders, and experts to gather insights on transportation safety and hazard reporting",
      },

      {
        name: "Barry Wu",
        role : "Director of Digital Communications",
        bio : "Manages the team's social media presence, website content, and digital campaigns to engage the community and promote hazard reporting",
      },

      {
        name: "Zimeng Sun",
        role : "Director of Large Event (BikeFest)",
        bio : "Organizes and manages large-scale events, such as BikeFest, to promote cycling safety and community engagement",
      }
    ]
  }
}