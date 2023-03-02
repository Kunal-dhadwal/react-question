import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ReviewAnswer() {
  const items = JSON.parse(localStorage.getItem('Question-Answer'));
  const [data, setData] = useState([])
  useMemo(() => {
    if (items && items.length) setData(items);
  }, []);
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", height: "100vh", justifyItems: "center", position: "absolute", padding: "20px", margin: "40px", boxSizing: 'border-box' }}>
      <div style={{ width: "80%", borderStyle: "solid" }}>
        {
          data.length && data.map((item, i) => {
            return (
              <div key={i}>
                <h4>{item.Question}</h4>
                {item.type === "checkbox" ?
                  <ul>
                    {
                      item.Answer && item.Answer.length && item.Answer.map((item, index) => {
                        return (
                          <li>{item}</li>
                        )
                      })
                    }
                  </ul> :
                  <p>{item.Answer?item.Answer:""}</p>}
              </div>
            )
          })
        }
      </div>
      <button onClick={()=>navigate("/form/builder")} style={{textDecorationLine:"underline"}}>Back to form builder</button>
    </div>
  )
}

export default ReviewAnswer