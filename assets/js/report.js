//Variable
const apiKey = "a5d3709a584a7c1e0ea60677c98e96e3";
const endpoint = "https://680253870a99cb7408e94989.mockapi.io/Scammer";
const uploadImageInput = document.getElementById("uploadImage");
const FormUploadWrap = document.querySelector(".form-upload__wrap");
let arrayImage = [];
const phoneScammerInput = document.getElementById("phoneScammer");
const bankNumberInput = document.getElementById("accountScammer");
const senderPhoneInput = document.getElementById("phoneSender");
const contentReportInput = document.getElementById("contentReport");
//end Variables

//content report Input
contentReportInput.addEventListener("input", (e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
});
//end content report Input

//handle input only number
phoneScammerInput.addEventListener("keypress", handleInputOnlyNumber);
bankNumberInput.addEventListener("keypress", handleInputOnlyNumber);
senderPhoneInput.addEventListener("keypress", handleInputOnlyNumber);
function handleInputOnlyNumber(e){
  if (e.charCode < 48 || e.charCode >57){  //Các giá trị mã ASCII của các ký tự số từ 0 đến 9 là từ 48 đến 57
    e.preventDefault();
  }
}
//end handle input only number



//Handle upload imgbb

async function uploadImgBB(file) {
  const formData = new FormData();
  // Thêm file hình ảnh vào FormData để gửi lên server
  formData.append("image", file);

  try {
    // Gửi yêu cầu POST đến API ImgBB với đường dẫn endpoint và apiKey bằng axios
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?&key=${apiKey}`,
      formData
    );

    // Trả về URL của hình ảnh sau khi tải lên thành công
    return response.data.data.url;
  } catch (error) {
    // Bắt lỗi nếu có vấn đề xảy ra trong quá trình tải lên
    console.log(error);
    return null; // Trả về null nếu gặp lỗi
  }
}

//end Handle upload imgbb



//Handle Upload Image
uploadImageInput.addEventListener("change" , handleUploadImage);
  async function handleUploadImage(e) {
     const imageList = [...e.target.files];
      imageList.forEach(async(item) => {
        const urlImg = await uploadImgBB(item);
        
        
        const imgHTML = `<div class="form-image__preview">
      <div class="form-image__remove" data-url="${urlImg}">
         <img src="assets/images/Frame 6138.png" alt="">
      </div>
      <img src="${urlImg}" alt="" class="form-review__img">
   </div> `;
   FormUploadWrap.insertAdjacentHTML("afterbegin" , imgHTML);
          arrayImage.push(urlImg);
      });
   }
   FormUploadWrap.addEventListener("click", (e) => {
    if (e.target.matches(".form-image__remove")) {
      const formImagePreview = e.target.parentNode;
      formImagePreview.remove();
      arrayImage = arrayImage.filter((item) => item !== e.target.dataset.url);
    }
   });

//end handle image upload

//Validate submit form
Validator({
    form: "#form-report",  //dùng class vẫn được nhưng id chỉ có 1 nên chắc hơn
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
        Validator.isRequired("#nameScammer", "Vui lòng nhập tên chủ tài khoản"),
        Validator.minLength("#nameScammer",6, "Nhập tối thiểu 6 kí tự"),
        Validator.isRequired("#phoneScammer", "Vui lòng nhập số điện thoại"),
        Validator.isPhoneNumber("#phoneScammer", "Vui lòng nhập số điện thoại hợp lệ"),
        Validator.isRequired("#accountScammer", "Vui lòng nhập số tài khoản"),
        Validator.isNumber("#accountScammer", "Vui lòng nhập số"),
        Validator.minLength("#accountScammer",8,"Nhập tối thiểu 8 số"),
        Validator.isRequired("#bankScammer", "Nhập vào tên ngân hàng"),
        Validator.minLength("#bankScammer",3, "Nhập tối thiểu 3 kí tự"),
        Validator.isRequired("#contentReport", "Vui lòng nhập nội dung"),
        Validator.minLength("#contentReport",20, "Nhập tối thiểu 20 kí tự"),
        Validator.isImageUploaded("#uploadImage"),
        Validator.isRequired("#nameSender", "Vui lòng nhập tên của bạn"),
        Validator.minLength("#nameSender",6, "Nhập tối thiểu 6 kí tự"),
        Validator.isRequired("#phoneSender", "Vui lòng nhập số điện thoại"),
        
    ],  
    onSubmit: async function ({uploadImage, ...rest })  {
      try {
       await axios.post(endpoint, {
        uploadImage: arrayImage, 
        date : new Date(),
        ...rest,
      });
      const formImagePreview = document.querySelectorAll(".form-image__preview");
      formImagePreview.forEach((item) => item.remove());
       await FuiToast.success('Gửi đơn thành công');
    }catch (error) {
        console.log(error);
        
      }
      
      
     
      console.log({uploadImage: arrayImage, ...rest});  // Dữ liệu form sau khi xác thực thành công
    },
    resetOnSubmit: true,
  });
  
  
  //end validate submit form