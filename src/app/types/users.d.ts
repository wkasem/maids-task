type PaginatedHttpResponse = {
     page: number
     per_page: number
     total: number
     total_pages: number
     data: any[]
};

type UsersHttpResponse = PaginatedHttpResponse & {
     
     data: User[]
};

type UserHttpResponse = {
     data: User
}

type User = {
     id: Number,
     email: String,
     first_name: String,
     last_name: String,
     avatar: String
}