export const userQuery = (userId)=>{
                // lay ra user(document as *) voi bang la user va id cua user do phai match
    const query = `*[_type=="user" && _id=="${userId}"]`

    return query
}