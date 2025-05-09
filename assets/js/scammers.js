//variable
const alertScamDes = document.querySelector(".alert-scam__desc");
const scammerList = document.querySelector(".scammers-list");
const loading = document.querySelector(".loading");
const scammerListWrap = document.querySelector(".scammer__ListWrap");
const formsearch = document.querySelector(".form-search");
const inputSearch = document.querySelector(".form-search__input");
let scammerData = [];
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("search");

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

//handle render Scammer All:hiển thị nội dung ra giao diện người dùng.
function renderScammerAll(data) {
    alertScamDes.textContent = `Có ${data.length} cảnh báo`;
    if(data && data.length > 0) {
      data.forEach((item) => {
        scammerList.insertAdjacentHTML("afterbegin", renderScammerItemHTML(item));
      });
    } 
  }
  //end handle renderScammer All

  //handle get scammer
async function getScammer() {
    loading.classList.add("active")
      try {
        loading.classList.remove("active")
        const response = await axios.get(endpoint);
        scammerData = await response.data;
        const approveScammerData = scammerData.filter(item => item.approve === true )
        if(query){
          const filterData = approveScammerData.filter((item) => item.accountScammer.includes(query.trim()) || item.phoneScammer.includes(query.trim()) || stringToSlug(item.nameScammer).includes(stringToSlug(query))
        );
          renderScammerAll(filterData);
          }else{
          renderScammerAll(approveScammerData);
          }
        console.log(approveScammerData);
      } catch (error) {
        loading.classList.remove("active")
        console.error(error);
      }
  }
  getScammer();
  //end handle get scammer

  //handle search scammer
  inputSearch.value = query;
   formsearch.addEventListener("submit", (e) =>{
    e.preventDefault();
     urlParams.set("search" , inputSearch.value);
     window.location.search = urlParams.toString();
   });
  //end handle search scammer