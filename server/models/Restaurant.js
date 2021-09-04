const mongoose = require('mongoose');

/*
    <Restaurant DB>
    구성: category | restaurant | branch | address | longlat | explanation | menu_id

    menu id 작명법
    menu_id(학식과 같이, 지점마다 메뉴가 다른 경우) -> '{name}_{branch}'
    menu_id -> '고려대학교_애기능'
    menu_id(프렌차이즈, 지점상관없이 메뉴가 같을때) -> '{name}'
    menu_id -> '스타벅스'
*/

/*
Geolocation
location: {
  type: "Point",
  coordinates: [-73.856077, 40.848447]
}
*/

const restaurantSchema = mongoose.Schema({
  categoryName: { type: String, required: true }, // 학생식당, 프렌차이즈 등
  resName: { type: String, required: true }, // 고려대학교, 서울대학교, 스타벅스 등
  branchName: { type: String, unique: true, required: true }, // 고려대학교 애기능, 스타벅스 안암DT점 등
  address: { type: String, required: true }, // 주소
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  explanation: { type: String, required: false }, // 설명
  menuId: { type: String, required: true }, // 메뉴id '고려대학교_애기능', '스타벅스' 등. 맨 위 주석 참고.
});

restaurantSchema.index({ location: '2dsphere' });

// Schema를 model로 감싸야 한다.
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { Restaurant };
