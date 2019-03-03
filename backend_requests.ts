const SERVER_URL = 'http://localhost:4001';

async function get(url: string) {
  return await fetch(SERVER_URL + url)
    .then(answer => {
      return answer.json();
    })
    .catch(error => {
      console.log(error);
    });
}

async function post(url: string, obj: Object) {
  return await fetch(`${SERVER_URL}${url}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(obj)
  });
}

async function patch(url_root: string, id: string, obj: Object) {
  const url = SERVER_URL + `${url_root}/${id}`;
  console.log(url, JSON.stringify(obj));
  return await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(obj)
  });
}

async function put(login: string, password: string){
  const url = `${SERVER_URL}/auth`;
  const obj = {"login": "login", "password": "password"};
  fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(obj)
  }).then(success => console.log(`success: ${success}`),
      error => console.log(`error: ${error}`));
}

function build_url(url_root: string, sort: string, sort_field: string, filter: string, filter_field: string) {
  let url = url_root;
  if ((sort && sort_field) || (filter_field && filter)) {
    url += '?';
    if (sort) url += `sort=${sort}&sortField=${sort_field}`;
    if (filter) url += (sort ? '&' : '') + `filter=${filter}&filterField=${filter_field}`;
  }
  return url;
}


export class Payment {
  /*
  payment format: {
      "card number": "1234 1234 1234 1234",
      "date": "",
      "cvc": "123",
      "sum": 7000,
      "comment": "My comment!",
      "email": "blabla@alibaba.com",
      "safe": true | false
  }
  */

  'card number': string;
  'date': string;
  'cvc': string;
  'sum': number;
  'comment': string;
  'email': string;
  'safe': boolean;
  'id': string;

  constructor(card: string, date: string, cvc: string, sum: number, comment: string, email: string){
    this['card number'] = card;
    this.date = date;
    this.cvc = cvc;
    this.sum = sum;
    this.comment = comment;
    this.email = email;
    this.safe = true;
  }
}


export class RequestedPayment {
  /*
  request_pay format: {
      "from": "ИНН или название платильщика",
      "bik": "BIK number",
      "bill number": "21321898",
      "purpose": 0 =~ "НДС 18%" | 1 =~ "НДС 10%" | 2 =~ "Без НДС",
      "telephone": "+7(912)834-23-21",
      "email": "blabla@alibaba.com",
      "safe": true | false
  }
  */

  'from': string;
  'bik': string;
  'bill number': string;
  'purpose': number;
  'telephone': string;
  'email': string;
  'safe': boolean;
}

export class AnyBankQuery {
  'from': string;
  'bik': string;
  'bill_num': string;
  'sum': string;
  'purpose': string;
}

let authorized = false;

export default {
  authorize: (login: string, password: string) => {
    // TODO
    // await put(login, password);
    authorized = true;
  },

  sign_out: async () => {
    authorized = false;
  },

  is_authorized: () => {return authorized},

  get_requested_payment: async (sort: string = undefined, sort_field: string = undefined,
                                filter: string = undefined, filter_field: string = undefined) => {
    return await get(build_url('/payment/requested', sort, sort_field, filter, filter_field))
      .catch(error => {
        console.log(error);
        return [];
      });
  },

  post_requested_payment: async (obj: RequestedPayment) => {
    return await post('/payment/requested', obj);
  },

  patch_requested_payment: async (obj: Payment) => {
    return await patch('/payment/requested', obj.id, obj);
  },

  get_payment: async (sort: string = undefined, sort_field: string = undefined,
                      filter: string = undefined, filter_field: string = undefined) => {
    return await get(build_url('/payment', sort, sort_field, filter, filter_field))
      .catch(error => {
        console.log(error);
        return [];
      });
  },

  post_payment: async (obj: Payment) => {
    return await post('/payment', obj);
  },

  patch_payment: async (obj: Payment) => {
    const id = `${obj.id}`;
    delete obj.id;
    return await patch('/payment', id, obj);
  },

  get_anyBank: async (obj: AnyBankQuery) => {
    return await fetch(`${SERVER_URL}/anybank`, {body: JSON.stringify(obj)});
  }
};
