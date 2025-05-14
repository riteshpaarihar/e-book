import User from "../../models/userSchema.js";


export const createUser = async(userData) => {
    return await User.create(userData);
};

export const findUserByEmail = async(email) => {
    return await User.findOne({ email });
};

export const findUserByUsername = async(username) => {
    return await User.findOne({ username });
};

export const findUserByMobile = async(mobileNumber) => {
    return await User.findOne({ mobileNumber });
};


export const findUserByIdentifier = async(identifier) => {
    return await User.findOne({
        $or: [
            { email: identifier },
            { username: identifier },
            { mobileNumber: identifier },
        ],
    }).select("+password");
};