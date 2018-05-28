const mongoose = require("mongoose");
var Schema = mongoose.Schema;
//用户表
const userSchema = new Schema({
    username: {
        type: String,
        index: 1
    },
    phone: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
    money: {
        type: Number,
        default: 0
    },
    roles: {
        type: Number,
        default: 0
    },
    library: {
        type: String,
        defalut: ''
    },
    tag: {
        type: Array,
        default: []
    }
}, {
    versionKey: false, //去掉版本锁 __v0
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    } //自动管理修改时间

})


//图书数据表
const bookSchema = new Schema({
    id: {
        type: Number,
        required: true,
        index: true
    },
    isbn13: {
        type: String,
        index: 1
    },
    isbn10: {
        type: String,
        index: 1
    },
    title: {
        type: String,
        index: 1,
        required: true
    },
    author: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    },
    images: {
        type: Object,
        default: {}
    },
    publisher: {
        type: String,
        default: ''
    },
    localtion: {
        type: String,
        default: ''
    },
    author_intro: {
        type: String,
        default: ''
    },
    summary: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    number: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        default: ''
    },
    tag: {
        type: Array,
        default: []
    },
    library: {
        type: String,
        default: ''
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    } //自动管理修改时间
})

//待借图书信息表
const waitBookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userObj',
        required: true,
        index: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'bookObj',
        required: true,
        index: true
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    } //自动管理修改时间
})

//正在阅读图书信息表
const duringBookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userObj',
        required: true,
        index: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'bookObj',
        required: true,
        index: true
    },
    borrowTime: {
        type: Date,
        defalut: Date.now
    },
    renewTime: {
        type: Date,
        default: Date.now
    },
    expirationTime: {
        type: Date,
        default: ''
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    } //自动管理修改时间
})

//完成借阅图书信息表
const completeBookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userObj',
        required: true,
        index: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'bookObj',
        required: true,
        index: true
    },
    borrowTime: {
        type: Date,
        default: ''
    },
    renewTime: {
        type: Date,
        default: ''
    },
    expirationTime: {
        type: Date,
        default: ''
    },
    completeTime: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    } //自动管理修改时间
})
const userObj = mongoose.model('userObj', userSchema);
const bookObj = mongoose.model('bookObj', bookSchema);
const waitBook = mongoose.model('waitBook', waitBookSchema);
const duringBook = mongoose.model('duringBook', duringBookSchema);
const completeBook = mongoose.model('completeBook', completeBookSchema);
module.exports = {
    userObj,
    bookObj,
    waitBook,
    duringBook,
    completeBook
}