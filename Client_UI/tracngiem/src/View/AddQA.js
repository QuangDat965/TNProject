import React from "react";
import { Link,useNavigate } from "react-router-dom";
import SubjectAPI from "../API/SubjectAPI";
import './AddSubject.css'
import RequestAPI from "../API/RequestAPI";

function withParams(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
  }

 class AddSubject extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: '',
            answer: ''
        }
    }

    async componentDidMount() {

    }
    handleAnswerChange (event) {
        this.setState({answer:event.target.value})
        
    }
    handleQuestionChange(event) {
        this.setState({question:event.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if(this.state.answer==""||this.state.question==""){
            alert("Vui lòng nhập đầy đủ thông tin")
        }
       else {
        var data = await RequestAPI.post('subjectadd',{
            "name": this.state.question,
            "desCription": this.state.answer
          })
          if(data==true){
            console.log('thanh cong');
           
            this.props.navigate('/')
          }

       }
    }
    render() {
        const {question, answer} = this.state
        return(
            <form className="custom-form" onSubmit={(e)=> this.handleSubmit(e)}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={question}
          onChange={(event)=>this.handleQuestionChange(event)}
        />
      </label>
      <br />
      <label>
        Description
        <input
          type="text"
          name="Answer"
          value={answer}
          onChange={(event)=>this.handleAnswerChange(event)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
        )
      
    }
}

export default withParams(AddSubject);