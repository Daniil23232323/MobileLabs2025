export type UserType = {
    email: string;
    lastName: string;
    firstName: string;
};

export type FormDataType = UserType & {
    password: string;
    confirmPassword: string;
};
