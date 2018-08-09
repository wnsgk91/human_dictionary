//search page
// form id : search_form
// input id : search_search

//home page
// form id : search_form_home
// input id : home_search
// 검색하기 버튼 id : history_log

//search page
// 사전목록 id : dictionary

const dictionary = document.querySelector('#dictionary');
const dict_list = dictionary.getElementsByTagName('li');

const search_wizard = document.forms['search_form'].querySelector('input');
search_wizard.addEventListener('keyup', function (e) {
    const searchTerm = e.target.value.toLowerCase();//대문자 검색 가능
    Array.from(dict_list).forEach(function (document) {
        const disease_name = document.firstElementChild.textContent;
        if(disease_name.toLowerCase().indexOf(searchTerm) !== -1){
            dict_list.style.display = 'block';
        }else {
            dict_list.style.display = 'none';
        }
    })
})
