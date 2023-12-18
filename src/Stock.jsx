import React, { useState } from 'react'
import axios from 'axios';

function Stock() {
    const [input, setInput] = useState([]);
    const [stockdata, setStockData] = useState([]);
    const [mostVolatileCompany, setMostVolatileCompany] = useState('');
    const [percentageChange, setPercentageChange] = useState(0);

    const handlechange = (e) => {
       setInput(e.target.value);
    }

    function handlesubmit () {
       
        setInput('');
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${input}&token=cj2aqkpr01qi64tg1360cj2aqkpr01qi64tg136g`)
        .then(res=>{
            const post = res.data;

            const stockInfo = {name: input, price: post.c, volatile: post.dp};

            setStockData([...stockdata, stockInfo]);

            //most volatile stock logic

            if (Math.abs(stockInfo.volatile) > Math.abs(percentageChange)) {
                setMostVolatileCompany(stockInfo.name);
                setPercentageChange(stockInfo.volatile);
              }
        })
        .catch((error)=> {
           console.log(error)
        })
        
    }

    
  return (
    <div>
        
        <div>
            <input type="search" onChange={handlechange} value = {input || ""}  name="search" id="" />
            <button onClick={handlesubmit}>Search</button>
        </div>
        <div>
            {stockdata.map((item, i)=> {
                return <p key={i}>{item.name}  {item.price}</p>
            })
            }  
        </div>

        {mostVolatileCompany &&( 
        <div style={{marginTop: "100px"}}>
            <p>{mostVolatileCompany}</p> 
            <p style={{marginTop: "25px"}}>{percentageChange}%</p> 
        </div>
        )}
    
    </div>
  )
}

export default Stock