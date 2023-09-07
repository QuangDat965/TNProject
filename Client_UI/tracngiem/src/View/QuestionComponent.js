import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'
import Score from './Score';
import QuestionAPI from '../API/QuestionAPI';


  export default class QuestionComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
         questions : [],
          check : false,
          showScore: false,
          result: {
            
          }
      };
    }
    async componentDidMount() {
        const data = await QuestionAPI.post('getquestion', {
            "topicId": this.props.subId
        })
        this.setState({questions:data})
    }
    handleCheckResult = () => {
        let total = 0;
        let correct = 0;
        let incorrect = 0;
        this.state.questions.map(e=> {
            e.correctAnswer==e.userSelect?correct++:incorrect++
            total++
        })
        let idx = 10/total;
        let score = correct*idx
        var obj = {
            total:total,
            correct:correct,
            incorrect:incorrect,
            score:score
        }
        this.setState({ result:obj,
            check:true, showScore:true})
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
    handleReset = () => {
        this.setState({check:false,showScore:false})
        this.componentDidMount();
    } 
    handleSelectAnswer = (questionId, answer) => {
        const data = this.state.questions;
        data.map(e=> {
            if(e.id == questionId){
                e.userSelect = answer
            }
        })
        this.setState({questions: data})
      };
    
      changeState = (state) => {
        this.setState({showScore:state})
      }
      
    render() {
      const { questions,check,result } = this.state;
  
      return (
        <div className="question-container">
           <div style={{alignItems:'center'}} className={this.state.showScore?"subedit":"hiden"}>
          {this.state.showScore?<Score changeState={this.changeState} result ={result}/>:""}        
          </div>
          {questions.map((q) => (
            <div key={q.id} className="question">
              <h2>{q.question}</h2>
              <div className="answer-options">
                {q.answers.map((answer, answerIndex) => (
                
                  <label key={answerIndex} className="anw-hover answer-label">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      className="answer-radio"
                      value={answer}
                      checked={q.userSelect === answer}
                      onChange={() => this.handleSelectAnswer(q.id, answer)}
                    />
                    {answer}
                    {check==false?"":
                    q.correctAnswer==q.userSelect?answer==q.correctAnswer? 
                    <FontAwesomeIcon  icon={faCheck} color='green' />:"":answer==q.correctAnswer?
                    <FontAwesomeIcon icon={faCheck} color='green' />:
                    <FontAwesomeIcon icon={faTimes} color='red' />
                    
                    }
                    {console.log(check)}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button onClick={()=>this.handleCheckResult()} type="button" class="btn btn-primary">Check</button>
          <button onClick={()=>this.handleReset()} type="button" class="btn btn-secondary">Reset</button>        
        </div>
      );
    }
  }
  