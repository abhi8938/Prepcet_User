const Handler = {
  onPress: (
    cfi: any,
    position: any,
    rendition: any,
    toggleBars: () => void,
  ) => {
    toggleBars();
  },

  onLongPress: (cfi: any, rendition: any) => {},

  onDblPress: (cfi: any, position: any, imgSrc: any, rendition: any) => {},

  onViewAdded: (index: any) => {},

  beforeViewRemoved: (index: any) => {},

  onSelected: (
    cfiRange: any,
    setSelected: any,
    book: any,
    handleConfig: any,
  ) => {
    handleConfig('selectActive', 'none');

    return book.getRange(cfiRange).then(function (range: any) {
      setSelected({
        epubcfi: cfiRange,
        data: range.endContainer.data,
      });
    });
  },

  onMarkClicked: (cfiRange: any, data: any, book: any, setSelected: any) => {
    return book.getRange(cfiRange).then(function (range: any) {
      setSelected({
        epubcfi: cfiRange,
        data: range.endContaitner.data,
      });
    });
  },

  onReady: (book: any, handleBook: (key: string, value: any) => void) => {
    handleBook('book', book);
  },

  onError: (message: any) => {},
};

const Handlers = () => {
  return Handler;
};

export default Handlers;
