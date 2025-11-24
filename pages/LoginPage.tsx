
import React, { useState, useEffect } from 'react';
import LandingPageTemplate from '../components/templates/LandingPageTemplate';
import PageTransition from '../components/atoms/PageTransition';
import FloatingNav from '../components/organisms/FloatingNav';
import { LockClosedIcon, UserPlusIcon, ArrowRightIcon, CommandLineIcon, UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Initialize DB
  useEffect(() => {
    authService.init();
    const user = authService.getCurrentUser();
    if (user) {
        if (user.role === 'Admin') navigate('/admin');
        else navigate('/dashboard');
    }
  }, [navigate]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Validar campos vacíos
    if (!email.trim() || !password.trim() || (!isLogin && (!name.trim() || !confirmPassword.trim()))) {
        setError('Por favor, complete todos los campos obligatorios.');
        return;
    }

    // 2. Validar formato de email
    if (!validateEmail(email)) {
        setError('El formato del correo electrónico no es válido.');
        return;
    }

    if (isLogin) {
        // --- LOGIN LOGIC ---
        const user = authService.login(email, password);
        if (user) {
            if (user.role === 'Admin') navigate('/admin');
            else navigate('/dashboard');
        } else {
            setError('Credenciales inválidas. Verifique su email y contraseña.');
        }
    } else {
        // --- REGISTER VALIDATIONS ---
        
        // 3. Validar longitud del nombre
        if (name.trim().length < 3) {
            setError('El nombre debe tener al menos 3 caracteres.');
            return;
        }

        // 4. Validar seguridad de contraseña
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // 5. Validar coincidencia de contraseñas
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // --- REGISTER LOGIC ---
        const user = authService.register(name, email, password);
        if (user) {
            navigate('/dashboard');
        } else {
            setError('Este correo electrónico ya está registrado.');
        }
    }
  };

  // Styles reused for consistency
  const inputClasses = "w-full px-4 py-3 rounded-none border-2 border-brand-black dark:border-brand-white bg-transparent focus:ring-0 outline-none transition-all duration-200 text-brand-black dark:text-brand-white placeholder-gray-400 font-bold focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] focus:bg-brand-white dark:focus:bg-brand-black";
  const labelClasses = "block text-xs font-black text-brand-black dark:text-brand-white mb-1 uppercase tracking-widest";

  const toggleMode = () => {
      setIsLogin(!isLogin);
      setError('');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
  };

  return (
    <LandingPageTemplate footer={null}>
      <FloatingNav />
      <PageTransition>
        <div className="min-h-screen flex flex-col justify-center items-center bg-brand-white dark:bg-brand-black p-6 relative overflow-hidden pt-24">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute inset-0 opacity-5 pointer-events-none dark:block hidden" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

          {/* Main Card Container */}
          <div className="w-full max-w-md relative z-10 animate-slide-up">
            
            {/* Header / Status Bar */}
            <div className="flex justify-between items-center mb-6">
                 <div className="inline-block px-3 py-1 bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black font-mono text-xs font-bold uppercase tracking-widest border-2 border-transparent">
                    {isLogin ? 'Secure Access' : 'New User Reg.'}
                 </div>
                 <div className="flex gap-1">
                    <div className="w-2 h-2 bg-google-green rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-brand-black/20 dark:bg-brand-white/20 rounded-full"></div>
                    <div className="w-2 h-2 bg-brand-black/20 dark:bg-brand-white/20 rounded-full"></div>
                 </div>
            </div>

            {/* Form Box */}
            <div 
                key={isLogin ? 'login' : 'register'} 
                className="bg-brand-white dark:bg-brand-black border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark p-8 animate-flip-in-x"
            >
                <div className="mb-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-2 border-brand-black dark:border-brand-white flex items-center justify-center rounded-full">
                        {isLogin ? <LockClosedIcon className="w-8 h-8" /> : <UserPlusIcon className="w-8 h-8" />}
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-brand-black dark:text-brand-white">
                        {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
                    </h1>
                    <p className="text-sm font-medium opacity-60 mt-2">
                        {isLogin ? 'Ingrese sus credenciales Denoise ID' : 'Únase a la red de inteligencia de datos'}
                    </p>
                    {error && (
                        <div className="mt-4 p-3 bg-google-red/10 border-2 border-google-red text-google-red text-xs font-black uppercase tracking-wide">
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    {!isLogin && (
                        <div className="animate-slide-up [animation-delay:100ms]">
                            <label className={labelClasses}>Nombre Completo</label>
                            <input 
                                type="text" 
                                className={inputClasses} 
                                placeholder="Ej: John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                    )}
                    
                    <div className="animate-slide-up [animation-delay:200ms]">
                        <label className={labelClasses}>Email Corporativo</label>
                        <input 
                            type="email" 
                            className={inputClasses} 
                            placeholder="admin@denoise.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div className="animate-slide-up [animation-delay:300ms]">
                        <label className={labelClasses}>Contraseña { !isLogin && <span className="opacity-50 lowercase ml-1">(min. 6 chars)</span> }</label>
                        <input 
                            type="password" 
                            className={inputClasses} 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {!isLogin && (
                        <div className="animate-slide-up [animation-delay:350ms]">
                            <label className={labelClasses}>Confirmar Contraseña</label>
                            <input 
                                type="password" 
                                className={inputClasses} 
                                placeholder="••••••••" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    )}

                    <button type="submit" className="w-full mt-4 bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black font-black py-4 border-2 border-transparent hover:border-brand-black dark:hover:border-brand-white hover:bg-brand-white hover:text-brand-black dark:hover:bg-brand-black dark:hover:text-brand-white transition-all shadow-hard dark:shadow-hard-dark hover:shadow-none hover:translate-y-1 active:translate-y-[2px] active:shadow-none uppercase tracking-wider flex items-center justify-center gap-2 group animate-slide-up [animation-delay:400ms]">
                        {isLogin ? 'Acceder' : 'Registrar'}
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </div>

            {/* Toggle Switch */}
            <div className="mt-8 text-center animate-slide-up [animation-delay:500ms]">
                <p className="text-sm font-bold opacity-60 mb-2">
                    {isLogin ? '¿No tienes acceso?' : '¿Ya tienes cuenta?'}
                </p>
                <button 
                    onClick={toggleMode}
                    className="inline-block border-b-2 border-brand-black dark:border-brand-white font-black uppercase tracking-widest hover:text-google-blue hover:border-google-blue transition-colors"
                >
                    {isLogin ? 'Solicitar Registro' : 'Iniciar Sesión'}
                </button>
            </div>

            {/* DEV TOOLS / QUICK ACCESS */}
            <div className="mt-12 pt-8 border-t-2 border-dashed border-brand-black/20 dark:border-brand-white/20 animate-slide-up [animation-delay:600ms]">
                <p className="text-[10px] font-mono uppercase text-center mb-4 opacity-50">— Developer Quick Access (Previews) —</p>
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => navigate('/admin')}
                        className="flex flex-col items-center justify-center p-4 border-2 border-brand-black dark:border-brand-white hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black transition-all active:scale-95"
                    >
                        <CommandLineIcon className="w-6 h-6 mb-2" />
                        <span className="text-xs font-black uppercase">Admin Panel</span>
                    </button>
                    <button 
                         onClick={() => navigate('/dashboard')}
                         className="flex flex-col items-center justify-center p-4 border-2 border-brand-black dark:border-brand-white hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black transition-all active:scale-95"
                    >
                        <UserIcon className="w-6 h-6 mb-2" />
                        <span className="text-xs font-black uppercase">Client Portal</span>
                    </button>
                </div>
            </div>

          </div>
        </div>
      </PageTransition>
    </LandingPageTemplate>
  );
};

export default LoginPage;
