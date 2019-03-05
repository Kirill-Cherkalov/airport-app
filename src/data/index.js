const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);

mock.onGet('/tickets').reply(200, {
  tickets: [
    {
      id: Math.random(),
      date: '16, FEB',
      startTime: '19.40',
      endTime: '22.30',
      price: '158'
    },
    {
      id: Math.random(),
      date: '16, FEB',
      startTime: '13.35',
      endTime: '17.40',
      price: '134'
    },
    {
      id: Math.random(),
      date: '16, FEB',
      startTime: '13.35',
      endTime: '17.40',
      price: '134'
    }
  ]
});

mock.onPost('/search-request').reply(function(config) {
  return axios.get('/tickets')
});

mock.onGet('/airports').reply(200, {
  airports: [{name: 'Afghanistan'},
             {name: 'Albania'},
             {name: 'Algeria'},
             {name: 'American Samoa'},
             {name: 'Andorra'},
             {name: 'Angola'},
             {name: 'Anguilla'},
             {name: 'Antigua and Barbuda'},
             {name: 'Argentina'}
            ]
});

export default axios;