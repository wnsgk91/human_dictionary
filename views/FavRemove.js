/*
function getcha() {
    var target = document.getElementsByTagName('h1');
    return target.innerText;
}

//버튼을 눌러 선택된 것의 이름 겟챠
var target = document.getElementsByTagName('h1');
var disName = target.innerText;

var disName = document.getElementsByTagName('h1').innerText;
disName.addEventListener('click', add());

//이름을 로컬 스토리지에서 검색
function add(){
//이름 이미 있으면? 로컬스토리지에서 삭제하고 fav 페이지에서 삭제.
    if (localStorage.getItem(disName) != null){
        if(confirm("즐겨찾기에서 삭제하시겠습니까?")) {
            localStorage.removeItem(disName);
            //버튼 추가로 바꿔줌.
        }
//이름 없으면? 로컬스토리지에 추가하고 fav 페이지에 추가.
    }else {
        localStorage.setItem( disName , String(Date.now()));
        //버튼 삭제로 바꿔줌.
    }
}
*/
/*저장되는건 key-value
* value 는 JSON 형식으로 가능. 그렇지만 굳이..?
*
* 그렇다면 key 값은 병 이름 value 값은 시간.
*
* 페이지가 로드될 때, 로컬 스토리지에서 페이보릿을 불러와야한다!
* 페이보릿인 것들의 버튼-> 반대로 바꿔줘야함.
*
* 즐겨찾기 버튼이 보여야 하는 것: Document, Favorites
*
* 즐겨찾기 삭제 버튼 : Favorites 에 있는 모든 것.
* 즐겨찾기 추가 버튼 :
*
* 추가버튼 삭제버튼 변경하는것??????찾아보기
*
* 빈 별 눌렀을때 : 스토리지에 저장. Favorites 에 표시.
* 찬 별 눌렀을때 : 스토리지에서 삭제. Favorites 에서 삭제.
* */
