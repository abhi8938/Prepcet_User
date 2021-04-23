import {useState} from 'react'

const supportStore = () => {
    const faq = [
        {id:'0',ques:'Need help to purchase sample paper?',ans:'answer answer answer answer answer answer answer answer answer'},
        {id:'1',ques:'How to set reminders?',ans:'answer answer answer answer answer answer answer answer answer'},
        {id:'2',ques:'How to add/edit your notes?',ans:'answer answer answer answer answer answer answer answer answer'},
        {id:'3',ques:'Question4',ans:'answer answer answer answer answer answer answer answer answer'},
        {id:'4',ques:'Question5',ans:'answer answer answer answer answer answer answer answer answer'},
    ] 
    const [supportData,setSupportData] = useState([...faq])
    return {supportData,setSupportData};
}

export default supportStore;