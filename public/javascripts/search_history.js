// 검색버튼 눌렀을 때 호출되는 함수
function search_history() {
  const search_term = document.getElementById("home_search").value;
  if (search_term !== '') {
    let history_list = JSON.parse(localStorage.getItem('search_history'));
    if(history_list !== null){
      history_list[history_list.length] = search_term;
    }else {
      history_list = [search_term];
    }
    localStorage.setItem('search_history', JSON.stringify(history_list));
  }
}

// nav-bar 홈 버튼 눌렀을 때 호출되는 함수
function show_history() {
  if(localStorage.getItem('search_history') !== null && document.getElementById('history_place') !== null ) {
    const history_list = JSON.parse(localStorage.getItem('search_history'));
    history_process(history_list);
  }
}

// 중복되는 for 문
function history_process(history_list){
  const five_items = history_list.slice(-5);
  let history_banner = '';
  for (let i = five_items.length-1; i >= 0; i--){
    if(five_items[i] !== ''){
      history_banner += '<li class="list-group-item" ><a href="/search/'+ five_items[i] +'">' + five_items[i] + '</a></li>';
    }
  }
  document.getElementById('history_place').innerHTML = history_banner;
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