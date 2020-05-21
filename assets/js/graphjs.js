async function graphfetch(){
    const xlabels=[];
    const ytemps=[];
    const ytemps2=[];
    const ytemps3=[];    
    const response=await fetch('../static/SAP.csv');
    const response2=await fetch('../static/RELIANCE.NS.csv');
    const response3=await fetch('../static/IBM.csv');
    const data= await response.text();
    const data2=await response2.text();
    const data3=await response3.text();
    
    const rows1=data.split('\n').slice(1);
    const rows2=data2.split('\n').slice(1);
    const rows3=data3.split('\n').slice(1);
    // console.log(rows);
    rows1.forEach(element=>{
        const row=element.split(',');
        const year=row[0];
        xlabels.push(year);
        const temp=row[1];
        ytemps.push(parseFloat(temp)*72);
    })
    rows2.forEach(element=>{
        const row=element.split(',');
        const temp=row[1];
        ytemps2.push(temp);
    })
    rows3.forEach(element=>{
        const row=element.split(',');
        const temp=row[1];
        ytemps3.push(parseFloat(temp)*72);
    })
    return {xlabels,ytemps,ytemps2,ytemps3};
}

    // --------------------Chart--------------------------
async function createChart(){
    const data=await graphfetch();
    const ctx = document.getElementById('chart').getContext('2d');
    console.log("temps",data.ytemps2);

var data2 = {
    labels: data.xlabels,
    datasets: [{
        label: 'SAP',
            data: data.ytemps,
            fill:true,
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor:'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointStyle:'triangle',
            pointRadius:3
      }, {
             label: 'RELIANCE',
             data: data.ytemps2,
             fill:true,
             backgroundColor:'rgba(44, 130,201, 0.2)',
             borderColor:'rgba(44, 130, 201, 1)',
             borderWidth: 1
      },
    {
        label: 'IBM',
        data: data.ytemps3,
        fill:true,
        backgroundColor:'rgba(247, 202, 24, 0.2)',
        borderColor:'rgba(247, 202, 24, 1)',
        borderWidth: 1,
        pointStyle:'circle'
        // pointRadius:3
    }
    ]
  };
 
  var options = {
    responsive: true, 
    maintainAspectRatio: false,
    // animation:{
    //     easing:'easeInElastic',
    //     duration:10000
    // },
    scales: {
        calculateX:0,
            xAxes:[{
                gridLines:{
                    display:false
                }
            }],
              yAxes: [{
                  ticks: {
                    max:11500,
                    min:7000,
                    stepSize:100
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

  setInterval(function() {
    setData(data2.datasets[0].data);
    setData(data2.datasets[1].data);
    setLabels(data2.labels);

    var myChart = new Chart(ctx , {
        type: "line",
        data: data2,
        options:options 
    }); 
  }, 2000);

}