const mongoose = require("mongoose");

/*
    <Restaurant DB>
    구성: category | restaurant | branch | address | longlat | explanation | menu_id

    menu id 작명법
    menu_id(학식과 같이, 지점마다 메뉴가 다른 경우) -> '{name}_{branch}'
    menu_id -> '고려대학교_애기능'
    menu_id(프렌차이즈, 지점상관없이 메뉴가 같을때) -> '{name}'
    menu_id -> '스타벅스'
*/
const restaurantSchema = mongoose.Schema({
  category: [{
      name:  {type: String, unique: true}, // 학생식당, 프렌차이즈 등
      restaurant: [{
        name: {type: String, unique: true}, // 고려대학교, 서울대학교, 스타벅스 등
        branch: [{
            name: {type: String, unique: true}, // 고려대학교 애기능, 스타벅스 안암DT점 등
            address: {type: String, unique: true}, // 주소
            longLat: {type: String, unique: true}, // 위도경도 "[위도](space)[경도]"
            explanation: String, // 설명
            menuId: String, // 메뉴id '고려대학교_애기능', '스타벅스' 등. 맨 위 주석 참고.
        }]
      }]
  }]
});

// Schema를 model로 감싸야 한다.
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = { Restaurant };