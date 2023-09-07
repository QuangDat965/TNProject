import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SubjectAPI from "../API/SubjectAPI";
import { Button } from "bootstrap";

function withParams(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

 class Topic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            isEdit: false,
            valueEdit: '',
            desEdit:'',
            idEdit:''
        }
    }
    async componentDidMount() {
       const data = await SubjectAPI.get('getsubject')
       this.setState({data:data})
       console.log(data);
    }
    hadnleRemove = (event,id) => {
      event.preventDefault();
      SubjectAPI.post('removesub', {
        "id": id
      });
      window.location.reload();
    }
    handleEdit = (event,id) => {
      event.preventDefault()
      this.setState({isEdit:true, idEdit:id})
    }
    handleClickCard = (id) => {
       console.log(id);
    }
    async handleSubmit(e) {
      e.preventDefault();
      if(this.state.valueEdit!=""){
        const rs = await SubjectAPI.post('editsub', {
          "id": this.state.idEdit,
          "nameSub": this.state.valueEdit,
          "subSub": this.state.desEdit
        });
        if (rs ==true ){
          this.setState({isEdit:false})
          // this.props.navigate('/topic')
          window.location.reload();
        }
      }
    }
    render() {
        const {valueEdit,desEdit} = this.state;
        return<div className="card-list">
          <div className={this.state.isEdit?"subedit":"hiden"}>
          <form className="custom-form" onSubmit={(e)=> this.handleSubmit(e)}>
            <button onClick={()=> this.setState({isEdit:false})} className=" btn-close"></button>
                    <label>
                      Name
                      <input
                        type="text"
                        name="name"
                        value={valueEdit}
                        onChange={(e)=>this.setState({valueEdit:e.target.value})}
                      />
                    </label>
                    <label>
                      Description
                      <input
                        type="text"
                        name="description"
                        value={desEdit}
                        onChange={(e)=>this.setState({desEdit:e.target.value})}
                      />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                  </form>
          </div>
                    
            <h1>List Topic</h1>
            <Link to = "addsubject"  className="btn btn-success"><i className="bi bi-plus"></i> Add</Link>
        {      
          this.state.data.map((e, i) => {
            const path = `/question/${e.id}`
            return (
                <div  key={i} className="card card-hover">
                  <Link to={path} style={{display:'flex', justifyContent: 'space-between'}}  className="card-body mylink">
                    <div  className="card-title">{e.name}
                    </div>
                    <div  >
                    <button style={{marginRight:'6px'}} onClick={(event)=>this.handleEdit(event,e.id)} className="btn btn-warning">Edit</button>
                    <button onClick={(event)=> this.hadnleRemove(event,e.id)} className="btn btn-danger">Remove</button>
                  </div>
                  </Link>
                 
                </div>
              )
          })
        }
      </div>
    }
}

export default withParams(Topic);