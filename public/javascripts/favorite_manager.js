// document 페이지에서 즐겨찾기 추가 버튼 눌렀을 때
$(function () {
  $("#add").on("click", function () {
    let myFavoriteList = get_item();
    const favToAdd = $("#title")[0].textContent;
    if (myFavoriteList === null) {
      myFavoriteList = [favToAdd];
      set_item(myFavoriteList);
      alert("즐겨찾기에 추가되었습니다");
    } else {
      for (let i = 0; i < myFavoriteList.length; i++) {
        if (favToAdd === myFavoriteList[i]) {
            var found = true;
            alert("즐겨찾기 목록에 존재합니다");
            break;
        }
      }
      if(!found){
        myFavoriteList.push(favToAdd);
        set_item(myFavoriteList);
        alert("즐겨찾기에 추가되었습니다");
      }
    }
  });
});

function add_favorite(favToAdd) {
  let myFavoriteList = get_item();
  if (myFavoriteList === null) {
    myFavoriteList = [favToAdd];
    set_item(myFavoriteList);
    alert("즐겨찾기에 추가되었습니다");
  } else {
    for (let i = 0; i < myFavoriteList.length; i++) {
      if (favToAdd === myFavoriteList[i]) {
        var found = true;
        alert("즐겨찾기 목록에 존재합니다");
        break;
      }
    }
    if(!found){
      myFavoriteList.push(favToAdd);
      set_item(myFavoriteList);
      alert("즐겨찾기에 추가되었습니다");
    }
  }
}


function loadFavorites() {
  let loadList = get_item();
  let showFav = document.getElementById("favorite_list");//즐겨찾기 목록 로딩되는 부분
  if( (loadList != null) && (showFav !== null)){
    let output = '';
    for (let i = 0; i < loadList.length; i++){
      if(loadList[i] !== null){
        output += '<li class="list-group-item"><a id = "title" href = "/document/' + loadList[i] + '">'+ loadList[i] + '</a>' +
          '<svg id="i-star" class="float-right" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">' +
          '<path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />' +
          '</svg></li>';
      }
    }
    showFav.innerHTML = output;
  }
}


// 즐겨찾기 삭제.
function rmv_favorite(){
  var myFavoriteList = get_item();
  if (myFavoriteList !== null) {
    for (let i = 0; i < myFavoriteList.length; i++) {
      if (document.getElementById('title').textContent === myFavoriteList[i]){
        var index = i;
        var exists = true;
      }
    }
    if(exists){
      myFavoriteList.splice(index,1);
      set_item(myFavoriteList);
      alert("즐겨찾기 목록에서 삭제되었습니다");
      window.location.reload(true);
    }else{
      alert("이미 제거되었습니다.");
    }
  }else{
    alert("즐겨찾기 목록에 없습니다");
  }
}



function get_item(){
  return JSON.parse(localStorage.getItem("myFavList"));
}

function set_item(myFavoriteList){
  localStorage.setItem("myFavList", JSON.stringify(myFavoriteList));
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