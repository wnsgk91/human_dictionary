// search 페이지에서 검색할 때 필터링
function search_wizard() {
  var input, filter, dict_list, li_tag, a_tag, i;
  input = document.getElementById('home_search'); // input tag id
  filter = input.value.toUpperCase(); // 대문자로 바뀐 input 값(검색어) 가져오기

  dict_list = document.getElementById('dictionary'); // 사전목록 가져오기
  li_tag = dict_list.getElementsByTagName('li'); // 목록 중 li tag 가져오기
  for (i = 0; i < li_tag.length; i++) {
    a_tag = li_tag[i].getElementsByTagName("a")[0]; // li tag 안의 a 태그
    if (a_tag.innerHTML.toUpperCase().indexOf(filter) > -1) { //a 태그 안의 내용 비교.
      // 각 목록들이 검색어를 포함하는가? 포함 하면 인덱스 위치 반환, 포함 안하면 -1 반환
      li_tag[i].style.display = "";// 보여주기
    } else {
      li_tag[i].style.display = "none";// 숨기기
    }
  }
}

const search_btn_search = document.forms['search_form'].querySelector('input');
search_btn_search.addEventListener('keyup', search_wizard);
