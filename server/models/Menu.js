const mongoose = require("mongoose");

/* 
    <Menu DB>
    구성: menu_id | menu_category | menu_name | menu_price
    
    레스토랑DB와 연결방법: menu_id와 menu를 연동
    '고려대학교_애기능' -> ['중식': {...}, '양식':{...}]
    '스타벅스' -> ['커피': {...}, '프라푸치노':{...}]
*/

const menuSchema = mongoose.Schema({
  menuId: [{
    name: {type: String, unique: true}, // 고려대학교_애기능
    menuCategory: 
      [{
          name: {type: String, unique: true}, //중식
          menuNamePrice: 
            [{ 
            menuName: {type: String, unique: true}, // 짜장면
            menuPrice: Number // 5000
            }]
      }]
  }]
})

// Schema를 model로 감싸야 한다.
const Menu = mongoose.model("Menu", menuSchema);

module.exports = { Menu };