import axios from 'axios';

export default function getHostData(callback) {
  const phone_num = localStorage.getItem('phone');
  const name = localStorage.getItem('name');
  axios.get('/api/users', {}, { params: { phone_num } })
    .then(host => {
      // console.log('got host data', host);
      callback(host);
    })
    .catch(err => {
      callback({ name, phone_num });
    });
};