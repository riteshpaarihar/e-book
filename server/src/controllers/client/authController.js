import { loginUser, registerUser } from "../../services/client/authService.js";

export const register = async(req, res) => {
    try {
        const user = await registerUser({
            ...req.body,
            profileImageBuffer: req.file ? req.file.buffer : null,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async(req, res) => {
    try {
        const { user, token } = await loginUser(req.body);

        // Set HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token,
        });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};


// export const login = async(req, res) => {
//     try {
//         const { user, token } = await loginUser(req.body);

//         // Set HTTP-only cookie
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "Lax",
//             maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//         });

//         res.status(200).json({ success: true, message: "Login successful", user });
//     } catch (error) {
//         res.status(401).json({ success: false, message: error.message });
//     }
// };

// In your authController.js
export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
};