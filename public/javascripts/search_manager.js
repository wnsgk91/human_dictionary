//search page
// form id : search_form
// input id : search_search

//home page
// form id : search_form_home
// input id : home_search
// 검색하기 버튼 id : history_log

//search page
// 사전목록 id : dictionary

// home 페이지에서 검색할 때.
function search_wizard_home() {
    var input; //, filter, dict_list, li_tag, a_tag, i;
    input = JSON.parse(localStorage.getItem('search_history')); // input tag id
    //filter = input[-1].value.toUpperCase(); // 대문자로 바뀐 input 값(검색어) 가져오기
    document.getElementById('search_search').value = input[-1];
    search_btn_search.value = input[-1];
    search_btn_search.addEventListener('click', search_wizard);
/*    dict_list = document.getElementById('dictionary'); // 사전목록 가져오기
    li_tag = dict_list.getElementsByTagName('li'); // 목록 중 li tag 가져오기
    for (i = 0; i < li_tag.length; i++) {
        a_tag = li_tag[i].getElementsByTagName("a")[0]; // li tag 안의 a 태그
        if (a_tag.innerHTML.toUpperCase().indexOf(filter) > -1) { //a 태그 안의 내용 비교.
            // 각 목록들이 검색어를 포함하는가? 포함 하면 인덱스 위치 반환, 포함 안하면 -1 반환
            li_tag[i].style.display = "";// 보여주기
        } else {
            li_tag[i].style.display = "none";// 숨기기
        }
    }*/
}

// search 페이지에서 검색할 때
function search_wizard() {
    var input, filter, dict_list, li_tag, a_tag, i;
    input = document.getElementById('search_search'); // input tag id
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

const search_btn_home = document.querySelector('#history_log');
search_btn_home.addEventListener('click', search_wizard_home);


