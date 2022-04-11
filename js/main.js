/*conatiner*/
const main = document.querySelector("#main");
/*popup*/
const popup = document.querySelector(".popup");
/*closeBtn*/
const closeBtn = document.querySelector("#closebtn");
/*팝업 닫기 함수*/
const closePopup = () => {
  /*hide 클래스 추가로 숨김*/
  popup.classList.add("hide");
  location.reload();

};
/*popup 열기*/
const openPopup = async (userid, itemid, eventtype) => {
  
  const result = await fetch('/user-inter', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({ userid, itemid, eventtype }), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await result.json();
  if (data.status === "success") {
    popup.classList.remove("hide");
    const popBody = document.querySelector(".popup-body");
    popBody.innerHTML = `<p>${userid}</p><p>${itemid}</p><p>${eventtype}</p>`;
  }
	else{
		alert('server error');
	}
  
};

/*팝업 닫기 버튼 클릭 시 클로즈 함수 호출*/
closeBtn.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closePopup();
    console.log("close")
    location.reload();
  }

});
/*HTML 동적으로 만들기*/
const makeHtml = (item) => {
  return `<div class="col">
          <div class="card shadow-sm">
            <img src="${item.image}" class="img-fluid" alt="...">
            <div class="card-body">
              <p class="card-text">${item.data1}
                <p>${item.data2}</p>
                <p>${item.data3}</p>		
                <p>${item.data4}</p>
                <p>${item.data5}</p>
                    <button id="view<%=i+1%>" class="btn-x" data-userid = "100" data-itemid = "${item.id}" data-eventtype = "watch" >장바구니</button>
                <small class="text-muted">!Event!</small>
              </div>
            </div>
          </div>`
};
/*시작 외부 api 데이터 가져오기 async는 비동기 함수로 큰 데이터를 가져올때 비동기 처리를 위해 사용*/
const init = async () => {
  let htmlArr = [];
  try {
    const result = await fetch('/'); // or 'PUT'
    const data = await result.json();
    htmlArr = data.map((item) => {
      return makeHtml(item);
    });
    await setEvent();
    main.innerHTML = htmlArr.join("");
  } catch (error) {
    main.innerHTML = `<div>Server error</div>`;
    console.log(error);
  }
};
const setEvent = async () => {
    //ryz
  for (var i =1; i<10; i++){

    const view = document.querySelector("#view" + i);
    view.addEventListener('click', (event) => {

      const userid = event?.target?.dataset?.userid;
      const itemid = event?.target?.dataset?.itemid;
      const eventtype = event?.target?.dataset?.eventtype;
    
    openPopup(userid, itemid, eventtype);
    });
  }
}
//

window.onpageshow = function (event) {
  //console.log(window.performance);
  /*
   * window.performance
   * The Window interface's performance property returns a Performance object, which can be used to gather performance information about the current document.
   */
  if (
    event.persisted ||
    (window.performance && window.performance.navigation.type == 2)
  ) {
    /*The persisted read-only property indicates if a webpage is loading from a cache.*/
    //console.log(event.persisted);
    alert("뒤로가기 클릭");
    //location.reload();
  } else {
    //alert("새로 열린 페이지");
    init();
  }
};