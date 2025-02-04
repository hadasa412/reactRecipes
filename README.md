# my-react-project


עשיתי כמה שינויים בשרת הנה הפירוט:


1.
אבטחת סיסמאות
import bcrypt from 'bcrypt';

// הצפנת סיסמה בעת רישום
const hashedPassword = await bcrypt.hash(password, 10);

// אימות סיסמה בעת התחברות
const isMatch = await bcrypt.compare(password, user.password);

2.
ולידציה של קלט המשתמש
if (!email || !password || !firstName || !lastName || !address || !phone) {
    return res.status(400).json({ message: "All fields are required" });
}

3.
שמירה על פרטיות המשתמש
const { password: _, ...userWithoutPassword } = user;
res.json({ message: "Login successful", user: userWithoutPassword });

