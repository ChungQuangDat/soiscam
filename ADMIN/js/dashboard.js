let scammerData = [];
const dashboardTableBody = document.querySelector(".dashboard-table__body")
const dashboardTopTotal = document.querySelector(".dashboard__top-total");
//handle render Scammer pending
function handleRenderScammerApprove(item){
const tableBodyItemHTML = `
<tr class="dashboard__table-bodyitem" data-id="${item.id}">
     <td>#${item.id}</td>
     <td class="pcs">${item.nameScammer}</td>
     <td class="cur">${item.accountScammer}</td>
     <td class="per">${item.bankScammer}</td>
     <td class="per">${item.phoneScammer}</td>
     <td class="per">${item.nameSender}</td>
     <td class="per">${formatDate(item.date)}</td>
     <td class="table__action-icon">
       <span class="table__action-view">
           <i class="fa-solid fa-eye"></i>
       </span>
       <span class="table__action-remove">
           <i class="fa-solid fa-trash"></i>
       </span>
     </td>
   </tr>
   `;
dashboardTableBody.insertAdjacentHTML("afterbegin",tableBodyItemHTML)
}
//end handle render scammer pending
// handle get scammer pending
 async function handleGetScammerPending(){
   try {
     const response = await axios.get(endpoint)
    scammerData = await response.data;
    dashboardTableBody.innerHTML ="";
   const pendingScammerData = scammerData.filter(item => item.approve === true || item.approve === "true");
   dashboardTopTotal.textContent = `(Có ${pendingScammerData.length} đơn đợi duyệt)`;
   if(pendingScammerData && pendingScammerData.length > 0){
     pendingScammerData.forEach(item => {
       handleRenderScammerApprove(item)
   });
   } else {
     renderNotFound("Chưa có đơn nào");
   }
  
   } catch (error) {
    
   }
   
   
 }
 handleGetScammerPending();
//end handle get scammer pending

//handle view scammer
document.body.addEventListener("click", (e) =>{
  const modal = e.target.closest(".modal")
  
  if(e.target.closest(".table__action-view")){
    const scammerItem = e.target.closest(".dashboard__table-bodyitem")
    handleShowModal(scammerItem.dataset.id);
    
  } else if(e.target.matches(".modal-header-close") || e.target.matches(".modal-overlay")){
    modal.remove();
    
  }
})
//end handle view scammer


//handle remove scammer
async function handleRemoveScammer(id) {
  
  try {
    const result = await Swal.fire({
      title: "Bạn chắc muốn xóa!",
      text: "Khi bạn xóa không thể quay lại được nữa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy"
    });

    if ( result.isConfirmed) {
      const response = await axios.delete(`${endpoint}/${id}`);
         await handleGetScammerPending();
      console.log(response.data);

      await Swal.fire({
        title: "Đã xóa!",
        text: "File của bạn đã được xóa",
        icon: "success"
      });
    }
  } catch (error) {
    console.error("Lỗi khi xóa scammer:", error);
  }
}


document.body.addEventListener("click", (e) => {
 
 if(e.target.closest(".table__action-remove")){
       const scammerItem = e.target.closest(".dashboard__table-bodyitem");
       handleRemoveScammer(scammerItem.dataset.id);
 }
});
//end handle remove scammer