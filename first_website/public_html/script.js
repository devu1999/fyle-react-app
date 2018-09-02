function openNav() {
    document.getElementById("mySidenav").style.width = "17vw";
    document.getElementById("main").style.marginLeft = "17vw";
    document.getElementById("content").style.opacity=0;
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("content").style.opacity=1;
} 