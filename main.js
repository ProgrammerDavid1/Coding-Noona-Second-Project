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
let underLine=document.getElementById("under-line"); //밑줄 가져오기
let taskList=[]; //할일들을 이 배열에다가 추가하기 위해서!
addButton.addEventListener("click",function(event){
    if(taskInput.value!=""){ //빈 문자열이 아니여야 클릭했을 때 할일이 추가됨.
        addTask(); 
    }
}); //+버튼 클릭하면, addTask함수가 실행
taskInput.addEventListener("keydown",function(event){ //엔터키를 누르면, addTask()함수가 실행
    if(taskInput.value!= "" && event.key =="Enter"){ //입력창의 내용이 빈 문자열이거나 아무것도 적혀잇지 않으면 addTask() 안함.
        //입력창의 내용이 ""게 아니고 엔터키가 눌려야 addTask()가 된다.
        addTask();
    }
});
let taskTabs = document.querySelectorAll(".task-tabs div"); //querySeletorAll은 괄호 안에 만족하는
//조건을 모두 가져온다. 한마디로 task-tabs의 클래스의 div 태그들을 모두 가져온다 즉,
// All not Done Done을 가져오기 위함.


//아이템이 여러 개인 관계로 for문으로 사용
for(let i=1;i<taskTabs.length;i++){ //1부터 시작하는 이유는 console.log로 taskTabs를 확인해봤을 때 i가 0일때는 <div id=under line></div>을 가리키고 있었는데, 나는 이거는 필요없고
    //All not Done Done만 있으면 되거든.
    taskTabs[i].addEventListener("click",function(event){
        filter(event); //click되면 filter(event)를 실행
        underLineIndicator(event); //underLineIndicator(event)를 실행
    });
}

let mode= "all"
let stillGoingList=[];
let DoneList=[];
let list=[];


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
    taskInput.value=""; //할일을 입력후 클릭이나 엔터키를 누르면 바로 입력창이 비워지게함.
    console.log(taskList); // 좋아 이제 남은거는 배열에 추가된 할일들을 화면에 그리기만 하면 끝나!
    drawTaskList(); 
} 

//그리기 위해서 할일들을 화면에 그려주는 새 함수를 만들어줄게
function drawTaskList(){
    //1. 내가 선택한 탭에 따라서
    list=[];
    if (mode=="all"){
        //all이면 taskList
        list=taskList;
    }
    else if(mode=="stillGoing"){
        //stillGoing과 done이면 stillGoingList
        list=stillGoingList; //처음에 stillGoingList는 filter함수내에서만 사용할 수 잇는 지역변수였는데, 전역변수로 선언함으로써 여기서도 사용 가능하지.
    }
    else if(mode=="done"){
        list=DoneList;  
    }
    //2. 리스트를 달리 보여준다.

    //3. all을 클릭하면 taskList를 보여주고
    //4. not Done이나 Done을 누르면 stillGoingList를 보여줘야겠지.
    // -> 위에서 상황별로 list에다가 taskList인지 stillGoingList인지 나눴으니까 
    //이제 밑에 for문과 모든 코드에서 taskList가 아니라 list로 바꿔주면 되겠지. 

    //예에~~~ ㅎㅎ 이렇게 다 했으니까 not Done은 완료~~ ㅎㅎ 잘했어. 
    //이제 Done도 한번 해봅시다.
    
    //다 완료~~ 


    let showResultInHtml = ""; //먼저 공백으로 초기화시켜주고

    for(let i=0;i<list.length;i++){ //taskList 배열 안의 아이템(할일)들을 하나하나 꺼내서
        //원래는 inputValue가 string이었으니까 taskList[i]로 해줬으면 됐는데 이제는 객체라서, 뒤에 .taskValue만을 붙여서 할일들의 value만을 출력하는거지!
        // 그럼 이제 value들은 잘 추가가 되는데, 원하는거는 check 버튼을 누르면 isComplete가 true로 바뀌고, true로 바뀐 아이템에는 찍! 줄이 그어지게 !
        if(list[i].isComplete==true){
            //isComplete가 true면 taskValue에다가 찌익 그려줄건데, 그러기 위해 div에 class를 주고 css에서 처리
            showResultInHtml = showResultInHtml+
            `<div class="finish-task">
                <div class="done-task"> 
                ${list[i].taskValue}  
                </div>
            <!-- 버튼을 만들기 위해서 버튼도 div로 묶어줄게요 -->
            <div>
                <button onclick= "changeToTrue('${list[i].id}')">
                <img src="되돌리기 아이콘.jpg" alt="check" width="20" height="20">
                </button>
                <button onclick ="deleteTask('${list[i].id}')">
                <img src="휴지통 아이콘.jpg" alt="check" width="20" height="20">
                </button>
            </div>
        </div>`;
        }
        else{
            //random id를 생성했으니까 changeToTrue 함수를 실행할 때 파라미터로 id값을 줄 수 있게 되고 이제 구별할 수 있게 되지!
        showResultInHtml = showResultInHtml+ `<div class="task">
        <div>
            ${list[i].taskValue}  
        </div>
        <!-- 버튼을 만들기 위해서 버튼도 div로 묶어줄게요 -->
        <div>
            <button onclick= "changeToTrue('${list[i].id}')">
            <img src="체크 아이콘.png" alt="check" width="20" height="20">
            </button>
            <button onclick="deleteTask('${list[i].id}')">
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

   //현재 모드에 따라 리스트 업데이트
    if(mode=="stillGoing"){
        for(let i=0;i<stillGoingList.length;i++){
            if(stillGoingList[i].id==id){
                stillGoingList.splice(i,1);
                break;
            }
        }
    }else if(mode=="done"){
        for(let i=0;i<DoneList.length;i++){
            if(DoneList[i].id==id){
                DoneList.splice(i,1);
                break;
            }
        }
    }

    drawTaskList(); //불러줘야 실행이 되지!!
}

function randomIdGenerate(){
    //return의 용도: 이 함수에서 정의된 무언가를 다른 곳에서 사용하고 싶을때
    return '_' + Math.random().toString(36).substr(2, 9);
}

function filter(event){
    console.log("filter",event.target.id);
    mode = event.target.id; //event.target.id를 계속 쓰기 길고, 번거러워서 mode 변수 하나 만들어줌.
    //바로 위에 console.log("filter") 클릭하니까 filter가 잘 출력이 됐는데, 이제 중요한거는 
    //다 filter로만 뜨니까 이제 얘가 내가 어떤 tabTask을 클릭했는지 알아야할거 아니야. All을 클릭했는지
    //not Done을 클릭했는지 -> 그래서 각각의 tab들에 id값을 주도록 합시다.
    //target을 하면 내가 클릭했는게 무엇인지 알수 있지. 근데 target의 id값만 들고 오면 되니까. target.id

    stillGoingList=[]; //진행중인 할일들을 담을 리스트
    DoneList=[];

    if(mode=="all"){ //만약 all이면 전체 리스트를 보여준다
        drawTaskList(); //기존에 하던거 그냥 하면 되지.
    }
    else if(mode=="stillGoing"){ //아직 완료되지 않은 해야할 리스트를 보여준다.task.isComplete=false인 값들이 진행중인 아이템.
        for(let i=0;i<taskList.length;i++){ //할일 배열을 돌면서 
            if(taskList[i].isComplete==false){ //만약 할일 배열의 완료 여부가 false(미완료)이면
                stillGoingList.push(taskList[i]); //새로운 진행중 배열에 넣어주기
            }
        }
        drawTaskList(); //지금 console.log(stillGoingList)를 했을 때 잘 반영이 됐는지 ui도 반영해주려고 drawTaskList()를 해줬지만 안돼.
        //왜 그럴까? drawTaskList를 보면 for문이 어디를 돌고 있어? 오직 taskList만 돌고 있잖아. 우리는 앞으로 해야할 할일들은 stillGoingList에 넣었으니까
        //애가 당연히 반영 안하는거는 당연하지. 그럼 우리는 drawTaskList 함수를 조금 바꿔줘야해. 어떻게?
        //drawTaskList()함수로 가서 봅시다.

        //자 근데 보시오. 1.을 하기 위해 내가 선택한 탭은 filter에서 누가 들고 있어? 그렇지 mode가 event.target.id로 들고 있지. 그러니까 우리는 
        //mode를 지역변수로 선언하면 안되고 전역변수로 선언해줘야지. 위에 39번줄에 선언해줬어. 일단 초기값을 all로.
    }
    else if(mode=="done"){ //끝난 리스트를 보여준다. task.isComplete가 true인 값들
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==true){
                DoneList.push(taskList[i]);
            }
        }
        drawTaskList();
    }
}

function underLineIndicator(event){
    //먼저 under-line의 id를 underLine 변수로 가져오고, 클릭했을 때 발생시키니까 addEventListener()로 클릭 이벤트 발생시켜 주고.
    //underLine의 자바스크립트에서 css를 다루니까 .style로 하고, .left를 
    //현재 보면 event.currentTarget.offsetLeft+"px"로 해놨는데
    //event는 매개변수고, currentTarget은 현재 타킷을 타킷팅하는거고
    //offset이 중요한데, offsetLeft하면 왼쪽 끝에서부터 목표점까지의 x좌표를 말하는거. 즉 목표점의 제일 왼쪽의 x좌표를 말하는거.
    //offsetWidth은 목표점의 가로를 말하는거. 즉 제일 왼쪽부터 제일 오른쪽까지의 넓이.
    //offsetTop은 목표점의 맨 위를 말하는거. 즉 제일 위쪽부터 목표점까지의 길이. 즉 목표점까지의 세로 길이를 말하는거니까 y좌표를 말하는거.

    underLine.style.left=event.currentTarget.offsetLeft+"px"; //목표점의 x좌표가 되는거지. 
    underLine.style.width=event.currentTarget.offsetWidth+"px"; //목표점의 넓이.
    underLine.style.top= event.currentTarget.offsetTop+event.currentTarget.offsetHeight+"px"; //목표점의 y좌표가 되는거지. 위에서부터 목표점까지 길이 + 목표점의 높이를 더해야
    //목표점의 맨 밑에 도달할 수 있으니까.
}