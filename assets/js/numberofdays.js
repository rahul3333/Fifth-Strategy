function numofdays(){
    var list=document.getElementById('list_days');
    for(let i=0;i<1000;i++){
        var option =document.createElement('option');
        option.text=i;
        list.add(option,list[i])
    }
}