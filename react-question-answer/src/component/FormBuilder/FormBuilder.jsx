import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../SelectQuestionType/Model'
import QuestionType from './QuestionType'

const FormBuilder = () => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const items = JSON.parse(localStorage.getItem('Question-Answer'));
    useEffect(() => {
        if (items && items.length) setData(items);
    }, []);
    const navigate = useNavigate();
    const handleChange = (e, index) => {
        switch (e.target.name) {
            case "para": {
                let newData = data;
                newData[index]["Answer"] = e.target.value;
                newData[index]["Error"] = false;
                setData([...newData]);
                localStorage.setItem('Question-Answer', JSON.stringify(newData));
                break;
            }
            case "checkbox": {
                let newData = data;
                if (e.target.checked) {
                    if(newData[index]["Answer"]==="" || typeof newData[index]["Answer"]==="string") newData[index]["Answer"]=[]
                    newData[index]["Answer"].push(e.target.value);
                    newData[index]["Error"] = false;
                } else {
                    if(newData[index]["Answer"]==="" || typeof newData[index]["Answer"]==="string") newData[index]["Answer"]=[]
                    newData[index]["Answer"] = newData[index]["Answer"].filter((item) => item !== e.target.value)
                    newData[index]["Error"] = false;
                }
                setData([...newData]);
                localStorage.setItem('Question-Answer', JSON.stringify(newData));
                break;
            }
            default: return
        }
    }
    const checkOutTOReview=()=>{
        let newData=data;
        let redirect=true;
        newData=newData.map((item)=>{
            if((!item.Answer && typeof item.Answer==="string") ||(!item.Answer.length)){
                item.Error=true
                redirect=false
                return item
            }else{
                return item
            }})
            if(redirect)  navigate("/form/answer")
        setData([...newData]);
    }
    return (
        <>
        <div style={{ height: "100vh", width: "100wh"}}>
            <div id="model"></div>
                        <div style={{ justifyItems: "center", alignItems: "center", height: "100vh", width: "100%", display: "grid" }} id="formIn">
                <div style={{ width: "80%" }}>

                    <button onClick={() => setShow(!show)} style={{ display: "flex", justifyContent: "center", alignContent: "center", width: "30%", padding: "5px" }}>Add Questions</button>
                    <form>
                        {data.length ? data.map((item, i) => {
                            return (
                                <div key={i} style={{ margin: "20px" }}>
                                    <div style={{ margin: "5px" }}>{item.Question}</div>
                                    {item.type === "paragraph" ?
                                        (
                                            <input name="para" type='text' value={item.Answer} onChange={(e) => handleChange(e, i)} />
                                        ) :
                                        item.Options.length && item.Options.map((res, ind) => {
                                            return (<div key={ind}>
                                                <input type="checkbox" name="checkbox" value={res} onChange={(e) => handleChange(e, i)} checked={item.Answer.includes(res)}/>
                                                <label for="vehicle1">{res}</label>
                                            </div>)
                                        })}
                                    <span style={{ color: item.Error? "red" : "white" }}>Question is required</span>
                                </div>
                            )
                        }) : ""}
                    </form>
                </div>
                <div style={{ width: "80%" }}>
                    {data.length ? <button onClick={checkOutTOReview} style={{ display: "flex", justifyContent: "center", alignContent: "center", width: "30%", padding: "5px" }}>{"Review my answers >"}</button>:""}
                </div>
            </div>
            <Modal children={<QuestionType setData={setData} hideModal={() => setShow(!show)} />} showModal={show} toggleModal={() => setShow(!show)} />
            </div>
        </>
    )
}

export default FormBuilder