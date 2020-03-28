'use strict';

const Controller = require('egg').Controller;
 

const user = {
  id: 1,
  email: 'deeprado@126.com',
  password: '123456',
  access_token: 'aaaaa',
};

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
  }
  async isLogined() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'isLogined',
      data: {
        user: null,
        settings: null,
      },
    };
  }
  async register() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
    };
  }
  async login() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        ...user,
      },
    };
  }
  async resetPassword() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'logout',
    };
  }

  async users() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'users',
      data: [],
    };
  }

  async account_types() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'account_types',
      data: [
        {
          id: 1,
          name: '工作',
        },
        {
          id: 2,
          name: '家庭',
        },
      ],
    };
  }

  async categories() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'categories',
      data: [
        {
          id: 1,
          name: '工作',
        },
        {
          id: 2,
          name: '副业',
        },
      ],
    };
  }

  async transfer() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'transfer',
      data: [],
    };
  }

  async occurrence() {
    const { ctx } = this;
    let id = ctx.params.id;
    ctx.body = {
      code: 0,
      msg: 'occurrence',
      data: [],
    };
  }

  async occurrences() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'occurrences',
      data: [
        {
          id: 1,
          date: '20200102',
          description: 'aaaa',
          category: {
            name: 'aaaa',
          },
          type: {
            name: 'Recipe',
          },
        },
        {
          id: 2,
          date: '20200102',
          description: 'aaaa',
          category: {
            name: 'aaaa',
          },
          type: {
            name: 'Recipe',
          },
        },
        {
          id: 3,
          date: '20200103',
          description: 'aaaa',
          category: {
            name: 'aaaa',
          },
          type: {
            name: 'Recipe',
          },
        },
        {
          id: 4,
          date: '20200103',
          description: 'aaaa',
          category: {
            name: 'aaaa',
          },
          type: {
            name: 'Receita',
          },
        },
        {
          id: 5,
          date: '20200104',
          description: 'aaaa',
          category: {
            name: 'aaaa',
          },
          type: {
            name: 'Receita',
          },
        },
        {
          id: 6,
          date: '20200103',
          description: 'aaaa',
          category: {
            name: 'aaaa',
          },
          type: {
            name: 'Receita',
          },
        },
      ],
    };
  }

  async dashboard() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'dashboard',
      data: {
        total: 200,
      },
    };
  }

  async types() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'types',
      data: [
        {
          id: 1,
          name: 'Despesa',
        },
        {
          id: 2,
          name: 'Receita',
        },
      ],
    };
  }

  async accounts() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'accounts',
      data: [
        {
          id: 1,
          name: '电话费',
          amount: 20,
        },
        {
          id: 2,
          name: '水电',
          amount: 30,
        },
        {
          id: 3,
          name: '交通',
          amount: 40,
        },
      ],
    };
  }

}

module.exports = UserController;
