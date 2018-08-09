$(function () {
    $("#add").on("click", function () {
        try {
            var myFavoriteList;
            var favToAdd = $('.display-4')[0].innerHTML;
            console.log(favToAdd);
            myFavoriteList= JSON.parse(localStorage.getItem("myFavList"));
            if (myFavoriteList == null) {
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
            console.log("실패");
        }
    });
});

$(function () {
    $("#rmv").on("click", function () {

        var favToRmv = $('.display-4')[0].innerHTML;
        console.log(favToRmv);
        myFavoriteList = JSON.parse(localStorage.getItem("myFavList"));
        if (myFavoriteList != null) {
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

function loadFavorites() {
    console.log("즐겨찾기 목록 불러오는 중");

    myFavoriteList = JSON.parse(localStorage.getItem("myFavList"));

    if( myFavoriteList != null){
        var output = '';
        for (var i = 0; i < myFavoriteList.length; i++){
            if(myFavoriteList[i] != null){
                output += '<a href = "'+ myFavoriteList[i] + '" class="list-group-item list-group-item-action">'+ myFavoriteList[i] + '</a>';
            }
        }
        var placeList = $("#favorite_list")[0];
        placeList.innerHTML += output;
    }
}

$(function () {
    $("#go_to_fav_btn").on("click", loadFavorites());
});

$(function () {
    $("#go_to_fav_nav").on("click", loadFavorites());
});