 //Variable
const warningHeader = document.querySelectorAll(".warning-header");
const scammerList = document.querySelector(".scammers-list");
const alertscamtitle = document.querySelector(".alert-scam__title");
const alertScamDes = document.querySelector(".alert-scam__desc");
const scammerListWrap = document.querySelector(".scammer__ListWrap");
const loading = document.querySelector(".loading");
const formsearch = document.querySelector(".form-search");
let scammerData = [];
//Variable


alertscamtitle.textContent = `Hôm nay ${formatDate()} `;


//Xử lí dropdown warning
warningHeader.forEach(item => item.addEventListener("click", handleShowDropdown))

function handleShowDropdown(e){
const warningContent = e.target.nextElementSibling;
const warningContentAll = document.querySelectorAll(".warning-content");
const warningIcon = e.target.querySelector(".warning-header-icon")
const warningIconAll = document.querySelectorAll(".warning-header-icon")
   warningIconAll.forEach((item) => {
      if (item != warningIcon) {
         item.classList.remove("active");
      }
   });
warningContentAll.forEach((item) => {
     if (item != warningContent){
        item.style.height = 0;//Khi mở nội dung khác phần tử cũ bị đóng lại
        item.classList.remove("active");//xóa cái có active đi
     }           
});
warningContent.style.height = `${warningContent.scrollHeight}px`;//Mở rộng nội dung
warningContent.classList.toggle("active");
warningIcon.classList.toggle("active");
if(!warningContent.classList.contains("active")){
        warningContent.style.height = 0;
 }
}
// End xử lí dropdown warning

//Xử lí show modal
 document.body.addEventListener("click", (e) => {
   const modal = document.querySelector(".modal");
     if (e.target.matches(".modal-header-close") ||  (e.target.matches(".modal-overlay"))){
      modal.remove();
      document.body.style.overflow = "auto";
     } else if (e.target.matches(".scammers-item")) {
      handleShowModal(e.target.dataset.id);
     }
  });
//End xử lí show modal

//handle render Scammer Today:hiển thị nội dung ra giao diện người dùng.
  function renderScammerToday(data) {
    const todayDate = new Date();
    todayDate.setHours(0,0,0,0);
    const todayData = data.filter(item => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0,0,0,0);
      return itemDate.getTime() === todayDate.getTime()
    });

    alertScamDes.textContent = `Có ${todayData.length} cảnh báo`;
    if(todayData && data.length > 0) {
      todayData.forEach((item) => {
       scammerList.insertAdjacentHTML("afterbegin", renderScammerItemHTML(item));
      });
    } else{
      scammerListWrap.innerHTML =`
      <div>
          <span> Không hiển thị dữ liệu</span>
      </div>
      `
    }
  }
//end handle renderScammer Today




//handle get scammer
async function getScammer() {
  loading.classList.add("active")
    try {
      loading.classList.remove("active")
      const response = await axios.get(endpoint);
      scammerData = await response.data;
      const approveScammerData = scammerData.filter(item => item.approve === true )
        renderScammerToday(approveScammerData)
      console.log(scammerData);
    } catch (error) {
      loading.classList.remove("active")
      console.error(error);
    }
}
getScammer();
//end handle get scammer


//handle search
formsearch.addEventListener("submit", (e) =>{
  e.preventDefault();
  const inputSearch = e.target.querySelector(".form-search__input")
  
  window.location.href = `./scammers.html?search=${inputSearch.value}`;
});
//end handle search

