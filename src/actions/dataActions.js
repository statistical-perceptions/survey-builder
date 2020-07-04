import axios from "axios";
import { 
    ADD_STUDY_NAME,
    GET_DB_INFO,
    GET_STUDY_INFO
} from "./types";

export const addStudyName = (which_database, study_name) => dispatch => {
    const dataToPost = {
        studyName: study_name,
        experiments: []
    };
    // note that the goal of the following step is to show researchers 
    // the name of the study they have just created. This is totally doable
    // via a simple this.state written in Dashboard. However, putting it here
    // just makes things more organized and fits well with the rest of the 
    // redux structure I have used to create this demo
    axios
        .post('http://localhost:5000/api/feedback/' + which_database + '/info',
            dataToPost)
        .then(entry => {
            // console.log(entry);
            dispatch({
                type: ADD_STUDY_NAME,
                payload: entry.data.studyName
            })
        })
}

export const getDBInfo = (which_database) => dispatch => {
    axios
        .get('http://localhost:5000/api/feedback/' + which_database + '/info')
        .then(res => {
            dispatch({
                type: GET_DB_INFO,
                payload: res.data
            })
        })
}

export const getStudyInfo = (which_database, which_study) => dispatch => {
    axios
        .get('http://localhost:5000/api/feedback/' + which_database + 
            '/info/studyName-' + which_study)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_STUDY_INFO,
                payload: res.data.experiments
            })
        })

}

export const specificExptData = (which_database, which_col) => dispatch => {
    axios
        .get("API_URL that points to cluster" + "/" + which_database + "/" +
            which_col)
        .then(res => dispatch(res.data))
}