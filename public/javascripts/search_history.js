// 검색버튼 눌렀을 때 호출되는 함수
function search_history() {
    const search_term = document.querySelector('#home_search').value;//이름 확실하게
    if (search_term !== '') {
        var history_list = JSON.parse(localStorage.getItem('search_history'));
        if(history_list !== null){
            history_list[history_list.length] = search_term;
        }else {
            history_list = [search_term];
        }
        localStorage.setItem('search_history', JSON.stringify(history_list));
        console.log("히스토리 생성");
        history_process(history_list);
    }
}


// nav-bar 홈 버튼 눌렀을 때 호출되는 함수
function show_history() {
  if(localStorage.getItem('search_history') !== null) {
      const history_list = JSON.parse(localStorage.getItem('search_history'));
      history_process(history_list);
  }else{
    console.log('search_history 존재하지 않음');
  }
}


// 중복되는 for 문
function history_process(history_list){
    const five_items = history_list.slice(-5);
    console.log(five_items);
    let history_banner = '';
    for (let i = 0; i< five_items.length; i++) {
      if(five_items[i] !== ''){
          history_banner += '<div class="card mb-4 box-shadow"><div class="card-body"><h5 class="card-title">' + five_items[i] + '</h5></div></div>';
      }
  }
    const show = document.getElementById('history_place');
    console.log(show);
  show.innerHTML = history_banner;

}


// 히스토리 지우기
function delete_history(){
  localStorage.removeItem('search_history');
  show_history();
}



/*function search_history(){
    if(document.querySelector('#home_search').value !== '') {
        const search_term = document.querySelector('#home_search').value;//이름 확실하게
        if(localStorage.getItem('search_history') !== null){
            var history_list = JSON.parse(localStorage.getItem('search_history'));
            history_list[history_list.length] = search_term;
            localStorage.setItem('search_history', JSON.stringify(history_list));
            console.log("히스토리 생성");
        }else{
            localStorage.setItem('search_history', JSON.stringify(search_term));
            console.log("히스토리 생성");
        }
        history_process(history_list);
    }else{
        console.log("검색어 없음");
    }
}*/





//이벤트 처리
$(function () {
    $("#go_to_home_nav").on("click", show_history());
});

/*$(function () {
    $("#history_log").on("click", search_history());
});*/

const search_button = document.forms['search_form_home'].querySelector('button');
search_button.addEventListener('click', function (e) {
    location.href = '/search';
})

/*
$("#history_log").on({
    keyup: search_wizard_home(),
    click: search_history()
});*/
