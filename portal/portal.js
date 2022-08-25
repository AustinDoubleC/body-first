const firebaseConfig = {
  apiKey: "AIzaSyCf7V9yh1ldttFwXbgTbrb_PqGP4eT2PAc",
  authDomain: "fb-login-ac.firebaseapp.com",
  projectId: "fb-login-ac",
  storageBucket: "fb-login-ac.appspot.com",
  messagingSenderId: "441044041212",
  appId: "1:441044041212:web:3945be8eb0afb566448679"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()
const username = sessionStorage.getItem("username")

const getUserData=()=>{
  database.ref(`/users/${username}/`).once('value')
  .then(result=>{
  document.getElementById("greeting").innerText = "Hello, "+result.val().username
  if (!result.val().plan) {
      document.getElementById("plan").innerText = "Plan: No plans subscribed"
      subscribeDOM.style.display="flex"
      subscribeDOM.style.opacity=1
  }else {
      document.getElementById("plan").innerText = "Plan: "+result.val().plan
  }
  if (!result.val().program) {
      document.getElementById("program").innerText = "Program: No programs enrolled"
      if (result.val().plan){
          enrollDOM.style.display="block"
          setTimeout(()=>enrollDOM.style.opacity=1,200) 
      }
  }else {
      document.getElementById("program").style.display="none"
      document.getElementById("dashboard-program").innerText = result.val().program
      dashboardDOM.style.display = "block"
  }
})}
if (username){
  getUserData()
}else{
  console.log("Not logged in")
  //window.location.href="../"
}


const logout=()=>{
  auth.signOut().then(()=>{
      sessionStorage.clear()
      window.location.href="../"
  })
}