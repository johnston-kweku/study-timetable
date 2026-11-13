
const t = (h, m = 0) => h * 60 + m;

const COURSES = {
  mat: { code: "MAT101", title: "Algebra and Trigonometry", credits: 3 },
  sta: { code: "STA101", title: "Introduction to Probability", credits: 3 },
  cms: { code: "CMS107", title: "Communicative Skills", credits: 3 },
  csc: { code: "CSC105", title: "Foundations of Computing", credits: 3 },
  ilt: { code: "ILT101", title: "Information Literacy", credits: 1 },
  lsc: { code: "LSC112", title: "Biotechnology and Society", credits: 3 }
};

/* Labels for non-course study blocks */
const KINDS = {
  asg: "Assignments",
  proj: "Coding and projects",
  plan: "Weekly planning"
};

/* Lectures (Group 94). venue: null shows "Venue to be confirmed".
   confirm: true shows a "confirm" badge for times copied from a sheet with unclear headings. */
const CLASSES = [
  { day: 1, course: "mat", start: t(13, 30), end: t(15, 30), venue: "LT20" },
  { day: 2, course: "sta", start: t(6, 30), end: t(8, 30), venue: "LT20", confirm: true },
  { day: 2, course: "lsc", start: t(14, 30), end: t(16, 30), venue: "NLT13" },
  { day: 3, course: "mat", start: t(7, 30), end: t(8, 30), venue: null },
  { day: 3, course: "sta", start: t(8, 30), end: t(9, 0), venue: "Online", confirm: true },
  { day: 3, course: "cms", start: t(11, 30), end: t(12, 30), venue: null },
  { day: 4, course: "cms", start: t(10, 30), end: t(12, 30), venue: null },
  { day: 5, course: "ilt", start: t(12, 30), end: t(13, 30), venue: null },
  { day: 5, course: "csc", start: t(17, 30), end: t(19, 30), venue: "SWLT06" }
];

/* Personal study blocks. kind is a course key (mat, sta, ...) or asg / proj / plan. */
const STUDY = [
  { day: 1, kind: "mat", start: t(20), end: t(21, 30), title: "MAT101",
    how: "Review today's lecture, then work practice problems on the same unit." },
  { day: 2, kind: "sta", start: t(20), end: t(21, 30), title: "STA101",
    how: "Redo the lecture examples, then try new problems. Write down every question you cannot solve." },
  { day: 3, kind: "mat", start: t(20), end: t(21), title: "MAT101",
    how: "Second pass on this morning's lecture. Fix mistakes from Monday's problems." },
  { day: 3, kind: "proj", start: t(21), end: t(22), title: "Coding and projects",
    how: "Free evening: one focused hour on your own project." },
  { day: 4, kind: "cms", start: t(20), end: t(20, 45), title: "CMS107",
    how: "Review today's lecture and practise the skill covered." },
  { day: 4, kind: "lsc", start: t(20, 45), end: t(21, 30), title: "LSC112",
    how: "Read the next topic in Biotechnology and Society." },
  { day: 5, kind: "csc", start: t(20, 30), end: t(21, 30), title: "CSC105",
    how: "Light session after class. Review hardware notes and read up on RAM and CPU parts." },
  { day: 6, kind: "asg", start: t(19, 30), end: t(21), title: "Assignments",
    how: "CSC105 and Biotechnology and Society: draft, revise, and note the sources you use." },
  { day: 6, kind: "proj", start: t(21), end: t(22), title: "Coding and projects",
    how: "Optional extra project hour if you have energy left.", optional: true },
  { day: 0, kind: "sta", start: t(19), end: t(20), title: "STA101",
    how: "Read ahead on the next topic before it is taught." },
  { day: 0, kind: "mat", start: t(20), end: t(21), title: "MAT101",
    how: "Preview the coming unit and practise weak skills." },
  { day: 0, kind: "plan", start: t(21), end: t(21, 15), title: "Plan the week",
    how: "Check deadlines and list the three things that matter most." }
];

/* One line of context under each day name, plus an optional tip. */
const DAYS = {
  1: { name: "Monday", note: "Gym: Lower A",
       tip: "STA101 is at 6:30 AM tomorrow. Finish by 9:30 PM and sleep early." },
  2: { name: "Tuesday", note: "Gym: Upper A",
       tip: "MAT101 is at 7:30 AM tomorrow. Finish by 9:30 PM." },
  3: { name: "Wednesday", note: "Gym rest day" },
  4: { name: "Thursday", note: "Gym: Lower B" },
  5: { name: "Friday", note: "Gym: Upper B" },
  6: { name: "Saturday", note: "Cadet drill at dawn" },
  0: { name: "Sunday", note: "Rest day" }
};

const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];
const HEADER = "Level 100 · Semester 1, 2026/27 · Group 94";
