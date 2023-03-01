import React, { useState } from 'react'

function QuestionType({ hideModal }) {
    const [AnswerType, setAnswerType] = useState("checkbox");
    const [Question, SetQuestion] = useState({
        "type": "checkbox",
        "Question": "",
        "Options": [],
        "Answer": ""
    });
    const [QuestionError, setQuestionError] = useState(false)
    const [OptionError, setOptionError] = useState(false)
    const [checkBoxOption, setCheckBoxOpt] = useState("");
    const changeType = () => {
        if (AnswerType === "checkbox") { setAnswerType("paragraph"); HandleonChange("paragraph", "changeType"); }
        else { setAnswerType("checkbox"); HandleonChange("checkbox", "changeType"); }

    }
    const HandleonChange = (e, type) => {
        switch (type) {
            case "question": {
                let data = Question;
                data[e.target.name] = e.target.value
                setQuestionError(false)
                SetQuestion({ ...data })
                break;
            }
            case "add": {
                setCheckBoxOpt(e.target.value)
                break;
            }
            case "changeType": {
                let data = Question;
                data["type"] = e;
                if (e === "paragraph") data["Options"] = []; setCheckBoxOpt("");
                SetQuestion({ ...data })
                break;
            }
        }
    }
    const AddOptions = () => {
        let data = Question;
        console.log("data", data)
        data["Options"] = [...data.Options, checkBoxOption];
        setOptionError(false)
        SetQuestion({ ...data })
        setCheckBoxOpt("");
    }

    const submit = () => {
        if (!Question.Question || Question.Question === "" || Question.Question === undefined) {
            setQuestionError(true)
        } else if (!Question.Options.length && Question.type === "checkbox") {
            setOptionError(true)
        } else {
            const items = JSON.parse(localStorage.getItem('Question-Answer'));
            if (items && items.length) {
                let data = items;
                data.push(Question)
                localStorage.setItem('Question-Answer', JSON.stringify(data));
            }else{
                localStorage.setItem('Question-Answer', JSON.stringify([Question]));
                
            }
            hideModal()
            console.log("items", items)
        }
    }
    console.log("co", Question)
    return (
        <div>
            <h3>Add a New Question</h3>
            <div style={{ display: 'block' }}>
                <div>
                    <button onClick={changeType}>{AnswerType.toUpperCase()}</button>
                </div>
                <div>
                    <input name='Question' placeholder='Type question here' value={Question.Question} onChange={(e) => HandleonChange(e, 'question')} />
                    <span style={{ color: QuestionError ? "red" : "white" }}>Question is required</span>
                </div>
                {AnswerType === "checkbox" && <div>
                    <ul>
                        {
                            Question.Options && Question.Options.length ? Question.Options.map((item, i) => <li key={i}>{item}</li>) : ""
                        }
                    </ul>
                    <input type="text" name='addNewOpt' value={checkBoxOption} onChange={(e) => HandleonChange(e, 'add')} disabled={!Question.Question ? true : false} /> 
                        <span style={{ color: OptionError ? "red" : "white" }}>Question is required</span>
                    <button onClick={AddOptions} disabled={!Question.Question ? true : false}>Add New option</button>
                </div>}
            </div>
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default QuestionType