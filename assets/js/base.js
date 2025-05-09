//Variables
const header = document.querySelector(".header");
const openMenuBtn = document.querySelector(".header__open-menu");
const headerNavList = document.querySelector(".header__nav-list");
const closeMenuBtn = document.querySelector(".header__close-menu");
//end Variables

window.addEventListener("scroll", () => {
    const headerHeight = header.offsetHeight;//kiểm tra chiều cao của header
    const marginTopHeader = parseFloat(getComputedStyle(header).marginTop);//Kiểm tra margin top them parseFloat để chuyển về kiẻu number
    const totalHeaderHeight = headerHeight + marginTopHeader;

if(window.scrollY > totalHeaderHeight) {   //Lấy số pixel người dùng đã cuộn xuống từ trên cùng của trang.
      header.classList.add("fixed");
      document.body.classList.add("active");
} else {
    header.classList.remove("fixed");
    document.body.classList.remove("active");
}

});

//handle show menu
openMenuBtn.addEventListener("click" , handleShowMenu);
closeMenuBtn.addEventListener("click", handlecloseMenu);
 function handleShowMenu(){
    headerNavList.classList.add("active");
    document.body.style.overflow = "hidden"; //Tắt cái cuộn
 }
 function handlecloseMenu(){
    headerNavList.classList.remove("active");
    document.body.style.overflow = "auto"; //Bật lại cái cuộn
 }
//end handle show menu
