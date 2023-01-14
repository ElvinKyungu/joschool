let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    
    let iconNavBar = document.querySelector('.fi-rr-menu-burger');

    iconNavBar.classList.toggle('fi-ss-cross')

    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
}

