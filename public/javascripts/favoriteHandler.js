/* TODO
* 1. home-즐겨찾기 버튼/ nav bar 클릭시 페이지 이동, 페이지 뜨면서 목록 로딩 OK
* 2. document 에서 추가/제거 버튼 클릭시 작동
* 3. favorite 에서 1개씩 제거
* 4. favorite 에서 전체 제거 OK*/

var myFavoriteList = JSON.parse(localStorage.getItem("myFavList")); //로컬 스토리지에 있던 myFavList 를 얻어온다.

//웹브라우저의 모든 구성요소 로드 끝났을 때 호출되는 함수.
/*window.onload=function () {
    var go_to_fav_btn = document.getElementById("go_to_fav_btn");
    var go_to_fav_nav = document.getElementById("go_to_fav_nav");
    go_to_fav_btn.addEventListener("click", loadList);
    go_to_fav_nav.addEventListener("click", loadList);
}*/
//즐겨찾기 페이지 이동
function moveToFavList() {
    location.href = '/favorite';
}

//즐겨찾기 목록 로딩해오기
function loadList() {
    console.log(myFavoriteList);//확인
    var origin_list = document.getElementsByClassName('list-group');
    if(myFavoriteList == null){
        alert("즐겨찾기가 없습니다");
        return true;
    }
    if(myFavoriteList != null) {
        for (var i = 0; i = myFavoriteList.length; i++) {
            var output = '<a class="list-group-item list-group-item-action" id="<%= myFavoriteList[i] %>" href="#"><%= myFavoriteList[i] %><button type="button" class="btn btn-outline-info" id="rmv_fav">삭제</button></a>';
            origin_list.innerHTML += output;
        }
    }
}

//favorite 페이지 목록에서 한 개 삭제
$(function () {
    $("#rmv_fav").on("click", function () {
        confirm("즐겨찾기에서 삭제하시겠습니까?");
        var FavToRemove = $(this).closest("a")//가장 가까운 a 태그에서
        rmvFromList(FavToRemove.attr("id"));//id 얻어온다.
        loadList();
    });
});

//myFavoriteList 에서 요소 제거하기
function rmvFromList(FavToRemove){
    if (myFavoriteList == null) {
        console.log("원래 즐겨찾기 없음");
    }else {
        for (var j = 0; j < myFavoriteList.length; j++) {
            if (FavToRemove === myFavoriteList[j]) {
                delete myFavoriteList[j];
                localStorage.setItem("myFavList", JSON.stringify(myFavoriteList));
                alert("즐겨찾기에서 제거되었습니다");
            } else {
                alert("즐겨찾기 목록에 없습니다");
            }
        }
    }
}

//favorite 페이지 목록 모두 지우기.
$(function () {
    $("#clear_fav").on("click", function () {
        var list = document.getElementsByClassName('list-group');
        $(list).remove();
        localStorage.clear();
    });
});

//document 페이지 즐겨찾기 추가
$(function () {
    $("#add").on("click", function () {
        try{
            //버튼 바꿔주기
            $(this).html('즐겨찾기 삭제');
            $(this).attr('id', 'rmv');
            //$(this).attr('disabled', true);
            var FavToAdd = $(this).closest("p").attr("id"); //가장 가까운 p 태그의 id를 얻는다. 병 이름!
            addToList(FavToAdd);
           // $("#rmv").attr('disabled', false); //즐겨찾기에서 삭제 버튼 활성화시켜준다.
        }
        catch (e) {
            console.log("Error: saving to local storage");
        }
    });
});

function addToList(FavToAdd){
    if (myFavoriteList != null) {
        for (var j = 0; j < myFavoriteList.length; j++) {
            if (FavToRemove === myFavoriteList[j]) {
                alert("이미 즐겨찾기에 있습니다");
            }
        }
    }else {
        myFavoriteList.push(FavToAdd);
        alert("즐겨찾기에 추가되었습니다");
    }
    localStorage.setItem("myFavList", JSON.stringify(myFavoriteList)); //갱신된 리스트를 로컬 스토리지에 저장한다.
}

//list 상에 별 나타내기
// get favorites from local storage or empty array
/*var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// add class 'fav' to each favorite
favorites.forEach(function(favorite) {
    document.getElementById(favorite).className = 'fav';
});
// register click event listener
document.querySelector('.list').addEventListener('click', function(e) {
    var id = e.target.id,
        item = e.target,
        index = favorites.indexOf(id);
    // return if target doesn't have an id (shouldn't happen)
    if (!id) return;
    // item is not favorite
    if (index === -1) {
        favorites.push(id);
        item.className = 'fav';
        // item is already favorite
    } else {
        favorites.splice(index, 1);
        item.className = '';
    }
    // store array in local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
});*/

//Document 페이지 즐겨찾기 삭제 버튼
$(function () {
    $("#rmv").on("click", function loadList() {
        //버튼 바꿔주기
        $(this).html('즐겨찾기 추가');
        $(this).attr('id', 'add');
        //$(this).attr('disabled', true);//누른 버튼 비활성화
        var FavToRemove = $(this).closest("p").attr("id");//가장 가까운 p 태그에서 id 얻어온다.
        rmvFromList(FavToRemove);
        //$("#add").attr('disabled', false);//즐겨찾기 추가 버튼 활성화
    });
});


//index 페이지 (상단 메뉴바) & home 페이지 즐겨찾기 버튼 클릭시 데이터 로드
//41:55
/*$(function () {
    $("#fav_btn").on("click", function () {
        console.log("Restoring array data from LocalStorage");

        var myFavoriteList = JSON.parse(localStorage.getItem("myFavList"));

        var output = "<ul>";
        if(myFavoriteList != null){
            for (var i = 0; i < data.properties.length; i++){
                for (j = 0; j < myFavoriteList.length; j++){
                    if(data.properties[i].id === myFavoriteList[j]){
                        output+="<h5><li>" + data.properties[i].symptoms + " " + data.properties[i].type + "</li></h5><li><button><a href=' " + data.properties.url +" '>Visit page</a></button></li>";
                    }
                }
            }
        }
        output+="</ul>";
        document.getElementById("here_goes_fav_list").innerHTML = output;//46:55
    });
});*/
