import { createUser, findUserByEmail, findUserByUsername, findUserByMobile, findUserByIdentifier } from "../../repositories/client/userRepository.js";
import cloudinary from "../../config/cloudinaryConfig.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
                folder: "vlogging_users",
                resource_type: "image",
                width: 300,
                crop: "scale",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

export const registerUser = async(userData) => {
    const { email, username, mobileNumber, profileImageBuffer } = userData;

    // 📧 Check if email already exists in DB
    const existingEmail = await findUserByEmail(email);
    if (existingEmail) throw new Error("Email already exists");

    // 🔠 Check if username already exists
    const existingUsername = await findUserByUsername(username);
    if (existingUsername) throw new Error("Username already exists");

    // 📱 Check if mobile number already exists
    if (mobileNumber) {
        const existingMobile = await findUserByMobile(mobileNumber);
        if (existingMobile) throw new Error("Mobile number already exists");
    }

    let cloudinaryUrl = "";

    // 📤 Upload profile image to Cloudinary if buffer is provided
    if (profileImageBuffer) {
        cloudinaryUrl = await streamUpload(profileImageBuffer);
    }

    // 👤 Create user in DB with uploaded image URL
    const user = await createUser({
        ...userData,
        profileImage: cloudinaryUrl,
    });

    // ✅ Return essential user details
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: user.role,
        mobileNumber: user.mobileNumber,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};



export const loginUser = async(loginData) => {
    const { identifier, password } = loginData;
    const user = await findUserByIdentifier(identifier);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateToken(user._id);
    const { password: _, ...userData } = user.toObject();

    return { user: userData, token };
};