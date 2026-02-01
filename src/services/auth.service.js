import { getUserByUsername } from '../repository/userRepository.js';


export function validatePasswordStrength(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (password.length < minLength) {
    return { 
      isValid: false, 
      message: `Password must be at least ${minLength} characters long` 
    };
  }

  if (!hasUppercase) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one uppercase letter' 
    };
  }

  if (!hasLowercase) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one lowercase letter' 
    };
  }

  if (!hasNumber) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one number' 
    };
  }

  if (!hasSpecialChar) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one special character' 
    };
  }

  return { isValid: true, message: 'Password is strong' };
}

export async function login(username, password) {
  try {
    if (!username || !password) {
      return { 
        success: false, 
        message: 'Username and password are required' 
      };
    }

    const user = await getUserByUsername(username);

    if (!user) {
      return { 
        success: false, 
        message: 'Invalid username or password' 
      };
    }

    if (user.password !== password) {
      return { 
        success: false, 
        message: 'Invalid username or password' 
      };
    }

    const { password: _, ...userWithoutPassword } = user;

    return { 
      success: true, 
      user: userWithoutPassword, 
      message: 'Login successful' 
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      message: 'An error occurred during login' 
    };
  }
}

