import {useState} from 'react';

const getProfileStore = () => {
  const profile = {
    name: {key: 'Name', value: 'Naman Tayal'},
    dob: {key: 'Date of Birth', value: '26-05-2000'},
    university: {key: 'University', value: 'Delhi University'},
    college: {key: 'College', value: 'Hindu College'},
    course: {key: 'Course', value: 'MCA'},
    spz: {key: 'Specialization', value: 'Computer Application'},
    sem: {key: 'Semester', value: '5th'},
    email: {key: 'Email', value: 'abc@abc.com'},
    phone: {key: 'Phone', value: '9599671399'},
    old: {key: 'Old Password', value: ''},
    new: {key: 'New Password', value: ''},
  };

  const [profileData, setProfileData] = useState({...profile});
  return {profileData};
};

export default getProfileStore;
