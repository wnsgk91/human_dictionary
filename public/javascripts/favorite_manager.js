// document 페이지에서 즐겨찾기 추가 버튼 눌렀을 때
$(function () {
  $("#add").on("click", function () {
    try {
      let myFavoriteList;
      const favToAdd = $("#title")[0].textContent;
      //console.log(favToAdd);
      myFavoriteList= JSON.parse(localStorage.getItem("myFavList"));

      if (myFavoriteList === null) {
        myFavoriteList = [favToAdd];
        localStorage.setItem("myFavList", JSON.stringify(myFavoriteList));
        alert("즐겨찾기에 추가되었습니다");

      } else {

        myFavoriteList= JSON.parse(localStorage.getItem("myFavList"));
        for (let i = 0; i < myFavoriteList.length; i++) {
          if (favToAdd === myFavoriteList[i]) {
              var found = true;
              alert("즐겨찾기 목록에 존재합니다");
              break;
          }
        }
        if(!found){
          myFavoriteList.push(favToAdd);
          localStorage.setItem("myFavList", JSON.stringify(myFavoriteList));
          alert("즐겨찾기에 추가되었습니다");
        }
      }
    }
    catch (e) {
        console.log(e);
    }
  });
});

// favorite 페이지에 목록 로딩해주기
function loadFavorites() {
  //console.log("즐겨찾기 목록 불러오는 중");
  let loadList;
  loadList = JSON.parse(localStorage.getItem("myFavList"));
  console.log(loadList);

  if( loadList != null){
    let output = '';
    for (let i = 0; i < loadList.length; i++){
      if(loadList[i] !== null){
        output += '<li class="list-group-item"><a href = "/document/' + loadList[i] + '">'+ loadList[i] + '</a><button type="submit" class="btn btn-outline-info float-right" onclick="rmv_favorite();">즐겨찾기 삭제</button></li>';
      }
    }
    $("#favorite_list")[0].innerHTML = output;//jqeury selector 찾아보기, appendChild
  }
}

// 즐겨찾기 삭제.
function rmv_favorite(){
    loadList = JSON.parse(localStorage.getItem("myFavList"));
    myFavoriteList = JSON.parse(localStorage.getItem("myFavList"));

    if (myFavoriteList !== null) {
      for (let i = 0; i < myFavoriteList.length; i++) {
        if (loadList[i] === myFavoriteList[i]) {
          var index = i;
          var exists = true;
        }
      }
      if(exists){
        delete myFavoriteList[index];
        localStorage.setItem("myFavList", JSON.stringify(myFavoriteList));
        alert("즐겨찾기 목록에서 삭제되었습니다");
        window.location.reload(true);

      } else {
        alert("이미 제거되었습니다.");
      }
    } else {
      alert("즐겨찾기 목록에 없습니다");
    }
}

//favorite 페이지 목록 모두 지우기.
$(function () {
  $("#clear_fav").on("click", function () {
    const list = document.getElementsByClassName('list-group');
    $(list).remove();
    localStorage.removeItem('myFavList');
  });
});

// 이벤트 처리
$(function () {
  $("#go_to_fav_btn").on("click", loadFavorites());
});

$(function () {
  $("#go_to_fav_nav").on("click", loadFavorites());
});