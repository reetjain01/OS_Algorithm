// taking required html elements
const P1 = document.getElementById('P1');
const P2 = document.getElementById('P2');
const resetButton = document.getElementById("reset");
var turn = 0; 	// process priority
	var flag = [false, false];  // which process want to enter critical section
	let id;       //process id
	let p1 = 0;   //to handle P1 events
	let p2 = 0;    //to handle P2 events

	//fuction to move process one button
	P1.addEventListener("click", function () {   
		if (p1 == 0) {    
			id = 0;
			enterCritical();
			console.log("Process 1 entered ");
			return;
		}
		if (p1 == 1) {
			console.log("Process 1 exit");
			exitCritical(0);
			
			if(p1==1 && p2==1)
			{
				resetButton.style.visibility = "visible";
			}	
			return;
		}
	});
	//fuction to move process two button
	P2.addEventListener("click", function () {
		
		if (p2 == 0) {
			id = 1;
			enterCritical();
	
			console.log("Proccess 2 entered ");
			return;
		}
		if (p2 == 1) {
			exitCritical(1);
			console.log("Process 2 exited");
			
			if(p1==1 && p2==1)
			{
				resetButton.style.visibility = "visible";
			}
			return;
		}
		
	});
	// fuction of rest button to reset to default positions
	function reset(){
		if(p1==2 && p2==2)
		{
			$(P1).detach().appendTo('#entrystate');
			$(P2).detach().appendTo('#entrystate');
			p1 = 0;
			p2 = 0;
		}
	}
	function enterCritical() {
		flag[id] = true; // set flag for this process to true
		turn = 1 - id; // set turn to the other process's id

		while (flag[1 - id] && turn == 1 - id) {
			alert("Other process is running!");
			flag[id] = false;
			return;
		}
		if (p1 == 0 && id == 0) {
			$(P1).detach().appendTo('#criticalsection');
			p1 = 1;
		}
		if (p2 == 0 && id == 1) {
			$(P2).detach().appendTo('#criticalsection');
			p2 = 1;
		}


	}
//fuction to exit critical state
	function exitCritical(id) {         
		if(id==0){
			$(P1).detach().appendTo('#exitstate');
		}
		if(id==1){
			$(P2).detach().appendTo('#exitstate');
		}
		flag[id] = false;
	}