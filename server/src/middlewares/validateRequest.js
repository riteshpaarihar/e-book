export const validateRegister = (req, res, next) => {
    const { firstName, lastName, username, email, password, mobileNumber } = req.body;

    if (!firstName || !lastName || !username || !email || !password || !mobileNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    next();
};