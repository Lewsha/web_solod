const SERVER_URL = 'http://localhost:4001';

async function get(url: string) {
  return await fetch(SERVER_URL + url, {
  }).then(answer => {
    check_auth(answer);
    console.log(answer.body);
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
    body: JSON.stringify(obj),
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
  }).then(answer => {
    check_auth(answer);
    return answer;
  });
}

function post_auth(login: string, password: string) {
  const url = `${SERVER_URL}/auth`;
  const obj = {'login': login, 'password': password};
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(obj)
  });
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
  'card number': string;
  'date': string;
  'cvc': string;
  'sum': number;
  'comment': string;
  'email': string;
  'safe': boolean;
  'id': string;

  constructor(card: string, date: string, cvc: string, sum: number, comment: string, email: string) {
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
  'from': string;
  'bik': string;
  'bill number': string;
  'purpose': number;
  'telephone': string;
  'email': string;
  'safe': boolean;

  constructor(from: string, bik: string, bill_num: string, purpose: number, telephone: string,
              email: string) {
    this.from = from;
    this.bik = bik;
    this['bill number'] = bill_num;
    this.purpose = purpose;
    this.telephone = telephone;
    this.email = email;
    this.safe = true;
  }
}

export class AnyBankQuery {
  'from': string;
  'bik': string;
  'bill_num': string;
  'sum': string;
  'purpose': string;

  constructor(from: string, bik: string, bill_num: string, sum: string, purpose: string) {
    this.from = from;
    this.bik = bik;
    this.bill_num = bill_num;
    this.sum = sum;
    this.purpose = purpose;
  }
}

let authorized = false;

function check_auth(response) {
  if (response.status === 401) {
    authorized = false;
  }
}

export default {
  authorize: async (login: string, password: string, onSuccess, onFailed = () => {}) => {
    post_auth(login, password).then(response => {
      if (response.status === 200) {
        authorized = true;
        onSuccess();
      } else {
        authorized = false;
        onFailed();
      }
    }).catch(error => console.log(error));
  },

  sign_out: async () => {
    authorized = false;
  },

  is_authorized: () => {
    return authorized;
  },

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
