//firebase config
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

//define DOM objects
const btnLogin = document.getElementById("btn-login")
const errorMsg = document.getElementById("error-message")
const items = document.querySelectorAll('.carousel .carousel-item')
let map; //for google map

//event listener
btnLogin.addEventListener("click",()=>{login()})

//carousel control
items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (let i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

function login () {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    if (validate_password(password) == false) {
      errorMsg.innerText = "please enter password with 6 digits or more"
      return
    }
    if (validate_email(email) == false) {
      errorMsg.innerText = "invalid email"
      return
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      const user = auth.currentUser
      const database_ref = database.ref()
      database_ref.child('users/' + user.uid)
      sessionStorage.setItem("username",user.uid)
      window.location = "./portal";
      
    })
    .catch(function(error) {
      if (error.code === "auth/wrong-password"){
        errorMsg.innerText="incorrect password"
      }else if(error.code === "auth/user-not-found"){
        errorMsg.innerText="no registered user with this email address"
      }else{
        errorMsg.innerText=error.message
      }}
    )
    
  }
  
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      return true
    } else {
      return false
    }
  }
  
  function validate_password(password) {
    if (password.length < 6) {
      return false
    } else {
      return true
    }
  }
  
  function register(){
    window.location = "./register/"
  }



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.91568230713185, lng:-1.2326348404747955},
    zoom: 13,
  });
  var marker = new google.maps.Marker({
    position: { lat: 52.91568230713185, lng:-1.2326348404747955},
    title:"Body First"
});
marker.setMap(map);
}

window.initMap = initMap;