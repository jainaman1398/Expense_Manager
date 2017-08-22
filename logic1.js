let amount=$("#amount");
let date=$("#date");
let name=$("#name");
let table=$("#table");
let cat=$("#cat");
let new1=$("#new1");
let add=$("#add");
let index=4;
let list=$("#list")
let expense=[];
let payment={};


expense[0]={
    Title:'Food',
    Limit:15000,
    Amount:15000
}
expense[1]={
    Title:'Travel',
    Limit:5000,
    Amount:5000
}
expense[2]={
    Title:'Clothes',
    Limit:7000,
    Amount:7000,
}
expense[3]={
    Title:'Bills',
    Limit:9000,
    Amount:9000,
}



console.log(expense);
$(function () {
    var yu=localStorage.getItem('expense1');
    if(!yu){
        localStorage.setItem("expense1",JSON.stringify(expense));
    }
    table23();
    let button=$("#button");

    add.click(function () {
        console.log(cat.val())
        expense.push({
            Title:cat.val(),
            Limit:new1.val(),
            Amount:new1.val()
        });
        localStorage.setItem("expense1",JSON.stringify(expense));
        console.log(expense);
        table23();
    })

    button.click(function () {
        console.log(name.val());
        console.log(date.val());
        console.log(amount.val());

        expense.forEach(function (item,index) {
            if(expense[index].Title==name.val()){
                if(amount.val()<=expense[index].Amount){
                    expense[index].Amount-=amount.val();
                    localStorage.setItem("expense1",JSON.stringify(expense));
                    var conceptName = $('#aioConceptName').find(":selected").text();
                    console.log(conceptName);
                    if(payment[name.val()]){
                        if(!payment[name.val()]["Items"])
                        {
                            payment[name.val()]["Items"]=[];
                        }
                        payment[name.val()][conceptName]+=parseInt(amount.val());
                        payment[name.val()]["Items"].push(date.val()+":"+amount.val());
                    }
                    else{
                        payment[name.val()]={};
                        payment[name.val()]["Items"]=[];
                        payment[name.val()]["Card"]=0;
                        payment[name.val()]["Cash"]=0;
                        payment[name.val()]["Other"]=0;
                        payment[name.val()]["Cryptocoin"]=0;
                        payment[name.val()][conceptName]+=parseInt(amount.val());
                        payment[name.val()]["Items"].push(date.val()+":"+amount.val());
                    }
                    table23();
                }
                else
                    window.alert("Insufficient Funds");
            }

        });

    })
    $('#table').delegate('tr', 'click' , function(){
        list.empty();
        let r=$(this).index();
        let rr=expense[r].Title;
        let arr=payment[rr].Items;
        console.log(arr);
     //   alert("Card:" +payment[rr].Card +" Cash:" +payment[rr].Cash +" Other:" +payment[rr].Other +" Cryptocoin" +payment[rr].Cryptocoin);
       list.append(`<li class="list-group-item">Card:" ${payment[rr].Card} " Cash:" ${payment[rr].Cash} " Other:" ${payment[rr].Other} " Cryptocoin" ${payment[rr].Cryptocoin}</li>`)
        list.append(`<li class="list-group-item">${arr}
        </li>`)
    });
});
function table23() {
    table.empty();
    var expense2=localStorage.getItem("expense1");
    var expense1=JSON.parse(expense2);
    console.log(expense1);
    expense1.forEach(function (item, index) {
        var t=(item.Limit);
        var yo=(t-item.Amount)*100;
        var z=yo/t;
        console.log(item.Title);
        let y = ($(`<tr><th>${item.Title}</th><th>${item.Limit}</th><th>${item.Amount}</th><th>${z}</th></tr>`));
        if(z>=80)
        {
            window.alert("Expense above 80% in particular Category");
            y.css('background-color','#ff0000');
        }

        table.append(y);
    })
}