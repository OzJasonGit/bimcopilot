









//Defines todays date in DOM
function date(){
    let todaysDate = new Date();

    console.log(todaysDate)

    document.getElementById("DATE").innerText = todaysDate.toDateString();
    }
    date();