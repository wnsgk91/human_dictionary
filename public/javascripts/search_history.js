  // TODO 전역변수 함수 안으로 어떻게 넣을까 + 홈에서 search 버튼 눌렀을때: search 페이지로 이동+검색 결과 보여주기
  var history_list = [];

  /*window.onload = function () {
      show_history();
  }*/

  // 검색버튼 눌렀을 때 호출되는 함수
  function search_history(){
   // var history_list = [];
    var value = document.getElementById('search').value;
    //var show = document.getElementById('five_list');
    if(value !== '') {
        history_list[history_list.length] = value;
        localStorage.setItem('search_history', JSON.stringify(history_list));
        console.log("히스토리 생성");
        show_history();
    }
  }

  function show_history() {
      var five_items = history_list.slice(-5);
      console.log(five_items);
      var history_banner = '';
        for (var i = 0; i< five_items.length; i++) {
          if(five_items[i] !== ''){
            history_banner += '<div class="card mb-4 box-shadow"><div class="card-body"><h5 class="card-title">' + five_items[i] + '</h5></div></div>';
          }
        }
      var show = document.getElementById('history_place');
      show.innerHTML = history_banner;
  }


