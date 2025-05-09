const endpoint = "https://680253870a99cb7408e94989.mockapi.io/Scammer";
//handle format date
function formatDate(dateString) {
    const date = dateString ? new Date(dateString) : new Date();
  
    const day = date.getDate();
    const month = date.getMonth() + 1;//Tháng lấy từ 0 nên phải + 1
    const year = date.getFullYear();
  
    const formatedDay = day < 10 ? `0${day}`  : day ;
    const formatedMonth = month < 10 ? `0${month}` : month ;
      return `${formatedDay}/${formatedMonth}/${year}`;
  }
  //end handle format date

  //render modal html
    function renderModalHTML(itemData){
        const imageListHTML = itemData.uploadImage.map((item, index) => `
        <a href="${item}">
         <img src="${item}" alt="ảnh bằng chứng ${itemData.nameSender} ${index + 1}">
        </a>
        `).join("");
        return  `<section class="modal">  <!--modal là cửa sổ pop-up -->
        <div class="modal-overlay"></div>  <!--Overlay là một lớp hiển thị đè lên nội dung chính của trang web hoặc ứng dụng -->
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header__title">Chi tiết tố cáo</div>
            <div class="modal-header-close">
              <img src="https://i.ibb.co/4RcZmMdB/Frame-1000004932.png" alt="close icon">
            </div>
          </div>
          <div class="modal-body">
            <div class="modal-group">
              <div class="modal-profile">
                <div class="modal-profile__avatar">
                  <img src="https://i.ibb.co/RkBN94F1/Hansel.png" alt="profile avatar">
                </div>
            <div class="modal-infor">
              <h4 class="modal-infor__name">${itemData.nameScammer}</h4>
              <p class="modal-infor__desc">#${itemData.id} - Tố vào ngày ${formatDate(itemData.date)} </p>
            </div>
              </div>
              <div class="modal-detail">
                <span class="modal-detail__title">Số điện thoại</span>
                <span class="modal-detail__text text-single">${itemData.phoneScammer}</span>
              </div>
              <div class="modal-detail">
                <span class="modal-detail__title">Số tài khoản</span>
                <span class="modal-detail__text text-single">${itemData.accountScammer}</span>
              </div>
              <div class="modal-detail">
                <span class="modal-detail__title">Ngân hàng</span>
                <span class="modal-detail__text text-single">${itemData.bankScammer}</span>
              </div>
            </div>
      
      
      
            <div class="modal-group">
              <div class="modal-profile">
                <div class="modal-profile__avatar">
                  <img src="https://i.ibb.co/KpzCzkYb/avatar-2.png" alt="profile avatar">
                </div>
            <div class="modal-infor">
              <h4 class="modal-infor__name">${itemData.nameSender}</h4>
              <p class="modal-infor__desc">Người tố cáo</p>
            </div>
              </div>
              <div class="modal-detail">
                <span class="modal-detail__title">Trạng thái</span>
                <span class="modal-detail__text text-single">${itemData.option}</span>
              </div>
              <div class="modal-detail">
                <span class="modal-detail__title">Liên hệ</span>
                <span class="modal-detail__text text-single">${itemData.phoneSender}</span>
                  
              </div>
              <div class="modal-textarea">
                <span class="modal-detail__title">Nội dung tố cáo</span>
                <p class="modal-textarea__content">${itemData.contentReport} </p>
              </div>
              <div class="modal-image">
                <span class="modal-detail__title">Hình ảnh liên quan</span>
                <div class="modal-review__image">
                 
                ${imageListHTML}
                  
               </div>
            </div>
          </div>
      
        </div>
      </section>   `
    }
  //end render modal html

  //handle show modal
  function handleShowModal(id){
    const scammer = scammerData.find(item => item.id === id);
   
       
  
    
    
     
    console.log(scammer);
    
      document.body.insertAdjacentHTML("afterbegin" , renderModalHTML(scammer));  //Dòng code này chèn nội dung HTML vào đầu <body> của trang web, cụ thể là ngay sau thẻ mở <body>.
      document.body.style.overflow = "hidden";  //Xóa thanh cuộn bên ngoài đi
      lightGallery(document.querySelector('.modal-review__image'), {
        plugins: [lgThumbnail],
    });
    }
  //end handle show modal



  //render scammer item html
  function renderScammerItemHTML(itemData){
    return `
      <li class="scammers-item" data-id="${itemData.id}">
          <img src="./assets/images/Hansel.png" alt="avatar" class="scammer-avatar">
          <div class="scammer-infor">
            <h3 class="scammer-name text-single">${itemData.nameScammer}</h3>
            <div class="scammer-date">#${itemData.id} - ${formatDate(itemData.date)}</div>
          </div>
        </li>`
  }
  //end render scmmr item html

  //render not found
  function renderNotFound(message = "Không có dữ liệu") {
    const tableBody = document.querySelector(".dashboard-table__body");
    if (!tableBody) return;
  
    tableBody.innerHTML = ""; // Xóa nội dung cũ nếu có
  
    const row = document.createElement("tr");
    const cell = document.createElement("td");
  
    cell.setAttribute("colspan", "8"); // Kéo dài toàn bộ hàng (vì bảng có 8 cột)
    cell.style.textAlign = "center";
    cell.style.color = "red";
    cell.style.fontWeight = "bold";
    cell.textContent = message;
  
    row.appendChild(cell); //Thêm phần tử con vào phần tử cha
    tableBody.appendChild(row);
  }
  
  
  //end render not found

  // remove text no mark
  function stringToSlug(str) {
    // remove accents
    var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i=0, l=from.length ; i < l ; i++) {
      str = str.replace(RegExp(from[i], "gi"), to[i]);
    }
  
    str = str.toLowerCase()
          .trim()
          .replace(/[^a-z0-9\-]/g, '-')
          .replace(/-+/g, '-');
  
    return str;
  }
  //end remove text no mark