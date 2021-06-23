export const sample_subjects = [
  {
    id: 0,
    name: 'Business Math',
    cover: 'https://i.redd.it/b3esnz5ra34y.jpg',
  },
  {
    id: 1,
    name: 'Accounts',
    cover: 'https://i.redd.it/b3esnz5ra34y.jpg',
  },
  {
    id: 2,
    name: 'English grammer',
    cover: 'https://i.redd.it/b3esnz5ra34y.jpg',
  },
];

export const sample_FAQs = [
  {
    id: 0,
    question: 'How to do this?',
    answer:
      'This is the answer for following question,This is the answer for following question,This is the answer for following question,This is the answer for following question,This is the answer for following question.',
    show: true,
  },
  {
    id: 1,
    question:
      'what should you do if this happened, or what should you do in case this happens?',
    answer: 'This is the answer for following question.',
    show: false,
  },
  {
    id: 2,
    question: 'How to do that?',
    answer: 'This is the answer for following question.',
    show: false,
  },
];

export const sample_notifications = [
  {
    id: 0,
    title: 'This is title',
    body:
      'This is body of notificaiton,This is body of notificaiton,This is body of notificaiton,This is body of notificaiton,This is body of notificaiton,This is body of notificaiton.',
  },
  {
    id: 1,
    title: 'This is title',
    body: 'This is body of notificaiton',
  },
  {
    id: 2,
    title: 'This is title',
    body: 'This is body of notificaiton',
  },
];

export const sample_papers = [
  {
    id: 0,
    name: 'Sample Paper 1',
    course: 'BTECH',
    semester: 1,
    year: 2018,
    assigned: 'professorid',
    assigned_date: '2 November 2020',
    submission_date: '10 December 2020',
    status: 'ASSIGNED',
  },
  {
    id: 1,
    name: 'Sample Paper 2',
    course: 'BTECH',
    semester: 1,
    year: 2020,
    assigned: 'professorid',
    assigned_date: '2 November 2020',
    submission_date: '10 December 2020',
    status: 'SOLVED',
    completion_date: '2 December 2020',
  },
  {
    id: 2,
    name: 'Sample Paper 3',
    course: 'BTECH',
    semester: 1,
    year: 2019,
    assigned: 'professorid',
    assigned_date: '2 November 2020',
    submission_date: '10 December 2020',
    status: 'ASSIGNED',
  },
];

export const courses_list = [
  {
    id: 0,
    name: 'BTECH',
  },
  {
    id: 1,
    name: 'BSC',
  },
  {
    id: 2,
    name: 'BCA',
  },
];

//*  Mr. / Mrs. / Dr. / Ms. / CA
export const salutations_list = [
  {
    id: 0,
    name: 'Mr.',
  },
  {
    id: 1,
    name: 'Mrs.',
  },
];

export const gender_list = [
  {
    id: 0,
    name: 'MALE',
  },
  {
    id: 1,
    name: 'FEMALE',
  },
];

export const registration_form = {
  salutation: {text: 'Mr.', active: false, error_message: ''},
  first_name: {text: '', active: false, error_message: ''},
  last_name: {text: '', active: false, error_message: ''},
  display_name: {text: '', active: false, error_message: ''},
  gender: {text: 'sex', active: false, error_message: ''},
  dob: {text: 'Date Of Birth', active: false, error_message: ''},
  email: {text: '', active: false, error_message: ''},
  contact: {text: '', active: false, error_message: ''},
  course: {text: '', active: false, error_message: ''},
  semester: {text: '', active: false, error_message: ''},
  college: {text: '', active: false, error_message: ''},
  university: {text: '', active: false, error_message: ''},
  password: {text: '', active: false, error_message: '', show: false},
  password_again: {text: '', active: false, error_message: '', show: false},
};

// * Package name - Trial or Paid
// * Expiration Time ( fake it now) - Months-days
// * Start date of subscription
// * Paper_Products for that subscription
// * Semesters (can be array or single string)
// * created_at - new Date.now()
// Math.round(new Date().getTime() / 1000) + 150 * 24 * 60 * 60,
export const subscription_data = {
  package: 'Trial',
  expiration_time: new Date(),
  paper_products: [
    'Sample Paper 1',
    'Sample Paper 2',
    'Sample Paper 2',
    'Sample Paper 3',
  ],
  semester: [4],
  created_at: new Date(Date.now()).toUTCString(),
};

export const IOSSizes = [
  {
    width: 320,
    height: 568,
    model: 'iPod touch (7th generation)',
    udid: '92E78049-FE42-41DA-B59B-F20061544770',
  },
  {
    width: 375,
    height: 667,
    model: 'iPhone SE (2nd generation)',
    udid: 'E15BFD25-1A8B-4C4D-816C-444E6AA7257A',
  },
  {
    width: 375,
    height: 667,
    model: 'iPhone 8',
    udid: '75EDE049-D3B0-48D7-AC3D-449A3E7F66B0',
  },
  {
    width: 414,
    height: 736,
    model: 'iPhone 8 Plus',
    udid: '6070F910-B9F6-48D2-A672-4D165DC02092',
  },
  {
    width: 375,
    height: 812,
    model: 'iPhone 12 mini',
    udid: 'B93C3DFF-34DF-4C9B-818B-6977F365F168',
  },
  {
    width: 390,
    height: 844,
    model: 'iPhone 12 Pro',
    udid: '22D53E1D-94C3-4EC1-BEE8-87AC81337C22',
  },
  {
    width: 428,
    height: 926,
    model: 'iPhone 12 Pro Max',
    udid: '3EA9E8BA-AC17-4E08-858F-D4A738B09A8C',
  },
  {
    width: 390,
    height: 844,
    model: 'iPhone 12',
    udid: '00F4191C-A161-4CAB-B8D1-3AED1E192350',
  },
  {
    width: 414,
    height: 896,
    model: 'iPhone 11',
    udid: '5B125FDC-8F1D-4009-8ADA-19D15B5CBC8D',
  },
  {
    width: 375,
    height: 812,
    model: 'iPhone 11 Pro',
    udid: 'B58381FA-3567-4DE6-8556-CD2E30793026',
  },
  {
    width: 414,
    height: 896,
    model: 'iPhone 11 Pro Max',
    udid: 'BE031225-6FF4-4970-8416-5A5971922685',
  },
  {
    width: 768,
    height: 1024,
    model: 'iPad Pro (9.7-inch)',
    udid: 'F2824A45-0A5D-4569-9518-9B79775925AF',
    tab: true,
  },
  {
    width: 1024,
    height: 1366,
    model: 'iPad Pro (12.9-inch)',
    udid: '2699E7CD-2FD3-42C4-8A82-D40513DDA699',
    tab: true,
  },
  {
    width: 834,
    height: 1194,
    model: 'iPad Pro (11-inch)',
    udid: '6F946B3F-9A72-4F9B-B311-5D37A9F07724',
    tab: true,
  },
  {
    width: 820,
    height: 1100,
    model: 'iPad Air (4th generation)',
    udid: '286AA37D-0EDA-49C6-8562-488BCCD6A212',
    tab: true,
  },
  {
    width: 810,
    height: 1080,
    model: 'iPad (8th generation)',
    udid: 'C284B44F-D138-4278-B633-476B741368AC',
    tab: true,
  },
];

export let SECTIONED_DATA = [
  {
    heading: 'Today',
    data: [
      {
        cover:
          'https://cdn.eduncle.com/webfiles/1/promo/promo_images/540x304/_IH3od(CUL.jpg',
        body:
          'Function to execute on press. If not set, will cause the touchable to be disabled.',
        title: 'Content of the TouchableRipple - 1',
      },
      {
        cover:
          'https://cdn.eduncle.com/webfiles/1/promo/promo_images/540x304/_IH3od(CUL.jpg',
        body:
          'Function to execute on press. If not set, will cause the touchable to be disabled.',
        title: 'Content of the TouchableRipple - 2',
      },
      {
        cover:
          'https://cdn.eduncle.com/webfiles/1/promo/promo_images/540x304/_IH3od(CUL.jpg',
        body:
          'Function to execute on press. If not set, will cause the touchable to be disabled.',
        title: 'Content of the TouchableRipple - 2',
      },
      {
        cover:
          'https://cdn.eduncle.com/webfiles/1/promo/promo_images/540x304/_IH3od(CUL.jpg',
        body:
          'Function to execute on press. If not set, will cause the touchable to be disabled.',
        title: 'Content of the TouchableRipple - 2',
      },
    ],
  },
  {
    heading: 'Yesterday',
    data: [
      {
        cover:
          'https://cdn.eduncle.com/webfiles/1/promo/promo_images/540x304/_IH3od(CUL.jpg',
        body:
          'Function to execute on press. If not set, will cause the touchable to be disabled.',
        title: 'Content of the TouchableRipple - 1',
      },
      {
        cover:
          'https://cdn.eduncle.com/webfiles/1/promo/promo_images/540x304/_IH3od(CUL.jpg',
        body:
          'Function to execute on press. If not set, will cause the touchable to be disabled.',
        title: 'Content of the TouchableRipple - 2',
      },
      {
        cover:
          'https://cdn.eduncle.com/webfiles/1/promo/promo_images/540x304/_IH3od(CUL.jpg',
        body:
          'Function to execute on press. If not set, will cause the touchable to be disabled.',
        title: 'Content of the TouchableRipple - 2',
      },
      {
        cover:
          'https://cdn.eduncle.com/webfiles/1/promo/promo_images/540x304/_IH3od(CUL.jpg',
        body:
          'Function to execute on press. If not set, will cause the touchable to be disabled.',
        title: 'Content of the TouchableRipple - 2',
      },
      {
        cover:
          'https://cdn.eduncle.com/webfiles/1/promo/promo_images/540x304/_IH3od(CUL.jpg',
        body:
          'Function to execute on press. If not set, will cause the touchable to be disabled.',
        title: 'Content of the TouchableRipple - 2',
      },
    ],
  },
];

export const QUESTION_DATA = [
  {
    note: 'Very Important question occured 5 times in 4 exams',
    solution: 'this is the correct solution',
    question: 'Choose correct answer from the following options : ',
    options: [
      {
        option: 'wrong option 1',
        correct: false,
        type: 'TEXT',
      },
      {
        option: 'wrong option 2',
        correct: false,
        type: 'TEXT',
      },
      {
        option: 'wrong option 3',
        correct: false,
        type: 'TEXT',
      },
      {
        option: 'correct option',
        correct: true,
        type: 'TEXT',
      },
    ],
  },
  {
    solution: 'this is the correct solution',
    bookmark: true,
    question: 'Choose correct answer from the following options : ',
    options: [
      {
        option: 'wrong option 1',
        correct: false,
        type: 'TEXT',
      },
      {
        option: 'wrong option 2',
        correct: false,
        type: 'TEXT',
      },
      {
        option: 'wrong option 3',
        correct: false,
        type: 'TEXT',
      },
      {
        option: 'correct option',
        correct: true,
        type: 'TEXT',
      },
    ],
  },
];

export const TEST_DATA = [
  {
    id: 1,
    name: 'Bihar State Cooperative Bank Mini Mock',
    created_at: Date.now(),
    questions: [
      {
        id: 1,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 1,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 1,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 1,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 1,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 1,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 1,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
    ],
    expiration: Date.now(),
    duration: 120, //in minutes
    total_marks: 75,
    attempts: 3213,
    type: 'QUIZ', // MOCK | PRACTICE | QUIZ
  },
  {
    id: 2,
    name: 'Bihar State Cooperative Bank Mini Mock',
    created_at: Date.now(),
    questions: [
      {
        id: 1,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 2,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 3,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 4,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 5,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 6,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
      {
        id: 7,
        question: 'question',
        options: [
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: false},
          {option: 'option', type: 'TEXT', correct: true},
        ],
      },
    ],
    expiration: Date.now(),
    duration: 120, //in minutes
    total_marks: 75,
    attempts: 3213,
    type: 'QUIZ', // MOCK | PRACTICE | QUIZ
  },
];
let resouces_data = [
  {
    id: 1,
    title: 'Daily Quizzes',
    route: 'DailyQuiz',
  },
  {
    id: 2,
    title: 'Daily Lectures',
    route: 'DailyLecture',
  },
  {
    id: 3,
    title: 'Daily Words',
    route: 'DailyVocab',
  },
  {
    id: 4,
    title: 'Previous Year Papers',
    route: 'PreviousPapers',
  },
  {
    id: 5,
    title: 'Bookmarks',
    route: 'Bookmarks',
  },
  {
    id: 5,
    title: 'Doubts',
    route: 'Doubts',
  },
];

export const CONTENT_LIST_DATA = [
  {
    id: 1,
    title: 'English Noun',
  },
  {
    id: 2,
    title: 'English Noun',
  },
  {
    id: 3,
    title: 'English Noun',
  },
  {
    id: 4,
    title: 'English Noun',
  },
  {
    id: 5,
    title: 'English Noun',
  },
];

export const GRADIENT_SET = [
  {
    id: 1,
    first: '#fdc830',
    second: '#f37335',
    title: '2 Mock Tests @ Rs. 6 ',
  },
  {
    id: 2,
    first: '#fdc830',
    second: '#f37335',
    title: '3 Mock Tests @ Rs. 9 ',
  },
  {
    id: 2,
    first: '#fdc830',
    second: '#f37335',
    title: '5 Mock Tests @ Rs. 13 ',
  },
  {
    id: 2,
    first: '#fdc830',
    second: '#f37335',
    title: 'Unlimited Mock Tests @ Rs. 150 ',
  },
];

export const TRANSACTION_SET = [
  {
    id: 1,
    method: 'CREDIT',
    amount: 50,
    name: 'Wallet Recharge',
    created_at: Date.now(),
  },
  {
    id: 2,
    method: 'DEBIT',
    amount: 10,
    name: 'Paid For English Video Lecture',
    created_at: Date.now(),
  },
  {
    id: 3,
    method: 'CREDIT',
    amount: 15,
    name: 'Wallet Recharge',
    created_at: Date.now(),
  },
  {
    id: 4,
    method: 'DEBIT',
    amount: 20,
    name: 'For Subject Wise Mock test',
    created_at: Date.now(),
  },
  {
    id: 5,
    method: 'CREDIT',
    amount: 50,
    name: 'Wallet Recharge',
    created_at: Date.now(),
  },
  {
    id: 6,
    method: 'DEBIT',
    amount: 10,
    name: 'Paid For English Video Lecture',
    created_at: Date.now(),
  },
  {
    id: 7,
    method: 'CREDIT',
    amount: 15,
    name: 'Wallet Recharge',
    created_at: Date.now(),
  },
  {
    id: 8,
    method: 'DEBIT',
    amount: 20,
    name: 'For Subject Wise Mock test',
    created_at: Date.now(),
  },
];

export const ACCOUNT_LIST = [
  {
    id: 1,
    name: 'Your Profile',
    route: 'Profile',
    icon: 'md-star',
    first: true,
  },
  {
    id: 2,
    name: 'Your Orders',
    route: 'Orders',
    icon: 'md-star',
  },
  {
    id: 3,
    name: 'PrepCoin',
    route: 'Wallet',
    icon: 'md-logo-bitcoin',
  },
  {
    id: 4,
    name: 'Your Reports',
    route: 'MyResults',
    icon: 'md-star',
  },
  {
    id: 5,
    name: 'Help & Support',
    route: 'Support',
    icon: 'md-star',
  },
  {
    id: 6,
    name: 'Refer & Earn',
    route: 'Refer',
    icon: 'md-star',
  },
  {
    id: 7,
    name: 'Rate Us',
    icon: 'md-star',
  },
  {
    id: 8,
    name: 'Logout',
    icon: 'md-star',
    last: true,
  },
];

export const ORDER_DATA = [
  {
    id: 1,
    type: 'SINGLE',
    ide: '3123bufrg387rg239eew',
    productName: 'Mock Tests',
    category: 'Banking',
    quantity: 2,
    expiration: Date.now(),
    final_amount: 30,
    discount: 0,
    transactionId: 'dsaf98fh304fnodfn32',
    created_at: Date.now(),
  },
  {
    id: 2,
    type: 'COMBO',
    ide: '3123bufrg387rg239eew',
    productName: 'Video Lecture Combo',
    category: 'Banking',
    subject: 'English',
    quantity: 2,
    expiration: Date.now(),
    final_amount: 55,
    discount: 0,
    transactionId: 'dsaf98fh304fnodfn32',
    created_at: Date.now(),
  },
  {
    id: 3,
    type: 'SINGLE',
    ide: '3123bufrg387rg239eew',
    productName: 'Mock Tests',
    category: 'IELTS',
    quantity: 5,
    expiration: Date.now(),
    final_amount: 20,
    discount: 0,
    transactionId: 'dsaf98fh304fnodfn32',
    created_at: Date.now(),
  },
];

export const RESULT_DATA = [{
  id:1,
  
}]