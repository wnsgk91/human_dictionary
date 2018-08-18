
$(".star_regular").add("#star").click(function (event) {
  if( $(event.target).closest("li")[0] !== undefined) {
    const this_name = $(event.target).closest("li")[0].textContent.trim();
    console.log($(event.target).closest("li")[0].textContent.trim());
    var myFavoriteList = get_item();
    if(myFavoriteList === null) myFavoriteList = [];
    var index = myFavoriteList.indexOf(this_name);
    if (index === -1) {
      myFavoriteList.push(this_name);
      $(this).removeClass('star_regular');
      $(this).addClass('star_solid');
    }else {
      myFavoriteList.splice(index, 1);
      $(this).removeClass('star_solid');
      $(this).addClass('star_regular');
    }
    console.log(myFavoriteList);
    set_item(myFavoriteList);
  }
});
$(".star_solid").click(function (event) {
    const this_name = $(event.target).parents("li")[0].innerText;
    var myFavoriteList = get_item();
    if(myFavoriteList === null) myFavoriteList = [];
    var index = myFavoriteList.indexOf(this_name);
    if (index > -1) {
      myFavoriteList.splice(index, 1);
      $(this).removeClass('star_solid');
      $(this).addClass('star_regular');
    }
    console.log(myFavoriteList);
    set_item(myFavoriteList);
});

function loadFavorites() {
  let loadList = get_item();
  let showFav = document.getElementById("favorite_list");//즐겨찾기 목록 로딩되는 부분
  if( (loadList != null) && (showFav !== null)){
    let output = '';
    for (let i = 0; i < loadList.length; i++){
      if(loadList[i] !== null){
        output += '<li class="list-group-item"><a id = "title" href = "/document/' + loadList[i] + '">'+ loadList[i] + '</a><div class="star_solid"></div></li>';
      }
    }
    showFav.innerHTML = output;
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