function nameofcompany(){
    var list=document.getElementById('organization');
    var arr=["IBM","Amazon","SAP","Reliance","Deloitte"];
    var num=arr.length;
    for(let i=0;i<num;i++){
        var option =document.createElement('option');
        option.text=arr[i];
        list.add(option,list[i])
        console.log(list[i]);
    }
}