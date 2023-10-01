    const numbers=[];
    const operators=[];
    let isClear=true;

    const txtInput=document.getElementById("calculator-text-box");

    document.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("click",()=>{
        let buttonId=btn.id;
        buttonAnimation(buttonId);
        fillTextInput(buttonId);
    })
    });


    document.addEventListener("keydown",handleKeyPress);

    function handleKeyPress(event){
        let key=event.key;
        if(key==="Enter"){
             key="=";
        }else if(key==="Backspace"){
            key="delete";
        }
        buttonAnimation(key);
        fillTextInput(key);
    }
    function isButton(currentId){
        const regexPattern=/[0-9+\-/*=.]/;
        return currentId.match(regexPattern) || ["sign","clear","delete"].includes(currentId);
    }

    function buttonAnimation(currentButton){
        if(isButton(currentButton)){
            const element=document.getElementById(currentButton);
            element.classList.add("pressed");

            setTimeout(()=>{
            element.classList.remove("pressed");

            },100);
            
        }else{
            console.log(currentButton);
        }
    }

    function clearCalculator(){
        txtInput.value="";
        numbers.length=0;
        operators.length=0;
        isClear=true;
    }

    function handleOperator(currentButton){

        if(txtInput.value.trim() === ""){
            clearCalculator();

        }else{
            if(numbers.length<1 && operators.length<1){
                operators.push(currentButton);
                numbers.push(txtInput.value);
                txtInput.value="";
            }else{
                numbers.push(txtInput.value);
                txtInput.value = calculate(numbers,operators).toLocaleString();
                numbers.length=0;
                operators.length=0;
                operators.push(currentButton);
                numbers.push(txtInput.value);
                isClear=false;
            }
        }
        
    }

    function handleEquals(){
        numbers.push(txtInput.value);
        console.log(numbers);
        console.log(operators);
        txtInput.value = calculate(numbers,operators).toLocaleString();
        numbers.length=0;
        operators.length=0;
    }

    function fillTextInput(currentButton){
        
        if(isButton(currentButton)){
            switch(currentButton){
                case "+":
                case "-":
                case "*":
                case "/":
                   handleOperator(currentButton);
                break;

                case "=":
                    handleEquals(); 
                break;
                case "clear":
                    clearCalculator();
                break;
                case "delete":
                    txtInput.value=txtInput.value.slice(0,-1);
                break;
                case "sign":
                    txtInput.value=parseFloat(-txtInput.value);
                    break;
                default:
                   if(!isClear || txtInput.value == 0){
                        txtInput.value="";
                        isClear=true;
                   }
                    txtInput.value+=currentButton;
                break;
            }

        }
        
    }

function calculate(numbers,operators){
    let result=parseFloat(numbers[0].replace(',',''));
    try{
        for(let index=0; index<operators.length; index++){
            let operator = operators[index];
            let operand = parseFloat(numbers[index + 1].replace(',',''));
            switch(operator){
                case "+":
                    result += operand;
                break;

                case "-":
                    result -= operand;
                break;

                case "*":
                    result *= operand;
                break;

                case "/":
                    result /= operand;
                break;

                default:
                    result = 0;
                break;
            }
           
        }

    }catch(error){
    alert("Error calculating result");
    }
    return result;
}
   

    


