import {useState} from 'react';

const subject1 = {
  id: 'du_1',
  code:'CAT_101',
  name:'Software Engineering',
  total_marks:100,
  units:[
    {
      topic:'Electromagnetic Thoery',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Stastical Physics',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Crystal Structure',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Band Theory of solids',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    }, 
  ]
  
};
const subject2 = {
  id: 'du_1',
  code:'102',
  name:'Internet of Things',
  total_marks:100,
  units:[
    {
      topic:'Electromagnetic Thoery',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Stastical Physics',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Crystal Structure',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Band Theory of solids',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    }, 
  ]
};
const subject3 = {
  id: 'du_1',
  code:'103',
  name:'Machine Learning',
  total_marks:100,
  units:[
    {
      topic:'Electromagnetic Thoery',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Stastical Physics',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Crystal Structure',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Band Theory of solids',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    }, 
  ]
};
const subject4 = {
  id: 'du_1',
  code:'104',
  name:'Cyber Security',
  total_marks:100,
  units:[
    {
      topic:'Electromagnetic Thoery',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Stastical Physics',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Crystal Structure',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Band Theory of solids',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    }, 
  ]
};
const subject5 = {
  id: 'du_1',
  code:'105',
  name:'Business Analytics',
  total_marks:100,
  units:[
    {
      topic:'Electromagnetic Thoery',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Stastical Physics',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Crystal Structure',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Band Theory of solids',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    }, 
  ]
};
const subject6 = {
  id: 'du_1',
  code:'106',
  name:'Mathematics',
  total_marks:100,
  units:[
    {
      topic:'Electromagnetic Thoery',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Stastical Physics',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Crystal Structure',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    },
    {
      topic:'Band Theory of solids',
      content:['Gradient', 'Divergence', 'Curl', 'Gauss’Law', 'Ampere’s Law', 'Continuity equation', 'Maxwell’s equation', 'Significance of Maxwell’s equations', 'Poynting Theorem', 'Electromegnetic wave propogation in dielectrice and conductors' ]
    }, 
  ]
};

const subjects = [
  {
    name: 'AI',
    date: '25-Jan-2021',
    code: '101',
    time_start: '9:00 am',
    time_end: '12:00 pm',
  },
  {
    name: 'ML',
    date: '26-Jan-2021',
    code: '102',
    time_start: '9:00 am',
    time_end: '12:00 pm',
  },
  {
    name: 'IOT',
    date: '28-Jan-2021',
    code: '103',
    time_start: '9:00 am',
    time_end: '12:00 pm',
  },
  {
    name: 'CSF',
    date: '21-Jan-2021',
    code: '104',
    time_start: '9:00 am',
    time_end: '12:00 pm',
  },
  {
    name: 'BAO',
    date: '29-Jan-2021',
    code: '105',
    time_start: '9:00 am',
    time_end: '12:00 pm',
  },
];
const datesheet_template = {
  sem: '1',
  subjects: subjects,
  collegeName: 'Delhi University',
  address: 'Bidholi, near bidholi, oppsite bidhole, Delhi',
  coord: {lat: '', long: ''},
};
const course_template = [subject1, subject2, subject3, subject4, subject5, subject6];

const useResourceStore = () => {
  const [course, setstate] = useState(course_template);
  const [datesheet, setDateSheet] = useState(datesheet_template);
  const [center, setCenter] = useState({
    collegeName: 'IP University',
    address: 'Some Address',
  });
  const fetchResources = async () => {
    //get resurces - update state or handle Error
  };
  return {course, datesheet, center};
};
export default useResourceStore;
