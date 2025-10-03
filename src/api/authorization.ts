import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface SessionPayload {
    email: string;
    name?: string;
    role?: 'user' | 'admin';
    sub: string; 
  }
  
  export const authenticateUserFromCookie = (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies['next-auth.session-token'];

      if (!token) return res.status(401).json({ message: 'No session token' });
  
      try {
          // decode JWT (NextAuth stores session as JWT if configured)
          const secret = process.env.NEXTAUTH_SECRET as string;
      
          const payload = jwt.verify(token, secret) as SessionPayload;
     

          (req as any).user = {
              id: payload.sub,
              email: payload.email,
              role: payload.role || 'user'
          };
  
          next();
      } catch (err) {
          return res.status(403).json({ message: 'Invalid session token' });
      }
  };

  export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
        }

        next();
    };
};
