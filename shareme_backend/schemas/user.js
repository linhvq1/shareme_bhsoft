// tao ra 1 bang voi ten la user 
// truong tilte la ten xuat hien
// kieu la document
// ben trong co 2 truong la user name kieu string
// va truong thu 2 la truong image kieu cung la string
// no se duoc hien thi tren giao dien rat ro rang luon

export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'userNamne',
            title: 'UserName',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'string'
        }
    ]
}