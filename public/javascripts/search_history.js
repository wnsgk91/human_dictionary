// 검색버튼 눌렀을 때 호출되는 함수
function search_history() {
  const search_term = document.querySelector('#home_search').value;//이름 확실하게
  if (search_term !== '') {
    let history_list = JSON.parse(localStorage.getItem('search_history'));

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
      history_banner += '<li class="list-group-item" ><a href="/search/'+ five_items[i] +'">' + five_items[i] + '</a></li>';
    }
  }
  const show = document.getElementById('history_place');
  console.log(show);
  show.innerHTML = history_banner;
}

// 히스토리 지우기
function delete_history(){
  localStorage.removeItem('search_history');
  window.location.reload(true);
}

//이벤트 처리
$(function () {
  $("#go_to_home_nav").on("click", show_history());
});

const search_button = document.forms['search_form_home'].querySelector('button');

search_button.addEventListener('click', function (e) {
location.href = '/search';
});