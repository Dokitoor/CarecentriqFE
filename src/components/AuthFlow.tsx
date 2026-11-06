import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { toast } from '../lib/toast';

const loginBanner = '/login-banner.gif';
const loginBannerPng = '/login-banner.png';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  User,
  Mail,
  Lock,
  Key,
  Eye,
  EyeOff,
  Building,
  HeartPulse,
  FileCheck2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Zap,
  Clock,
  Fingerprint,
} from 'lucide-react';

interface AuthFlowProps {
  onComplete: (userData: { name: string; email: string; agency: string; role: string }) => void;
  initialReason?: string | null;
}

export const AuthFlow: React.FC<AuthFlowProps> = ({ onComplete, initialReason }) => {
  // Start on the Figma login screen as requested
  const [mode, setMode] = useState<'signup' | 'login'>('login');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Signup Form State
  const [fullName, setFullName] = useState('Reuben Stewart');
  const [email, setEmail] = useState('reuben.stewart@highpointe.org');
  const [password, setPassword] = useState('CareCentriq@2026!');
  const [role, setRole] = useState<'admin' | 'supervisor' | 'dsp' | 'manager'>('admin');

  // Step 2 State
  const [agencyName, setAgencyName] = useState('Highpointe Healthcare Systems');
  const [primaryService, setPrimaryService] = useState('532');
  const [agencySize, setAgencySize] = useState('26-100');
  const [jurisdiction, setJurisdiction] = useState('California Regional Center (Title 22)');

  // Step 3 State: Modules
  const [enabledModules, setEnabledModules] = useState<Record<string, boolean>>({
    notes: true,
    isp: true,
    calendar: true,
    drills: true,
    binders: true,
  });

  // Password strength checker (lightweight, visual)
  const getPasswordStrength = () => {
    if (!password) return 0;
    let s = 1;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s; // 1 to 4
  };

  const strength = getPasswordStrength();

  const handleAutofillLoginDemo = () => {
    setLoginEmail('reuben.stewart@highpointe.org');
    setLoginPassword('CareCentriq@2026!');
    toast.success('Demo Account Loaded', 'Prefilled verified credentials for Reuben Stewart.');
  };

  const handleAutofillDemo = () => {
    setFullName('Elena Rostova');
    setEmail('elena.rostova@carecentriq.com');
    setPassword('CareCentriq2026!');
    setAgencyName('Lakeview Healthcare & Day Services');
    setPrimaryService('532');
    setAgencySize('26-100');
    toast.success('Demo Profile Loaded', 'Prefilled verified clinical agency details.');
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!fullName.trim() || !email.trim()) {
        toast.warning('Required Information', 'Please provide your full name and agency email.');
        return;
      }
      toast.info('Step 1 Saved', 'Account credentials configured.');
      setStep(2);
    } else if (step === 2) {
      if (!agencyName.trim()) {
        toast.warning('Agency Name Required', 'Please enter your healthcare organization name.');
        return;
      }
      toast.info('Agency Assigned', `${agencyName} enrolled with service code ${primaryService}.`);
      setStep(3);
    } else if (step === 3) {
      toast.success('Workspace Ready', 'Modules and HIPAA compliance preferences saved.');
      setStep(4);
    }
  };

  const handleFinalSubmit = () => {
    toast.success(
      'Account Created Successfully',
      `Welcome to CareCentriq, ${fullName}! Launching ${agencyName} operations deck.`
    );
    onComplete({
      name: fullName,
      email: email,
      agency: agencyName,
      role: role === 'admin' ? 'Agency Administrator' : 'Clinical Director',
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast.warning('Credentials Required', 'Please enter both your work email and password.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Signed In', `Welcome back! Loading CareCentriq digital binders.`);
      onComplete({
        name: loginEmail.includes('reuben') ? 'Reuben Stewart' : loginEmail.split('@')[0],
        email: loginEmail,
        agency: 'Highpointe Healthcare Systems',
        role: 'Administrator',
      });
    }, 600);
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} SSO`, `Authenticating via corporate directory...`);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('SSO Verified', `Connected through ${provider} Enterprise Identity.`);
      onComplete({
        name: 'Reuben Stewart',
        email: 'reuben.stewart@highpointe.org',
        agency: 'Highpointe Healthcare Systems',
        role: 'Administrator',
      });
    }, 700);
  };

  const handleSSOLogin = () => {
    const domain = prompt('Enter your agency domain for Single Sign-On (SSO):', 'highpointe.org');
    if (domain) {
      toast.info('SSO Redirect', `Routing to https://auth.${domain}/saml2/sso...`);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Single Sign-On Authenticated', `Welcome back, Reuben Stewart!`);
        onComplete({
          name: 'Reuben Stewart',
          email: `reuben.stewart@${domain}`,
          agency: 'Highpointe Healthcare Systems',
          role: 'Administrator',
        });
      }, 700);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info('Password Recovery', `Reset instructions sent to ${loginEmail || 'your email address'}.`);
  };

  const handlePasskeyLogin = () => {
    toast.info('Passkey Authentication', 'Prompting for biometric or device passkey verification...');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Passkey Verified', 'Biometric identity authenticated.');
      onComplete({
        name: 'Dr. Sheyivat',
        email: loginEmail || 'sheyivatdoc@gmail.com',
        agency: 'Highpointe Healthcare Systems',
        role: 'Administrator',
      });
    }, 600);
  };

  return (
    <div className="min-h-screen w-screen bg-white text-grey-900 font-sans selection:bg-brand-100 overflow-x-hidden">
      {/* ========================================================
         INITIAL FIGMA SPLIT-SCREEN DESIGN (WHITE CANVAS)
      ======================================================== */}
      {mode === 'login' ? (
        <div className="min-h-screen w-screen bg-white flex p-4 sm:p-6 lg:p-8 overflow-x-hidden font-sans">
          {/* LEFT COLUMN: HERO CONTAINER */}
          <div className="hidden lg:flex w-1/2 h-full items-center justify-center">
            <div className="w-full h-full max-h-[calc(100vh-64px)] flex items-center justify-center">
              <img
                src={loginBanner}
                alt="Carecentriq - Built for those who show up every day"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = loginBannerPng;
                }}
                className="w-full h-full object-contain select-none rounded-[32px]"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: CLEAN FORM PANEL DIRECTLY ON WHITE CANVAS */}
          <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
            <div className="w-full max-w-[400px] space-y-5 my-auto">
              {/* Header */}
              <div className="space-y-1">
                <h1 className="font-sans font-bold text-3xl sm:text-[38px] text-[#0A0A0A] tracking-tight leading-tight">
                  Welcome Back
                </h1>
                <p className="text-xs sm:text-sm text-[#71717A]">
                  Please enter your details.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
                {/* Email Input */}
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8E8E93] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-[#F4F4F6] rounded-xl text-xs sm:text-sm text-[#0A0A0A] placeholder:text-[#8E8E93] border border-transparent focus:border-[#2E7D32] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <Key className="w-4 h-4 text-[#8E8E93] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-11 py-3 bg-[#F4F4F6] rounded-xl text-xs sm:text-sm text-[#0A0A0A] placeholder:text-[#8E8E93] border border-transparent focus:border-[#2E7D32] focus:bg-white focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#0A0A0A] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[#52525B] hover:text-[#0A0A0A]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-[#D4D4D8] text-[#2E7D32] focus:ring-[#2E7D32]"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-medium text-[#2E7D32] hover:text-[#1B5E20] hover:underline cursor-pointer"
                  >
                    Forgot password
                  </button>
                </div>

                {/* Continue Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full py-3.5 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-[0.99]",
                    loginEmail.trim()
                      ? "bg-[#0A0A0A] hover:bg-neutral-800 text-white"
                      : "bg-[#D4D4D8] text-white hover:bg-[#C4C4C8]"
                  )}
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Continuing...
                    </span>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </form>

              {/* Divider: Or continue with */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E4E4E7]" />
                </div>
                <span className="relative bg-white px-3 text-xs text-[#71717A] font-normal">
                  Or continue with
                </span>
              </div>

              {/* Social Login Buttons: Google & Microsoft */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#F4F4F6] hover:bg-[#EAEAEB] transition-all border border-transparent active:scale-[0.98] cursor-pointer"
                  title="Sign in with Google"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('Microsoft')}
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#F4F4F6] hover:bg-[#EAEAEB] transition-all border border-transparent active:scale-[0.98] cursor-pointer"
                  title="Sign in with Microsoft"
                >
                  <svg className="w-5 h-5" viewBox="0 0 21 21">
                    <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                    <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                    <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                  </svg>
                </button>
              </div>

              {/* Sign in with SSO */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleSSOLogin}
                  className="text-xs font-semibold text-[#2E7D32] hover:text-[#1B5E20] hover:underline cursor-pointer"
                >
                  Sign in with SSO
                </button>
              </div>

              {/* Footer: Don't have an account? Sign up */}
              <div className="text-center pt-3 text-xs text-[#71717A]">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setStep(1);
                  }}
                  className="font-semibold text-[#2E7D32] hover:text-[#1B5E20] hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================
           MULTI-STEP ACCOUNT CREATION FLOW (PRESERVED)
        ======================================================== */
        <div className="min-h-screen w-screen flex flex-col justify-between bg-canvas text-grey-900 font-sans selection:bg-brand-100">
          {/* Header */}
          <header className="h-16 px-6 sm:px-10 flex items-center justify-between border-b border-border bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rail flex items-center justify-center shadow-xs">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="8" height="8" rx="2" fill="#FFFFFF" />
                  <rect x="13" y="3" width="8" height="8" rx="2" fill="#9BF168" />
                  <rect x="3" y="13" width="8" height="8" rx="2" fill="#9BF168" />
                  <rect x="13" y="13" width="8" height="8" rx="2" fill="#FFFFFF" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-rail">CareCentriq</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-brand-200 ml-2">
                  Clinical Ops
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-grey-500 hidden sm:inline">Already have an account?</span>
              <button
                onClick={() => setMode('login')}
                className="font-bold text-rail hover:text-brand-700 px-3 py-1.5 rounded-xl border border-border bg-white hover:bg-grey-50 transition-colors"
              >
                Sign In
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-xl">
              <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
                {/* Stepper Header */}
                <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-border/70 bg-canvas/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-brand-0 text-brand-1200 text-[11px] font-extrabold flex items-center justify-center">
                        {step}
                      </span>
                      <span className="text-xs font-bold text-rail uppercase tracking-wider">
                        {step === 1 && 'Step 1 of 4: Your Profile'}
                        {step === 2 && 'Step 2 of 4: Agency Setup'}
                        {step === 3 && 'Step 3 of 4: Workstation Modules'}
                        {step === 4 && 'Step 4 of 4: Ready to Launch'}
                      </span>
                    </div>

                    {step < 4 && (
                      <button
                        onClick={handleAutofillDemo}
                        type="button"
                        className="text-[11px] font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Autofill Demo Agency</span>
                      </button>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-grey-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-rail h-full transition-all duration-300"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* STEP 1: USER CREDENTIALS */}
                  {step === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-rail">Create Your Executive Profile</h2>
                        <p className="text-xs text-grey-500 mt-0.5">
                          Set up your administrative credentials to manage digital binders and rosters.
                        </p>
                      </div>

                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-grey-700">Full Legal Name</label>
                          <div className="relative">
                            <User className="w-4 h-4 text-grey-400 absolute left-3.5 top-3" />
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Reuben Stewart"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-grey-700">Work Email Address</label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-grey-400 absolute left-3.5 top-3" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="reuben.stewart@highpointe.org"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-grey-700">Create Password</label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-grey-400 absolute left-3.5 top-3" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3.5 top-3 text-grey-400 hover:text-grey-700"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>

                          {/* Visual Strength Meter */}
                          <div className="flex items-center gap-1.5 pt-1.5">
                            {[1, 2, 3, 4].map((bar) => (
                              <div
                                key={bar}
                                className={cn(
                                  'h-1 flex-1 rounded-full transition-colors',
                                  bar <= strength
                                    ? strength <= 2
                                      ? 'bg-amber-400'
                                      : 'bg-emerald-500'
                                    : 'bg-grey-200'
                                )}
                              />
                            ))}
                            <span className="text-[10px] text-grey-400 font-medium ml-1">
                              {strength <= 2 ? 'Moderate' : 'Strong'}
                            </span>
                          </div>
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-2 pt-1">
                          <label className="text-xs font-semibold text-grey-700">Your Primary Role</label>
                          <div className="grid grid-cols-2 gap-2.5">
                            {[
                              { id: 'admin', label: 'Agency Executive', sub: 'Full system oversight' },
                              { id: 'supervisor', label: 'Clinical Supervisor', sub: 'ISP & note approvals' },
                              { id: 'dsp', label: 'Direct Support (DSP)', sub: 'Daily shift recording' },
                              { id: 'manager', label: 'Operations Manager', sub: 'Rosters & compliance' },
                            ].map((r) => (
                              <div
                                key={r.id}
                                onClick={() => setRole(r.id as any)}
                                className={cn(
                                  'p-3 rounded-2xl border text-left cursor-pointer transition-all',
                                  role === r.id
                                    ? 'border-brand-500 bg-brand-50/60 shadow-xs'
                                    : 'border-border bg-white hover:bg-grey-50'
                                )}
                              >
                                <div className="font-bold text-xs text-rail flex items-center justify-between">
                                  <span>{r.label}</span>
                                  {role === r.id && <Check className="w-3.5 h-3.5 text-brand-600" />}
                                </div>
                                <div className="text-[10px] text-grey-500 mt-0.5">{r.sub}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: AGENCY DETAILS */}
                  {step === 2 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-rail">Agency & Facilities</h2>
                        <p className="text-xs text-grey-500 mt-0.5">
                          Configure state service codes and regional facility parameters.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-grey-700">Healthcare Organization / Legal Name</label>
                          <div className="relative">
                            <Building className="w-4 h-4 text-grey-400 absolute left-3.5 top-3" />
                            <input
                              type="text"
                              value={agencyName}
                              onChange={(e) => setAgencyName(e.target.value)}
                              placeholder="Highpointe Healthcare Systems"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                          </div>
                        </div>

                        {/* Primary Service Code */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-grey-700">Primary Program Service Line</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {[
                              { code: '532', name: 'Adult Day Care', sub: 'Daily attendance quota' },
                              { code: 'TDS', name: 'Dev. Training', sub: 'Monthly hours budget' },
                              { code: 'PIP', name: 'Community Care', sub: '1:1 Direct staffing' },
                            ].map((s) => (
                              <div
                                key={s.code}
                                onClick={() => setPrimaryService(s.code)}
                                className={cn(
                                  'p-3 rounded-2xl border cursor-pointer transition-all',
                                  primaryService === s.code
                                    ? 'border-brand-500 bg-brand-50/70 shadow-xs'
                                    : 'border-border bg-white hover:bg-grey-50'
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-xs text-brand-900">Code: {s.code}</span>
                                  {primaryService === s.code && <Check className="w-3.5 h-3.5 text-brand-600" />}
                                </div>
                                <div className="font-semibold text-xs text-rail mt-1">{s.name}</div>
                                <div className="text-[10px] text-grey-500">{s.sub}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Size / Census */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-grey-700">Estimated Enrolled Client Census</label>
                          <div className="flex items-center gap-2">
                            {['1-25', '26-100', '100+'].map((sz) => (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => setAgencySize(sz)}
                                className={cn(
                                  'flex-1 py-2 rounded-xl border text-xs font-semibold transition-all',
                                  agencySize === sz
                                    ? 'bg-rail text-white border-rail shadow-xs'
                                    : 'bg-white text-grey-700 border-border hover:bg-grey-50'
                                )}
                              >
                                {sz} Clients
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Regulatory Framework */}
                        <div className="p-3.5 rounded-2xl bg-panel border border-brand-200/80 space-y-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-rail">
                            <ShieldCheck className="w-4 h-4 text-brand-700" />
                            <span>Title 22 & Regional Center Preset</span>
                          </div>
                          <p className="text-[11px] text-grey-600">
                            Automatic audit binders, ISP quarterly cycles, and mandated ratio enforcement are active.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: WORKSTATION MODULES */}
                  {step === 3 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-rail">Select Workstation Modules</h2>
                        <p className="text-xs text-grey-500 mt-0.5">
                          Toggle the operational tools needed for your agency's daily workflow.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {[
                          {
                            key: 'notes',
                            title: 'Daily Shift Progress Notes',
                            desc: 'DSP note recording with activity tracking, voice notes, and clinical approvals.',
                          },
                          {
                            key: 'isp',
                            title: 'Individual Service Plans (ISP)',
                            desc: 'Quarterly objective tracking, scorecards, and automated regional center reports.',
                          },
                          {
                            key: 'calendar',
                            title: 'Master Facility Scheduling',
                            desc: 'Shift rosters, transportation schedules, and appointment calendars.',
                          },
                          {
                            key: 'drills',
                            title: 'Safety & Evacuation Drills',
                            desc: 'Mandated monthly fire, earthquake, and evacuation drill logs.',
                          },
                          {
                            key: 'binders',
                            title: 'Digital Binders & Document Vault',
                            desc: 'HIPAA-compliant document repository with audit binder compilation.',
                          },
                        ].map((m) => {
                          const isChecked = enabledModules[m.key];
                          return (
                            <div
                              key={m.key}
                              onClick={() =>
                                setEnabledModules({
                                  ...enabledModules,
                                  [m.key]: !isChecked,
                                })
                              }
                              className={cn(
                                'p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3',
                                isChecked
                                  ? 'bg-panel/70 border-brand-300 shadow-xs'
                                  : 'bg-white border-border hover:bg-grey-50'
                              )}
                            >
                              <div className="space-y-0.5">
                                <div className="font-bold text-xs text-rail flex items-center gap-2">
                                  <span>{m.title}</span>
                                  {isChecked && (
                                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                                      Active
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-grey-500">{m.desc}</p>
                              </div>

                              <div
                                className={cn(
                                  'w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-colors',
                                  isChecked
                                    ? 'bg-brand-600 border-brand-700 text-white'
                                    : 'bg-white border-grey-300 text-transparent'
                                )}
                              >
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: READY TO LAUNCH */}
                  {step === 4 && (
                    <div className="space-y-6 text-center py-2 animate-in fade-in duration-200">
                      <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-200 text-brand-900 mx-auto flex items-center justify-center shadow-xs">
                        <Zap className="w-8 h-8 text-brand-700 fill-brand-0" />
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-rail">
                          You're All Set, {fullName.split(' ')[0]}!
                        </h2>
                        <p className="text-xs text-grey-500 max-w-sm mx-auto">
                          Your workspace for <strong className="text-rail">{agencyName}</strong> has been provisioned.
                        </p>
                      </div>

                      {/* Summary confirmation pills */}
                      <div className="grid grid-cols-2 gap-3 text-left max-w-sm mx-auto bg-canvas p-4 rounded-2xl border border-border/70 text-xs">
                        <div>
                          <span className="text-[10px] text-grey-400 font-bold uppercase block">Primary Program</span>
                          <span className="font-semibold text-rail">Service {primaryService}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-grey-400 font-bold uppercase block">Enrolled Size</span>
                          <span className="font-semibold text-rail">{agencySize} Clients</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-grey-400 font-bold uppercase block">Security</span>
                          <span className="font-semibold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> HIPAA Encrypted
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-grey-400 font-bold uppercase block">Role</span>
                          <span className="font-semibold text-rail">Administrator</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="w-full max-w-sm mx-auto py-3.5 rounded-xl bg-brand-0 hover:bg-brand-50 text-brand-1200 font-extrabold text-xs transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                      >
                        <span>Enter Operations Command Deck</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Bottom Step Actions */}
                  {step < 4 && (
                    <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={() => setStep((step - 1) as any)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-semibold text-grey-700 hover:bg-grey-50 transition-colors"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rail hover:bg-[#062420] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="py-4 px-6 text-center text-[11px] text-grey-400 border-t border-border bg-white flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 CareCentriq Operations. California Title 22 & Regional Center Compliant.</span>
            <div className="flex items-center gap-4">
              <a href="#privacy" className="hover:text-grey-700 transition-colors">Privacy & HIPAA Policy</a>
              <span>·</span>
              <a href="#security" className="hover:text-grey-700 transition-colors">SOC2 Type II Certified</a>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};
