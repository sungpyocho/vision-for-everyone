import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const { kakao } = window;

export default function Map({ mapRestaurantClick }) {
  const [restaurantList, setRestaurantList] = useState(null);

  // var restaurantList = null;
  // component가 mount되면 실행
  // useEffect를 써서 렌더링하면 이 컴포넌트에서 이거 해야해!라고 지시
  useEffect(() => {
    if (window.location.pathname === "/tutorial") {
      displayTutorialMap();
    } else {
      handleLocation()
        .then(({ lat, lng }) => {
          displayMap(lat, lng);
        })
        .catch((err) => {
          displayDefaultMap();
        });
    }
  }, []);

  // Returns Promise
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      // 브라우저가 Geolocation API를 지원
      const options = {
        maximumAge: 5 * 60 * 1000, //maximumAge 속성(선택 항목)을 사용하면 최근에 가져온 위치정보 결과를 사용하도록 브라우저에 지시
        timeout: 10 * 1000, //제한 시간을 설정하지 않으면 현재 위치 요청이 데이터를 반환하지 않을 수 있습니다.
      };
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      );
    } else {
      // 브라우저가 Geolocation API 미지원
      alert("이 브라우저에서는 사용자 위치를 알 수 없습니다.");
      return new Promise((resolve) => resolve({}));
    }
  };

  async function handleLocation() {
    let position;
    try {
      position = await getCurrentLocation();
    } catch (error) {
      var msg = null;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          msg =
            "위치정보 허용이 되어있지 않습니다. 설정에서 위치정보 사용을 허용해주세요.";
          break;
        case error.POSITION_UNAVAILABLE:
          msg = "현재 위치를 불러올 수 없습니다. 다시 시도해 주세요.";
          break;
        case error.TIMEOUT:
          msg =
            "위치 정보 응답에 너무 많은 시간이 걸리네요. 다시 시도해 주세요.";
          break;
        case error.UNKNOWN_ERROR:
          msg = "알수 없는 에러가 발생했습니다. 다시 시도해 주세요.";
          break;
      }
      alert(msg);
    }
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  }

  //지도 기초 설정
  const basicMapSettings = (userLat, userLng) => {
    //지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById("map");
    //지도를 생성할 때 필요한 기본 옵션
    let options = {
      center: new kakao.maps.LatLng(userLat, userLng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    //지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    let mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    return map;
  };

  // 2. 마커 관련 설정
  // DB로부터 userLat, userLng과 가까운 10개 선정. API 만들기.
  // {title: "이름", latlng: new kakap maps.LatLng(위도, 경도)} 형식으로 갖고오기.
  const displayMap = (userLat, userLng) => {
    let map = basicMapSettings(userLat, userLng);
    axios
      .post("/api/restaurant/closest-restaurant", {
        long: userLng,
        lat: userLat,
      })
      .then((rs) => {
        rs = rs.data; // res로 온 패킷에 우리가 실어보낸 지도 정보는 rs.data에 있었습니다
        setRestaurantList(rs); // 꼭 "렌더링 전에" 리스트를 업데이트해야 컴포넌트가 데이터값을 활용합니다. 안 그러고 useEffect에서 리스트값 변하는 걸 참조하면 무한렌더링루프 당첨!
        let positions = [];
        rs.forEach((r) => {
          positions.push({
            title: r.branchName,
            latlng: new kakao.maps.LatLng(
              r.location.coordinates[1],
              r.location.coordinates[0]
            ),
          });
        });

        // 자신의 위치 추가.
        positions.push({
          title: "현재 위치",
          latlng: new kakao.maps.LatLng(userLat, userLng),
        });

        positions.forEach((p) => {
          // (내 위치용) 마커 이미지의 이미지 주소
          let imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

          // (내 위치용) 마커 이미지의 이미지크기
          let imageSize = new kakao.maps.Size(24, 35);

          // 마커 이미지를 생성. 나의 위치는 별표, 식당은 일반 마커(null)로 표시.
          let markerImage =
            p.title === "현재 위치"
              ? new kakao.maps.MarkerImage(imageSrc, imageSize)
              : null;

          // 마커를 생성
          let marker = new kakao.maps.Marker({
            map: map,
            position: p.latlng, // 마커를 표시할 위치
            title: p.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage,
          });
          // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
          var iwContent = `<div style="padding:5px;">${p.title}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
          });

          // 마커에 마우스오버 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "mouseover", function () {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, marker);
          });

          // 마커에 마우스아웃 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "mouseout", function () {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayDefaultMap = () => {
    // 유저 위치 정보를 얻을 수 없을때는, 지도의 기준점을 서울시청으로 설정
    let map = basicMapSettings("37.5666805", "126.9784147");

    // 2. 마커 관련 설정
    // DB로부터 userLat, userLng과 가까운 10개 선정. API 만들기.
    // {title: "이름", latlng: new kakap maps.LatLng(위도, 경도)} 형식으로 갖고오기.
    axios
      .post("/api/restaurant/closest-restaurant", {
        long: "126.9784147",
        lat: "37.5666805",
      })
      .then((rs) => {
        let positions = [];
        rs.forEach((r) => {
          positions.push({
            title: r.branchName,
            latlng: new kakao.maps.LatLng(
              r.location.coordinates[1],
              r.location.coordinates[0]
            ),
          });
        });

        positions.forEach((p) => {
          // 마커를 생성
          var marker = new kakao.maps.Marker({
            map: map,
            position: p.latlng, // 마커를 표시할 위치
            title: p.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          });
          // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
          var iwContent = `<div style="padding:5px;">${p.title}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
          });

          // 마커에 마우스오버 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "mouseover", function () {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, marker);
          });

          // 마커에 마우스아웃 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "mouseout", function () {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayTutorialMap = () => {
    // 유저 위치 정보를 얻을 수 없을때는, 지도의 기준점을 서울시청으로 설정
    let map = basicMapSettings("37.5661805", "126.9800147");

    let positions = [
      {
        title: "[튜토리얼] 스타벅스 시청점",
        latlng: new kakao.maps.LatLng("37.5661805", "126.9800147"),
      },
    ];

    setRestaurantList([
      {
        _id: "5f43e85c73b797002057f81d",
        location: {
          type: "Point",
          coordinates: [126.979808, 37.56629],
        },
        categoryName: "프랜차이즈",
        resName: "스타벅스",
        branchName: "[튜토리얼] 스타벅스 시청점",
        address: "서울특별시 중구 을지로 19, 삼성화재삼성빌딩 1층 (을지로1가)",
        explanation: "대한민국의 중심 서울시청! 시청점입니다.",
        menuId: "스타벅스",
        __v: 0,
        distance: 21.93686902491922,
      },
    ]);

    positions.forEach((p) => {
      // 마커를 생성
      var marker = new kakao.maps.Marker({
        map: map,
        position: p.latlng, // 마커를 표시할 위치
        title: p.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
      // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
      var iwContent = `<div style="padding:5px;">${p.title}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        infowindow.close();
      });
    });
  };

  const handleMapRestaurantClick = (index) => {
    // 지금 restaurantList가 state로 관리되고 있다
    // 사용자가 해당 listitem 클릭 했을 때, 그 listitem에 해당하는 index 번호에 따라 restaurantList에도 참조해주려고 한다.
    // restaurantList[index].restaurantTitle을 mapRestaurantClick 함수의 파라미터로 보내려한다.
    mapRestaurantClick(restaurantList[index].branchName);
  };

  return (
    <>
      <div id="map" style={{ width: "99.999%", height: "72vh", position: "relative" }}></div>
      <List component="nav" style={{position: "relative", overflow:"auto"}}>
        {restaurantList &&
          restaurantList.map((element, i) => {
            return (
              <ListItem
                key={i}
                button
                alignItems={"flex-start"}
                onClick={() => handleMapRestaurantClick(i)}
              >
                <ListItemText style={{ textAlign: "left" }}>
                  {i+1}
                </ListItemText>
                <ListItemText style={{ textAlign: "left" }}>
                  {element.branchName}
                </ListItemText>
                <ListItemText style={{ textAlign: "right" }}>
                  {`${parseInt(element.distance)} m`}
                </ListItemText>
              </ListItem>
            );
          })}
      </List>
    </>
  );
}
