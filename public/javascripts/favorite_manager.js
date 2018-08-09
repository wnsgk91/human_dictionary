// document 페이지에서 즐겨찾기 추가 버튼 눌렀을 때
$(function () {
    $("#add").on("click", function () {
        try {
            var myFavoriteList;
            var favToAdd = $('.display-4')[0].innerHTML;//id 로 바꾸기
            //console.log(favToAdd);
            myFavoriteList= JSON.parse(localStorage.getItem("myFavList"));
            if (myFavoriteList === null) {
                myFavoriteList = [favToAdd];
                localStorage.setItem("myFavList", JSON.stringify(myFavoriteList));
                alert("즐겨찾기에 추가되었습니다");
            } else {
                myFavoriteList= JSON.parse(localStorage.getItem("myFavList"));
                for (var i = 0; i < myFavoriteList.length; i++) {
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

// document 페이지에서 즐겨찾기 삭제 버튼 눌렀을 때
$(function () {
    $("#rmv").on("click", function () {
        var favToRmv = $('.display-4')[0].innerHTML;//id 로 바꾸기
        console.log(favToRmv);
        myFavoriteList = JSON.parse(localStorage.getItem("myFavList"));
        if (myFavoriteList !== null) {
            for (var i = 0; i < myFavoriteList.length; i++) {
                if (favToRmv === myFavoriteList[i]) {
                    var index = i;
                    var exists = true;
                }
            }
            if(exists){
                delete myFavoriteList[index];
                localStorage.setItem("myFavList", JSON.stringify(myFavoriteList));
                alert("즐겨찾기 목록에서 삭제되었습니다");
            } else {
                alert("이미 제거되었습니다.");
            }
        } else {
            alert("즐겨찾기 목록이 없습니다");
        }
    });
});

// favorite 페이지에 목록 로딩해주기
function loadFavorites() {
    //console.log("즐겨찾기 목록 불러오는 중");
    var loadList;
    loadList = JSON.parse(localStorage.getItem("myFavList"));
    console.log(loadList);

    if( loadList != null){
        var output = '';
        for (var i = 0; i < loadList.length; i++){
            if(loadList[i] !== null){
                output += '<a href = "'+ loadList[i] + '" class="list-group-item list-group-item-action">'+ loadList[i] + '</a>';
            }
        }
        $("#favorite_list")[0].innerHTML = output;//jqeury selector 찾아보기, appendChild
    }
}

// 이벤트 처리
$(function () {
    $("#go_to_fav_btn").on("click", loadFavorites());
});

$(function () {
    $("#go_to_fav_nav").on("click", loadFavorites());
});