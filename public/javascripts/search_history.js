  // TODO 전역변수 함수 안으로 어떻게 넣을까
  var history_list = [];

  // 검색버튼 눌렀을 때 호출되는 함수
  function search_history(){

    var value = document.getElementById('search').value;
    var show = document.getElementById('five_list');

    history_list[history_list.length] = value;
    localStorage.setItem('search_history',JSON.stringify(history_list));
    show.innerHTML = history_list.slice(-5);

  } 