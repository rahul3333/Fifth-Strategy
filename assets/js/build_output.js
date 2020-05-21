async function graphfetch(){
    const xlabels=[];
    const ypurchased=[];
    const ymoney=[];
    const ysell=[];    
    const close=[];
    const response=await fetch('../static/state_data2.csv');
    const data= await response.text();
    const response2=await fetch('../static/close.csv');
    const close_data=await response2.text();

    const rows1=data.split('\n').slice(1);
    const rows2=close_data.split('\n').slice(1);
    rows1.forEach(element=>{
        const row=element.split(',');
        const year="Day "+row[0];
        xlabels.push(year);
        const buy_units=row[1];
        if(buy_units!=0)
            ypurchased.push(buy_units);
        const initial_money=row[5];
        ymoney.push(initial_money);
        const sell_money=row[3];
        if(sell_money!=0)
            ysell.push(sell_money);
    })

    rows2.forEach(element=>{
        const row=element.split(',');
        const data_for_line=row[0];
        close.push(data_for_line);
    })
    
    return {xlabels,ypurchased,ymoney,ysell,close};
}

    // --------------------Chart--------------------------
async function createChart(){
    const data=await graphfetch();
    const ctx = document.getElementById('chart').getContext('2d');
    // console.log("temps",data.ytemps2);

var data2 = {
    labels: data.xlabels,
    datasets: [
        {
            label: 'Close Data',
            data: data.close,
            fill:false,
            backgroundColor:'rgba(247, 202, 24, 0.2)',
            borderColor:'rgba(247, 202, 24, 1)',
            borderWidth: 1,
            pointStyle:'circle',
            // showLine:false
            // pointRadius:3
        },
        {
        label: 'Purchased Units',
            data: plot(data.xlabels,data.close),
            fill:true,
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor:'rgba(255, 99, 132, 1)',
            borderWidth: 4,
            pointStyle:'triangle',
            pointRadius:7,
            pointHoverBorderWidth:8,
            pointHoverRadius:8,
            type:'bubble',
            showLine:false,
      } ,
      {
             label: 'Sell Units',
             data: [{x:2,y:121,r:10}],
             fill:true,
             backgroundColor:'rgba(44, 130,201, 0.2)',
             borderColor:'rgba(44, 130, 201, 1)',
             borderWidth: 4,
             pointRadius:7,
             showLine:false,
             pointHoverBorderWidth:8,
             pointHoverRadius:8
      }
    ]
  };
 
  var options = {
    responsive: true, 
    maintainAspectRatio: false,
    animation:{
        easing:'easeInElastic',
        duration:1000
    },
    tooltips:{
    //     callbacks: {
    //         afterLabel: function(tooltipItem, data) {
    //           var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || 'Other';
    //           var label = data.labels[tooltipItem.index];
    //           return datasetLabel + ': ' + label;
    //         }
    // }
},
    scales: {
            xAxes:[{
                gridLines:{
                    display:false
                }
            }],
              yAxes: [{
                  ticks: {
                    max:137,
                    min:125,
                    stepSize:1
                  },
                  gridLines:{
                      display:false
                  },
                  scaleLabel: {
                       display: true,
                       labelString: 'Amount (₹)',
                    }
              }]            
          }  
  };
  


 var myChart = new Chart(ctx, {
    type: 'line',
    data: data2,
    options: options
  });

}
