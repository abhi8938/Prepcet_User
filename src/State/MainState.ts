import {useDispatcher, useGlobalState} from './GlobalState';
import {useEffect, useState} from 'react';

import Services from '../Services/services';

const service = new Services();
const useMainState = () => {
  //* STATE
  const globalState: any = useGlobalState();
  const dispatcher: any = useDispatcher();
  const [load, setLoad] = useState(true);

  const [searchResults, setSearchResults] = useState({
    highlights: [
      {
        type: 'HIGHLIGHT',
        pageCfi: '31edenwih492',
        location: {offsetX: 200, offsetY: 345},
        epubCfi: 'epubcfi',
        color: '#ccc',
        text: 'lorem ipdsajndandda sdasdasodsa dsadasdad',
        pageNumber: 45,
        note: '',
      },
      {
        type: 'HIGHLIGHT',
        pageCfi: '31edenwih492',
        location: {offsetX: 200, offsetY: 345},
        epubCfi: 'epubcfi',
        color: '#ccc',
        text: 'lorem ipdsajndandda',
        pageNumber: 45,
        note: '',
      },
    ],
    bookResults: [
      {
        id: 0,
        pageCfi: '31edenwih492',
        epubCfi: 'epubcfi',
        text: 'lorem ipdsajndandda sdasdasodsa dsadasdad',
        pageNumber: 45,
      },
      {
        id: 1,
        pageCfi: '31edenwih492',
        epubCfi: 'epubcfi',
        text: 'lorem ipdsajndandda sdasdasodsa dsadasdad',
        pageNumber: 45,
      },
    ],
  });

  const Search = (value: string) => {
    console.log('Search');
    // for (let i = 0; i < papers.length; i++) {
    //   for (let j = 0; j < papers[i].ann.length; j++) {
    //     let text = papers[i].ann[j].text;
    //     let words = text.split(' ');
    //     words = words.filter((x) => x.toLowerCase() == value.toLowerCase());
    //     if (words.length > 0) {
    //       let data = {...searchResults};
    //       let highlights = data.highlights;
    //       highlights.push(papers[i].ann[j]);
    //       data.highlights = highlights;
    //       setSearchResults(data);
    //     }
    //   }
    // }
  };

  const getBroadcast = async (key: string, value: any) => {
    const response = await service.get_broadcast();
    if (response.status === 200) {
      dispatcher({type: 'SET-BROADCAST', payload: response.data});
    } else {
      console.log('Error-Broadcast', `${response.data}`);
    }
  };
  const dismissBroadcast = () => {
    dispatcher({type: 'SET-BROADCAST', payload: {}});
  };

  //*TRIGGER FUNCTIONS

  return {
    getBroadcast,
    dismissBroadcast,
    load,
    setLoad,
    Search,
    searchResults,
  };
};

export default useMainState;
