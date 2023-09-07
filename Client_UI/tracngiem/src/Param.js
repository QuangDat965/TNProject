import { useParams } from 'react-router-dom';
const Param = {
     withParams : (Component) => {
        return props => <Component {...props} params={useParams()} />;
     }
}
  export default Param;