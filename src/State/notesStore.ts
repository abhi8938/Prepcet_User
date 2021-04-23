import {useDispatcher, useGlobalState} from './GlobalState';

import services from '../Services/services';
import {useState} from 'react';

const service = new services();
const notes = [
  {
    id: 1,
    type: 'Highlight',
    pageCfi: '',
    location: {offSetX: 0, offSetY: 0},
    epubCfi: '',
    text:
      'Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum0',
    pageNumber: '',
    note: '',
    color: '#FEB701',
  },
  {
    id: 2,
    type: 'Bookmark',
    pageCfi: '',
    location: {offSetX: 0, offSetY: 0},
    epubCfi: '',
    pageNumber: 18,
    note: '',
    color: '#585757',
  },
  {
    id: 3,
    type: 'Underline',
    pageCfi: '',
    location: {offSetX: 0, offSetY: 0},
    epubCfi: '',
    text:
      'Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum0',
    pageNumber: '',
    note: '',
    color: '#01D0FE',
  },
  {
    id: 4,
    type: 'Highlight',
    pageCfi: '',
    location: {offSetX: 0, offSetY: 0},
    epubCfi: '',
    text:
      'Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum0',
    pageNumber: '',
    note: '',
    color: '#01D0FE',
  },
  {
    id: 5,
    type: 'Bookmark',
    pageCfi: '',
    location: {offSetX: 0, offSetY: 0},
    epubCfi: '',
    pageNumber: 25,
    note: '',
    color: '#585757',
  },
  {
    id: 6,
    type: 'Underline',
    pageCfi: '',
    location: {offSetX: 0, offSetY: 0},
    epubCfi: '',
    text:
      'Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum0',
    pageNumber: '',
    note: '',
    color: '#01D0FE',
  },
  {
    id: 7,
    type: 'Highlight',
    pageCfi: '',
    location: {offSetX: 0, offSetY: 0},
    epubCfi: '',
    text:
      'Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum0',
    pageNumber: '',
    note: '',
    color: '#585757',
  },
  {
    id: 8,
    type: 'Bookmark',
    pageCfi: '',
    location: {offSetX: 0, offSetY: 0},
    epubCfi: '',
    pageNumber: 57,
    note: '',
    color: '#585757',
  },
  {
    id: 9,
    type: 'Underline',
    pageCfi: '',
    location: {offSetX: 0, offSetY: 0},
    epubCfi: '',
    text:
      'Lorem Ipsum Lorem Ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum0',
    pageNumber: '',
    note: '',
    color: '#01D0FE',
  },
];
const papers = [
  {name: 'Examination Paper', year: '2005', notes: [...notes]},
  {name: 'Examination Paper', year: '2006', notes: [...notes]},
  {name: 'Examination Paper', year: '2007', notes: [...notes]},
  {name: 'Examination Paper', year: '2008', notes: [...notes]},
  {name: 'Examination Paper', year: '2009', notes: [...notes]},
];

const subjects = [
  {
    name: 'Artificial Intelligence',
    code: 'EP-301',
    totalMarks: '100',
    papers: [...papers],
    summary:
      'Chapter Wise CBSE Quick Revision Notes and Key Points for Class 10',
  },
  {
    name: 'Bao',
    code: 'EP-302',
    totalMarks: '75',
    papers: [...papers],
    summary:
      'Chapter Wise CBSE Quick Revision Notes and Key Points for Class 10',
  },
  {
    name: 'ML',
    code: 'EP-303',
    totalMarks: '75',
    papers: [...papers],
    summary:
      'Chapter Wise CBSE Quick Revision Notes and Key Points for Class 10',
  },
  {
    name: 'Mathematics',
    code: 'EP-304',
    totalMarks: '100',
    papers: [...papers],
    summary:
      'Chapter Wise CBSE Quick Revision Notes and Key Points for Class 10',
  },
];
const getNotesStore = () => {
  const [subjectsData, setSubjectsData] = useState([...subjects]);
  const [noteInput, setNoteInput] = useState('');
  const [load, setLoad] = useState(true);
  const dispatcher = useDispatcher();
  const globalState: any = useGlobalState();
  const updateNoteInput = (value: string) => {
    setNoteInput(value);
  };

  const deleteAnn = (id: string) => {
    let x: Array<any> = JSON.parse(JSON.stringify(globalState.notes.ann));
    const ann = x.filter((item) => item._id !== id);
    dispatcher({type: 'SET-NOTES', payload: {...globalState.notes, ann}});
    updateAnn(globalState.notes._id);
  };
  const addNote = (id: string) => {
    let x: Array<any> = JSON.parse(JSON.stringify(globalState.notes.ann));
    let ind = x.findIndex((item) => item._id === id);
    x[ind] = {...x[ind], note: noteInput};
    dispatcher({type: 'SET-NOTES', payload: {...globalState.notes, ann: x}});
    updateAnn(globalState.notes._id);
  };

  const getAnnotations = async (id: string) => {
    setLoad(true);
    const response = await service.get_annotations(id);
    if (response.status === 200) {
      dispatcher({type: 'SET-NOTES', payload: response.data});
    } else {
      console.log('Error', `${response.data}`);
    }
    setLoad(false);
  };

  const updateAnn = async (id: string) => {
    // setLoad(true);
    const response = await service.update_annotations(
      id,
      globalState.notes.ann,
    );
    if (response.status === 200) {
      console.log('UPDATED - ANN');
    } else {
      console.log('Error', `${response.data}`);
    }
    // setLoad(false);
  };

  return {
    getAnnotations,
    subjectsData,
    updateAnn,
    deleteAnn,
    addNote,
    noteInput,
    updateNoteInput,
    load,
    setLoad,
  };
};

export default getNotesStore;
