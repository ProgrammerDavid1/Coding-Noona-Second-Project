//유저가 값을 입력한다
// +버튼을 클릭하면, 할일들이 추가된다
// delete 버튼을 클릭하면, 할일이 삭제된다
// check 버튼을 클릭하면, 할일이 끝나면서 밑줄이 간다
// All not Done Done 탭을 누르면, 언더바가 해당 tab으로 이동한다
// Done tab은 끝난 할일들만, not Done tab은 진행중인 할일들만(아이템)
// 전체 tab을 누르면 다시 전체 할일들(아이템)로 돌아옴


let taskInput=document.getElementById("task-input"); //할일들 입력
let addButton=document.getElementById("add-button"); //+버튼 가져오기
let taskList=[]; //할일들을 이 배열에다가 추가하기 위해서!
addButton.addEventListener("click",addTask); //+버튼 클릭하면, addTask함수가 실행

function addTask(){  //할일들이 추가된다
    let inputValue=taskInput.value; //taskInput의 value들을 배열에 추가하는거니까 새로 변수 선언
    taskList.push(inputValue); //배열에 추가
    console.log(taskList); // 좋아 이제 남은거는 배열에 추가된 할일들을 화면에 그리기만 하면 끝나!
    drawTaskList(); 
} 

//그리기 위해서 할일들을 화면에 그려주는 새 함수를 만들어줄게
function drawTaskList(){
    let showResultInHtml = ''; //먼저 공백으로 초기화시켜주고

    for(let i=0;i<taskList.length;i++){ //taskList 배열 안의 아이템(할일)들을 하나하나 꺼내서
        showResultInHtml = showResultInHtml+ `<div class="task">
                    <div>
                        ${taskList[i]}
                    </div>
                    <!-- 버튼을 만들기 위해서 버튼도 div로 묶어줄게요 -->
                    <div>
                        <button>Check</button>
                        <button>Delete</button>
                    </div>
                </div>`;
    }
    document.getElementById("task-board").innerHTML = showResultInHtml; //innerHtml과 textContent의 차이점 유의!!, 그 라인에 전체 칸을 다 차지해야 하니까 innerHtml사용
}   

//여기까지 아이템(할일들) 추가는 끝이 났는데 아이템 추가 메커니즘은 먼저 할일들을 input에 사용자가 입력후에 +버튼을 누르면 +버튼에 click 이벤트가 발생하면서 addTask 메소드가 실행
// addTask()메소드에서는 input의 value들을 taskList라는 배열에다가 추가해줘. 그럼 이제 배열에 있는 입력 값들을 화면에 그려주면 되겠지
// drawTaskList()메소드를 만들어서 반복문으로 새로운 showResultInHtml변수를 만들어서 여기다가 +버튼 누를때마다 taskList 배열의 인덱스 i번째를 돌아서 버튼들(check와 delete)과
// 할일들을 추가해주는거야. 그리고 이 변수를 task-board라는 index.html에서 부모 div에다가 textContent가 아니라 innerHtml로 추가해주면 끝!

//즉 간단하게 정리해주면, 할일 입력 -> 버튼 클릭 -> taskList 배열에 할일 삽입 -> 배열을 순회하면서 showResultInHtml에 할일과 버튼들도 대입 -> task-board에 innerHtml로 
//showResultInHtml를 화면에 추가추가.