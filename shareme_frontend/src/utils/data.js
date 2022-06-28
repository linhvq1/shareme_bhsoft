export const userQuery = (userId)=>{
                // lay ra user(document as *) voi bang la user va id cua user do phai match
    const query = `*[_type=="user" && _id=="${userId}"]`

    return query
}

export const searchQuery = (searchTerm)=>{ 
    const query = `*[_type=="pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*'] {
        image{
            asset ->{
                url
            }
        },
        _id,
        destination,
        postedBy ->{
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy ->{
                _id,
                userName,
                image
            },
        },
    }`

    return query
}

export const feedQuery = `*[_type=="pin"] | order(_createAt desc){
    image{
        asset ->{
            url
        }
    },
    _id,
    destination,
    postedBy ->{
        _id,
        userName,
        image
    },
    save[]{
        _key,
        postedBy ->{
            _id,
            userName,
            image
        },
    },
}`