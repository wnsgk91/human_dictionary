

//document 페이지 즐겨찾기 추가 버튼
$(function () {
    $("#add").on("click", function () {
        try{
            /*if( $(this).html() === '즐겨찾기 추가'){
                $(this).html('즐겨찾기 삭제');
                $(this).attr('id', 'rmv');
            }*/
           $(this).attr('disabled', true);
            var FavToAdd = $(this).closest("p").attr("id"); //가장 가까운 p 태그의 id를 얻는다. 병 이름!
            var myFavoriteList = JSON.parse(localStorage.getItem("myFavList"));  //로컬 스토리지 myFavList 의 value 를 가져온다.

           /* if(myFavoriteList == null){
                myFavoriteList = [];//가져온 리스트가 비어있을 때
            }*/
            if(myFavoriteList != null){ //가져온 리스트의 내용이 있을 때
                for (var j = 0; j < myFavoriteList.length; j++){
                    if(FavToAdd === myFavoriteList[j]) {
                        myFavoriteList = [];
                        break;
                    }
                }
            }else{
                myFavoriteList = [];
            }
            myFavoriteList.push(FavToAdd); //가져온 리스트에 새로운 것 추가한다.
            localStorage.setItem("myFavList", JSON.stringify(myFavoriteList)); //갱신된 리스트를 로컬 스토리지에 저장한다.
            alert("즐겨찾기에 추가되었습니다.");
           // $("#rmv").attr('disabled', false); //즐겨찾기에서 삭제 버튼 활성화시켜준다.
        }
        catch (e) {
            console.log("Error: saving to local storage");
        }
    });
});

//list 상에 별 나타내기!!
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
        /*if( $(this).html() === '즐겨찾기 삭제'){
            $(this).html('즐겨찾기 추가');
            $(this).attr('id', 'add');
        }*/
        $(this).attr('disabled', true);//누른 버튼 비활성화
        var FavToRemove = $(this).closest("p").attr("id");//가장 가까운 p 태그에서 id 얻어온다.
        var myFavoriteList = JSON.parse(localStorage.getItem("myFavList")); //로컬 스토리지에 있던 myFavList 를 얻어온다.

        if (myFavoriteList != null) {
            for (var j = 0; j < myFavoriteList.length; j++) {
                if (FavToRemove === myFavoriteList[j]) {
                    delete myFavoriteList[j];
                    localStorage.setItem("myFavList", JSON.stringify(myFavoriteList));
                    alert("즐겨찾기에서 제거되었습니다");
                    myFavoriteList[j] = [];
                }
            }
        }
        if(myFavoriteList == null){
            alert("즐겨찾기 목록에 없습니다");
        }
        //$("#add").attr('disabled', false);//즐겨찾기 추가 버튼 활성화
    });
});

//favorite 페이지 즐겨찾기 삭제 버튼
$(function () {
    $("#rmv_fav").on("click", function () {
        /*if( $(this).html() === '즐겨찾기 삭제'){
            $(this).html('즐겨찾기 추가');
            $(this).attr('id', 'add');
        }*/
        $(this).attr('disabled', true);//누른 버튼 비활성화
        var FavToRemove = $(this).closest("a").attr("id");//가장 가까운 a 태그에서 id 얻어온다.
        var myFavoriteList = JSON.parse(localStorage.getItem("myFavList")); //로컬 스토리지에 있던 myFavList 를 얻어온다.

        if (myFavoriteList != null) {
            for (var j = 0; j < myFavoriteList.length; j++) {
                if (FavToRemove === myFavoriteList[j]) {
                    delete myFavoriteList[j];
                    localStorage.setItem("myFavList", JSON.stringify(myFavoriteList));
                    alert("즐겨찾기에서 제거되었습니다");
                    _removeElement($(this).closest("li"));
                    myFavoriteList[j] = [];
                }
            }
        }
        if(myFavoriteList == null){
            alert("즐겨찾기 목록에 없습니다");
        }
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

//favorite 페이지 즐겨찾기 로딩하기
var myFavoriteList = JSON.parse(localStorage.getItem("myFavList"));
window.onload=function () {//웹브라우저의 모든 구성요소 로드 끝났을 때 호출되는 함수.
    var go_to_fav = document.getElementById("go_to_fav");
    go_to_fav.addEventListener("click", loadList);
}


function loadList() {
    location.href = 'Favorites.html';
    console.log("즐겨찾기 실행 시작");
    console.log(myFavoriteList);
    if(myFavoriteList == null){
        var origin_list = document.getElementById('here_goes_fav_list');
        origin_list.innerHTML += '<li class="list-group-item">즐겨찾기가 없습니다.</li>';
    }

    if(myFavoriteList != null) {
        for (var i = 0; i = favList.length; i++) {
            var output = '<li class="list-group-item">';
            output += '<a href="#" id="' + favList[i] + '">' + favList[i] + '</a>'
                + '<button type="button" class="btn btn-outline-info" id="rmv_fav">즐겨찾기 삭제</button></li>';
        }
        origin_list.innerHTML += output;
    }
}

/*
$(function () {
    $("#fav_btn").on("click", function () {
        console.log("즐겨찾기 실행 시작");
        console.log(myFavoriteList);
        if(myFavoriteList == null){
            var origin_list = document.getElementById('here_goes_fav_list');
            origin_list.innerHTML += '<li class="list-group-item">즐겨찾기가 없습니다.</li>';
        }

        if(myFavoriteList != null) {
            for (var i = 0; i = favList.length; i++) {
                var output = '<li class="list-group-item">';
                /!*output+="<h5><li>" + data.properties[i].symptoms + " " + data.properties[i].type
                    + "</li></h5><li><button><a href=' " + data.properties.url +" '>Visit page</a></button></li>";*!/
                output += '<a href="#" id="' + favList[i] + '">' + favList[i] + '</a>'
                    + '<button type="button" class="btn btn-outline-info" id="rmv_fav">즐겨찾기 삭제</button></li>';
            }
            //$("#here_goes_fav_list").append(output);
            origin_list.innerHTML += output;
        }
    })
})*/




//즐겨찾기 목록 모두 지우기.
$(function () {
    $("#clearAll").on("click", function () {

        $("#here_goes_fav_list").remove();
        //var myFavoriteList = JSON.parse(localStorage.getItem("myFavList"));
        localStorage.clear();
    });
});