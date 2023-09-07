import React from "react";
import { useParams } from 'react-router-dom';
import QuestionComponent from "./QuestionComponent";
import QuestionAPI from "../API/QuestionAPI";
import Param from "../Param";


 class Question extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            displayController:true,
            displayQuestion:false,
            displayScore:false,
            count:0,
            isAdd: false,
            question:'',
            answer:'',
            subId:''
        }
    }

    async componentDidMount() {
        const data = await QuestionAPI.post('getquestion', {
            "topicId": this.props.params.id
        })
        this.setState({count:data.length,
        subId: this.props.params.id});
    }
    handleAdd = () => {
        this.setState({isAdd:true})
    }
    handleCLoseForm = () => {
        this.setState({isAdd:false})
        this.componentDidMount();
    }
    handleSubmit = async () => {
       
        if(this.state.question==""|| this.state.answer ==""){
            alert("Vui lòng nhập đủ thông tin")
        }
        else {
            const data = await QuestionAPI.post('addqa', {
                "questionName": this.state.question,
                "answer": this.state.answer,
                "subjectId": this.props.params.id
            })
           
            if(data==true){
               this.setState({isAdd:false});
              this.componentDidMount();
            }
        }
    }
    render() {
        const {displayController, question, answer, subId} = this.state
       
        return <div >

            <div className={this.state.isAdd?"subedit":"hiden"}>
                <div className="custom-form" >
                 <button onClick={()=> this.handleCLoseForm()} className=" btn-close"></button>
                    <label>
                      Question
                      <input
                        type="text"
                        name="question"
                        value={question}
                        onChange={(e)=>this.setState({question:e.target.value})}
                      />
                    </label>
                    <label>
                      Answer
                      <input
                        type="text"
                        name="answer"
                        value={answer}
                        onChange={(e)=>this.setState({answer:e.target.value})}
                      />
                    </label>
                    <br />
                    <button onClick={()=>this.handleSubmit()} type="button">Submit</button>
                  </div>
            </div>


            {displayController?
            
            <>
            <span>Số cấu hỏi: {this.state.count}</span>
            <br/>
            <br/>
            <div style={{marginRight:'6px'}} onClick={()=> this.handleAdd()} className="btn btn-primary">Thêm</div>
            <div onClick={()=>this.setState({displayController:false, })} className="btn btn-danger">Bắt đầu</div>
            
            </>
             
             
             :

           <QuestionComponent subId = {subId} />
           
            }
           
        </div>
    }
}

export default Param.withParams(Question);