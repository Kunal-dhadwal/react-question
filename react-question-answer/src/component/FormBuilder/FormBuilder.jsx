import React, { useEffect, useState } from 'react';
import Modal from '../SelectQuestionType/Model'
import QuestionType from './QuestionType'

function FormBuilder() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([])
    const items = JSON.parse(localStorage.getItem('Question-Answer'));
    useEffect(() => {
        if (items && items.length) setData(items);
    }, [items])
    console.log(show)
    return (
        <div style={{ justifyContent: "left", alignItems: "center", height: "40vh", width: "100%" }}>
            <Modal children={<QuestionType hideModal={() => setShow(!show)} />} showModal={show} toggleModal={() => setShow(!show)} />
            <button onClick={() => setShow(!show)} style={{ display: "flex", justifyContent: "center", alignContent: "center", width: "30%", padding: "5px" }}>Add Questions</button>
            <form>
                {data.length ? data.map((item, i) => {
                    return (
                        <div key={i}>
                            <div>{item.Question}</div>
                            {item.type === "paragraph" ?
                                (
                                    <input name="para" type={'text'} value={item.Answer} />
                                ) :
                                item.Options.length && item.Options.map((res, i) => {
                                    return (<>
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <label for="vehicle1"> I have a bike</label>
                                    </>)
                                })}

                        </div>
                    )
                }) : ""}
            </form>
            <button onClick={() => setShow(!show)} style={{ display: "flex", justifyContent: "center", alignContent: "center", width: "30%", padding: "5px" }}>{"Review my answers >"}</button>
        </div>
    )
}

export default FormBuilder