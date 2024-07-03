//유저가 값을 입력한다
// +버튼을 클릭하면, 할일들이 추가된다

// delete 버튼을 클릭하면, 할일이 삭제된다
//1. delete 버튼을 클릭하는 순간 false -> true
//2. true이면 끝난걸로 간주하고 삭제하기

// check 버튼을 클릭하면, 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는 순간 false -> true
//2. true이면 끝난걸로 간주하고 밑줄을 찍 긋기
//3. false이면 안 끝난걸로 간주하고 그대로 

// All not Done Done 탭을 누르면, 언더바가 해당 tab으로 이동한다
// Done tab은 끝난 할일들만, not Done tab은 진행중인 할일들만(아이템)
// 전체 tab을 누르면 다시 전체 할일들(아이템)로 돌아옴


let taskInput=document.getElementById("task-input"); //할일들 입력
let addButton=document.getElementById("add-button"); //+버튼 가져오기
let taskList=[]; //할일들을 이 배열에다가 추가하기 위해서!
addButton.addEventListener("click",addTask); //+버튼 클릭하면, addTask함수가 실행

//어? 근데 그럼 이제 1. 을 하기 위해 check버튼에 addEVentListener해서 click 이벤트를 줘야 하는데
//html에 없고 자바스크립트에서 반복문 안에 check 버튼이 있네? -> 그럼 버튼에 바로 onclick 이벤트 주기!
//onclick = " (함수) " 이렇게 선언


function addTask(){  //할일들이 추가된다
    let inputValue=taskInput.value; //taskInput의 value들을 배열에 추가하는거니까 새로 변수 선언
    let task = { //아이템들이 할일이 끝났는지, 안 끝났는지 확인하는 추가적인 정보가 필요하지. 추가적인 정보 즉, 데이터
        id: randomIdGenerate(),
        taskValue: inputValue, //할일들의 value
        isComplete: false, //끝났나? 의 초기값! 
    };//추가 정보가 필요 = 객체.  
    taskList.push(task); //inputValue를 배열에 추가가 원래였지만, 이제부터는 task(객체)를 push 해준다
    console.log(taskList); // 좋아 이제 남은거는 배열에 추가된 할일들을 화면에 그리기만 하면 끝나!
    drawTaskList(); 
} 

//그리기 위해서 할일들을 화면에 그려주는 새 함수를 만들어줄게
function drawTaskList(){
    let showResultInHtml = ''; //먼저 공백으로 초기화시켜주고

    for(let i=0;i<taskList.length;i++){ //taskList 배열 안의 아이템(할일)들을 하나하나 꺼내서
        //원래는 inputValue가 string이었으니까 taskList[i]로 해줬으면 됐는데 이제는 객체라서, 뒤에 .taskValue만을 붙여서 할일들의 value만을 출력하는거지!
        // 그럼 이제 value들은 잘 추가가 되는데, 원하는거는 check 버튼을 누르면 isComplete가 true로 바뀌고, true로 바뀐 아이템에는 찍! 줄이 그어지게 !
        if(taskList[i].isComplete==true){
            //isComplete가 true면 taskValue에다가 찌익 그려줄건데, 그러기 위해 div에 class를 주고 css에서 처리
            showResultInHtml = showResultInHtml+ `<div class="finish-task">
            <div class="done-task"> 
                ${taskList[i].taskValue}  
            </div>
            <!-- 버튼을 만들기 위해서 버튼도 div로 묶어줄게요 -->
            <div>
                <button onclick= "changeToTrue('${taskList[i].id}')">
                <img src="되돌리기 아이콘.jpg" alt="check" width="20" height="20">
                </button>
                <button onclick ="deleteTask('${taskList[i].id}')">
                <img src="휴지통 아이콘.jpg" alt="check" width="20" height="20">
                </button>
            </div>
        </div>`;
        }else{
            //random id를 생성했으니까 changeToTrue 함수를 실행할 때 파라미터로 id값을 줄 수 있게 되고 이제 구별할 수 있게 되지!
        showResultInHtml = showResultInHtml+ `<div class="task">
        <div>
            ${taskList[i].taskValue}  
        </div>
        <!-- 버튼을 만들기 위해서 버튼도 div로 묶어줄게요 -->
        <div>
            <button onclick= "changeToTrue('${taskList[i].id}')">
            <img src="체크 아이콘.png" alt="check" width="20" height="20">
            </button>
            <button onclick="deleteTask('${taskList[i].id}')">
            <img src="휴지통 아이콘.jpg" alt="check" width="20" height="20">
            </button>
        </div>
    </div>`;
} //와 여기서 애 먹었다. onclick 이벤트에서 id값을 줄 때는 무조건 문자열로 해야하는데, ``안에 ``을 또 사용할 수가 없어. 그래서 자꾸 오류가 뜨더라고. 
//그래서 해결방법은 안쪽 ``은 백틱으로 하는게 아니라 작은 따움표로 해줬지~! 해결완!
        }
    document.getElementById("task-board").innerHTML = showResultInHtml; //innerHtml과 textContent의 차이점 유의!!, 그 라인에 전체 칸을 다 차지해야 하니까 innerHtml사용
}   

//여기까지 아이템(할일들) 추가는 끝이 났는데 아이템 추가 메커니즘은 먼저 할일들을 input에 사용자가 입력후에 +버튼을 누르면 +버튼에 click 이벤트가 발생하면서 addTask 메소드가 실행
// addTask()메소드에서는 input의 value들을 taskList라는 배열에다가 추가해줘. 그럼 이제 배열에 있는 입력 값들을 화면에 그려주면 되겠지
// drawTaskList()메소드를 만들어서 반복문으로 새로운 showResultInHtml변수를 만들어서 여기다가 +버튼 누를때마다 taskList 배열의 인덱스 i번째를 돌아서 버튼들(check와 delete)과
// 할일들을 추가해주는거야. 그리고 이 변수를 task-board라는 index.html에서 부모 div에다가 textContent가 아니라 innerHtml로 추가해주면 끝!

//즉 간단하게 정리해주면, 할일 입력 -> 버튼 클릭 -> taskList 배열에 할일 삽입 -> 배열을 순회하면서 showResultInHtml에 할일과 버튼들도 대입 -> task-board에 innerHtml로 
//showResultInHtml를 화면에 추가추가.


function changeToTrue(id){
    //console창에 잘 나오는데, 이게 check가 어떤 아이템이 check됐는지는 모르네? 
    // 어떤 아이템이 정확하게 check 됐는지 알려면 인간에게도 주민등록번호가 있듯이, 정보에도
    //id가 필요. 그래야 정보 하나하나를 분리해서 볼 수 있고, 분리해서 봐야 내가 어떤 아이템을 선택했을때
    // 이 친구다 라는 거를 정확하게 알려줄 수 있겠지. 이 세상 모든 데이터는, 특히 웹사이트에 쌓이는 데이터는 싹다 id가 들어가 있음. 중요중요!!!
    //그래서 이제는 task로 만든 객체에다가 id를 추가해줄게요.
    //근데 id 추가할 때 새로운 정보마다 id가 랜덤하게 다 새롭게 나와야 하는데 어떻게 하지? 이미 누가 그 메소드를 만들어 놨지. 구글링해서 가져오자
    console.log("id:",id);
    //아이디를 받아왔으니 id값을 베이스로 아이템 찾아서 그 아이템을 check 눌렀을 때 true로 바꿔주기
    for(let i=0;i<taskList.length;i++){ //이 for문은 잘 이해 되지!
        if(taskList[i].id==id){
            taskList[i].isComplete= !taskList[i].isComplete; //원래는 true였는데 !이렇게 바꿈으로써 서로 반댓값을 갖게 하고, 그러면 이제 찌익 그은 선을 내가 다시 지울수도 있겠지 되게 중요!!!
            break;
            //약간 스위치처럼 왔다갔다 해야하는 케이스 같은 경우에는 이렇게 ! 쓰면 좋구나!
        }
    }
    console.log(taskList); //휴 check하는 아이템들의 isComplete가 false에서 true로 잘 바뀌었다
    drawTaskList(); //메소드를 불러줘야 실행이 되지!!
}

function deleteTask(id){ //배열 안에 데이터를 삭제해주면 되겠지? 어떻게? splice!!
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1); //i번째 요소를 삭제해주기! 1개만!
            break;
        }
    }
    drawTaskList(); //불러줘야 실행이 되지!!
}

function randomIdGenerate(){
    //return의 용도: 이 함수에서 정의된 무언가를 다른 곳에서 사용하고 싶을때
    return '_' + Math.random().toString(36).substr(2, 9);
}

