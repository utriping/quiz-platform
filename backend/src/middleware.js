import jwt from 'jsonwebtoken';
import { query } from './db.js';
export async function auth(req,res,next){
 try { const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,''); if(!token) return res.status(401).json({message:'Authentication required'});
 const decoded=jwt.verify(token,process.env.JWT_SECRET); const {rows}=await query('SELECT id,name,email,role,status FROM users WHERE id=$1',[decoded.id]);
 if(!rows[0] || rows[0].status!=='ACTIVE') return res.status(401).json({message:'Account unavailable'}); req.user=rows[0]; next();
 } catch { return res.status(401).json({message:'Invalid or expired token'}); }
}
export const admin=(req,res,next)=>req.user?.role==='ADMIN'?next():res.status(403).json({message:'Admin access required'});
