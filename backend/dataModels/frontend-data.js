const navigation = [
  { id: "#homeId",name: "Home" },
  { id: "#feauturesId",name: "Feautures" },
  { id: "#pricingId",name: "Pricing" },
  { id: "#contactId",name: "Contct" },
  { id: "#blogId",name: "Blog" }
];

const navTitle = "TaskNest - Simplify Your Workflow";
const logoImg = "/images/logo.png";
const title = {
  titleOne: "TASK ",
  titleTwo: "NEST"
};

const auth = {
  login: "Log In",
  signup: "Sign Up"
};

const loginButton = {
  selectRole: "Select Role",
  admin: "admin",
  member: "member",
  nonRegister: "Not registered? ",
  createAcc: "Create an account"
};

const signupButton = {
  loginHere: "Login here"
};

const homeContent = {
  plan: "Plan.",
  manage: "Manage.",
  achieve: "Achieve.",
  h3Content: "Smart Task Management and Seamless Team Collaboration in One Powerful Platform!",
  p1: "Welcome to TaskNest – your all-in-one workspace to streamline workflows, assign tasks, and track progress with ease. ",
  p3: "Designed for modern teams, TaskNest empowers you to boost productivity, enhance transparency, and simplify team coordination, ",
  p4: "whether you're working remotely or in the office. Say goodbye to missed deadlines and scattered communications —",
  p5: "say hello to organized success."
};

const sectionOne = {
  title: "Track Progress",
  p1: "Manage your team effectively with our smart project management system.",
  p3: "Assign tasks based on departments and dependencies to maintain smooth workflow."
};

const featureOneList = {
  liOne: "Department-wise task allocation",
  liTwo: "Real-time monitoring",
  liThree: "Task distribution insights"
};

const sectionTwo = {
  title: "Collaborate with the Team",
  p1: "Share updates, provide feedback, and assign tasks—all in one place. ",
  p3: "Enhance communication with built-in collaboration tools."
};

const featureTwoList = {
  liOne: "Centralized communication",
  liTwo: "Task assignment",
  liThree: "Role-based permissions"
};

const sectionThree = {
  title: "Ready-made Templates",
  p1: "Speed up your workflow with professionally built templates tailored to your domain. ",
  p3: "Save time and maintain consistency across tasks."
};

const featureThreeList = {
  liOne: "Quick setup",
  liTwo: "Industry-specific template library",
  liThree: "Customizable templates"
};

const sectionFour = {
  title: "AI Auto-Review & Validation",
  p1: "Eliminate errors before they occur with smart validation. Instantly verify tasks,  ",
  p3: "maintain data accuracy, and reduce rework with timestamped results."
};

const featureFourList = {
  liOne: "Instant task verification",
  liTwo: "Data consistency & accuracy",
  liThree: "Reduced rework"
};

const media = {
  homepageVideo: "/videos/intro-video.mp4",
  sectionImages: {
    slide1: "/images/task_distribution.jpg",
    slide2: "/images/collaboration with a team.jpg",
    slide3: "/images/templates.jpg",
    slide4: "/images/validation.jpg"
  },
  imageAlts: {
    slide1: "Task Distribution Image",
    slide2: "Team Collaboration Image",
    slide3: "Templates Image",
    slide4: "Validation Image"
  }
};

const socialIcons = [
  { href: "#",src: "/images/facebook.png",alt: "Facebook" },
  { href: "#",src: "/images/x.jpg",alt: "X" },
  { href: "#",src: "/images/instagram.jpg",alt: "Instagram" },
  { href: "#",src: "/images/linkedin.png",alt: "LinkedIn" },
  { href: "#",src: "/images/youtube.png",alt: "YouTube" }
];

const companyLinks = [
  { label: "Home",href: "navlinks/home.html" },
  { label: "Features",href: "navlinks/feautures.html" },
  { label: "About Us",href: "#" },
  { label: "FAQs",href: "#" },
  { label: "Privacy Policy",href: "#" }
];

const supportLinks = [
  { label: "Contact Us",href: "navlinks/contactus.html" },
  { label: "Refund & Cancellation",href: "#" },
  { label: "Terms & Conditions",href: "#" },
  { label: "Contact Us",href: "#" }
];

const contactInfo = [
  { label: "Email",value: "support@tasknest.io" },
  { label: "Phone",value: "+91 98342007765" },
  { label: "Address",value: "4th Floor, ABC Towers, Madurai, India" },
  { label: "CIN",value: "U63796TN2025PTC000000" }
];

const footerBottom = "© TaskNest 2025. All rights reserved."

//form.jade 

const tabs = {
  add: "Add Task",
  view: "View Tasks"
};

const titles = {
  create: "Create Task",
  viewAll: "All Tasks"
};

const labels = {
  name: "Task Name",
  desc: "Description",
  date: "Due Date",
  priority: "Priority",
  member: "Team members",
  attachment: "Attachment"
};

const formPlaceholders = {
  member: "Example: Anbu"
};

const priorities = ["High","Medium","Low"];

const buttons = {
  submit: "Add Task",
  exportCSV: "Export CSV",
  exportPDF: "Export PDF"
};

const placeholders = {
  search: "Search task..."
};

const star = "*";



module.exports = {
  navigation,
  navTitle,
  logoImg,
  title,
  auth,
  loginButton,
  signupButton,
  homeContent,
  sectionOne,
  featureOneList,
  sectionTwo,
  featureTwoList,
  sectionThree,
  featureThreeList,
  sectionFour,
  featureFourList,
  media,
  companyLinks,
  supportLinks,
  contactInfo,
  socialIcons,
  footerBottom,tabs,
  titles,
  labels,
  formPlaceholders,
  priorities,
  buttons,
  placeholders,
  star
};
