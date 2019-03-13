const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onGet('/tickets').reply(200, {
  tickets: [
    {
      id: Math.random(),
      date: '16, FEB',
      startTime: '6.30',
      endTime: '8.45',
      price: '125',
      planeId: 1,
    },
    {
      id: Math.random(),
      date: '16, FEB',
      startTime: '13.35',
      endTime: '15.50',
      price: '150',
      planeId: 2,
    },
    {
      id: Math.random(),
      date: '16, FEB',
      startTime: '16.40',
      endTime: '18.55',
      price: '115',
      planeId: 3,
    },
  ],
});

mock.onPost('/search-request').reply(() => axios.get('/tickets'));

mock.onGet('/airports').reply(200, {
  airports: [{ name: 'Afghanistan' },
    { name: 'Albania' },
    { name: 'Algeria' },
    { name: 'American Samoa' },
    { name: 'Andorra' },
    { name: 'Angola' },
    { name: 'Anguilla' },
    { name: 'Antigua and Barbuda' },
    { name: 'Argentina' },
  ],
});

mock.onGet('/planes').reply(200, [
  {
    rows: 15,
    location: [1, 1, 1, 0, 1, 1, 1],
  },
  {
    rows: 15,
    location: [1, 1, 0, 1, 1, 0, 1, 1],
  },
  {
    rows: 15,
    location: [1, 0, 1, 1, 1, 0, 1],
  },
]);

export default axios;
