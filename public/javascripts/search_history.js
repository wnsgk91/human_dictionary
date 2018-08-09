  // TODO 전역변수 함수 안으로 어떻게 넣을까 + 홈에서 search 버튼 눌렀을때: search 페이지로 이동+검색 결과 보여주기
  var history_list = [];

  // 검색버튼 눌렀을 때 호출되는 함수
  function search_history(){

    var value = document.getElementById('search').value;
    var show = document.getElementById('five_list');

    history_list[history_list.length] = value;
    localStorage.setItem('search_history',JSON.stringify(history_list));
    show.innerHTML = history_list.slice(-5);

  } 