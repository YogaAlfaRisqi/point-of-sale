

class AuthService {
    async register(req, res) {
        // Logic for user registration
        // validate input
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser){
            throw new Error('User already exists');
        }

        // hash password
        const hashedPassword = await hashPassword(password)
       
        const userData = {
            email,
            password: hashedPassword,
            name,
            // other user details
        };

        const newUser = await userRepository.create(userData);

        // return user data
        return newUser;
    }

    static async login(req, res) {
        // Logic for user login
        // email, password check

        // generate jwt token
        // return token + user data
    }

    static async resetPassword(req, res) {
        // Logic for password reset
        // generate reset token
        // send email with reset link
        // return success message
    }  

    static async forgotEmailOrPassword(req, res) {
        // Logic for handling forgotten email or password
        // verify user identity
        // send email with instructions
        // return success message
    }
}

module.exports = AuthService;